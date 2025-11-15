import _ from 'lodash';

import { recordBookEvent, checkIsMultipleRevealEvents, type BookEventHandlerMap } from 'utils-book';
import { stateBet, stateUi } from 'state-shared';
import { sequence } from 'utils-shared/sequence';

import { eventEmitter } from './eventEmitter';
import { playBookEvent } from './utils';
import { winLevelMap, type WinLevel, type WinLevelData } from './winLevelMap';
import { stateGame, stateGameDerived } from './stateGame.svelte';
import type { BookEvent, BookEventOfType, BookEventContext } from './typesBookEvent';
import type { Position } from './types';
import config from './config';

const winLevelSoundsPlay = ({ winLevelData }: { winLevelData: WinLevelData }) => {
	if (winLevelData?.alias === 'max') eventEmitter.broadcastAsync({ type: 'uiHide' });
	if (winLevelData?.sound?.sfx) {
		eventEmitter.broadcast({ type: 'soundOnce', name: winLevelData.sound.sfx });
	}
	if (winLevelData?.sound?.bgm) {
		eventEmitter.broadcast({ type: 'soundMusic', name: winLevelData.sound.bgm });
	}
	if (winLevelData?.type === 'big') {
		eventEmitter.broadcast({ type: 'soundLoop', name: 'sfx_bigwin_coinloop' });
	}
};

const winLevelSoundsStop = () => {
	eventEmitter.broadcast({ type: 'soundStop', name: 'sfx_bigwin_coinloop' });
	if (stateGame.gameType === 'freegame') {
		eventEmitter.broadcast({ type: 'soundMusic', name: 'bgm_freespin' });
	} else {
		eventEmitter.broadcast({ type: 'soundMusic', name: 'bgm_main' });
	}
	eventEmitter.broadcastAsync({ type: 'uiShow' });
};

const animateSymbols = async ({ positions }: { positions: Position[] }) => {
	eventEmitter.broadcast({ type: 'boardShow' });
	await eventEmitter.broadcastAsync({
		type: 'boardWithAnimateSymbols',
		symbolPositions: positions,
	});
};

export const bookEventHandlerMap: BookEventHandlerMap<BookEvent, BookEventContext> = {
	reveal: async (bookEvent: BookEventOfType<'reveal'>, { bookEvents }: BookEventContext) => {
		const isBonusGame = checkIsMultipleRevealEvents({ bookEvents });
		if (isBonusGame) {
			eventEmitter.broadcast({ type: 'stopButtonEnable' });
			recordBookEvent({ bookEvent });
		}

		stateGame.gameType = bookEvent.gameType;
		await stateGameDerived.enhancedBoard.spin({
			revealEvent: bookEvent,
			paddingBoard: config.paddingReels[bookEvent.gameType],
		});
		eventEmitter.broadcast({ type: 'soundScatterCounterClear' });
		
		// Store current board for chip processing
		stateGame.currentBoard = bookEvent.board;
	},

	winInfo: async (bookEvent: BookEventOfType<'winInfo'>) => {
		eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_win_small' });
		await sequence(bookEvent.wins, async (win) => {
			// Check for wild multipliers in the win
			const hasWild = win.positions.some(pos => {
				const symbol = stateGame.currentBoard[pos.reel]?.[pos.row];
				return symbol?.name === 'WILD';
			});
			
			if (hasWild && win.meta.multiplier > 1) {
				eventEmitter.broadcast({ 
					type: 'soundOnce', 
					name: 'sfx_wild_multiplier' 
				});
			}
			
			await animateSymbols({ positions: win.positions });
		});
	},

	setTotalWin: async (bookEvent: BookEventOfType<'setTotalWin'>) => {
		stateBet.winBookEventAmount = bookEvent.amount;
	},

	freeSpinTrigger: async (bookEvent: BookEventOfType<'freeSpinTrigger'>) => {
		// Animate scatters
		eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_scatter' });
		await animateSymbols({ positions: bookEvent.positions });
		
		// Show free spin intro
		eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_freespin_trigger' });
		await eventEmitter.broadcastAsync({ type: 'uiHide' });
		await eventEmitter.broadcastAsync({ type: 'transition' });
		eventEmitter.broadcast({ type: 'freeSpinIntroShow' });
		eventEmitter.broadcast({ type: 'soundMusic', name: 'bgm_freespin' });
		await eventEmitter.broadcastAsync({
			type: 'freeSpinIntroUpdate',
			totalFreeSpins: bookEvent.totalFs,
		});
		
		stateGame.gameType = 'freegame';
		stateGame.fsRemaining = bookEvent.totalFs;
		
		// Reset chip collection state for new free spin feature
		stateGameDerived.resetChipState();
		
		eventEmitter.broadcast({ type: 'freeSpinIntroHide' });
		eventEmitter.broadcast({ type: 'freeSpinCounterShow' });
		stateUi.freeSpinCounterShow = true;
		eventEmitter.broadcast({
			type: 'freeSpinCounterUpdate',
			current: undefined,
			total: bookEvent.totalFs,
		});
		stateUi.freeSpinCounterTotal = bookEvent.totalFs;
		
		// Show chip collection UI
		eventEmitter.broadcast({ type: 'chipCollectionShow' });
		
		await eventEmitter.broadcastAsync({ type: 'uiShow' });
		await eventEmitter.broadcastAsync({ type: 'drawerButtonShow' });
		eventEmitter.broadcast({ type: 'drawerFold' });
	},

	updateFreeSpin: async (bookEvent: BookEventOfType<'updateFreeSpin'>) => {
		eventEmitter.broadcast({ type: 'freeSpinCounterShow' });
		eventEmitter.broadcast({
			type: 'freeSpinCounterUpdate',
			current: bookEvent.amount,
			total: bookEvent.total,
		});
		stateGame.fsRemaining = bookEvent.total - bookEvent.amount;
	},

	// Crypto Stacks Metavault custom events
	chipCollection: async (bookEvent: BookEventOfType<'chipCollection'>) => {
		// Play chip collection sound
		eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_chip_collect' });
		
		// Animate chip collection
		await eventEmitter.broadcastAsync({
			type: 'chipCollectionAnimate',
			positions: bookEvent.positions,
		});
		
		// Update chip counter
		stateGameDerived.addChips(bookEvent.chipCount);
		eventEmitter.broadcast({
			type: 'chipCollectionUpdate',
			chipCount: bookEvent.chipCount,
			totalChips: bookEvent.totalChips,
			positions: bookEvent.positions,
		});
	},

	symbolUpgrade: async (bookEvent: BookEventOfType<'symbolUpgrade'>) => {
		// Play upgrade sound
		eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_upgrade' });
		
		// Show upgrade animation
		eventEmitter.broadcast({ type: 'symbolUpgradeShow' });
		await eventEmitter.broadcastAsync({
			type: 'symbolUpgradeAnimate',
			oldLevel: bookEvent.oldLevel,
			newLevel: bookEvent.newLevel,
		});
		
		// Update game state
		stateGame.currentUpgradeLevel = bookEvent.newLevel;
		
		// Complete upgrade
		await eventEmitter.broadcastAsync({
			type: 'symbolUpgradeComplete',
			newLevel: bookEvent.newLevel,
		});
		eventEmitter.broadcast({ type: 'symbolUpgradeHide' });
	},

	freeSpinState: async (bookEvent: BookEventOfType<'freeSpinState'>) => {
		// Update free spin state
		stateGame.fsRemaining = bookEvent.fsRemaining;
		stateGame.chipsCollected = bookEvent.chipsCollected;
		stateGame.currentUpgradeLevel = bookEvent.currentUpgradeLevel;
	},

	createBonusSnapshot: async (bookEvent: BookEventOfType<'createBonusSnapshot'>) => {
		await sequence(bookEvent.bookEvents, async (event) => {
			await playBookEvent(event, { bookEvents: bookEvent.bookEvents });
		});
	},

	setWin: async (bookEvent: BookEventOfType<'setWin'>) => {
		const winLevelData = winLevelMap[bookEvent.winLevel as WinLevel];
		winLevelSoundsPlay({ winLevelData });
		await eventEmitter.broadcastAsync({ type: 'winUpdate', amount: bookEvent.amount });
		winLevelSoundsStop();
	},

	freeSpinEnd: async (bookEvent: BookEventOfType<'freeSpinEnd'>) => {
		const winLevelData = winLevelMap[bookEvent.winLevel as WinLevel];
		
		// Hide chip collection UI
		eventEmitter.broadcast({ type: 'chipCollectionHide' });
		
		// Play end sound
		eventEmitter.broadcast({ type: 'soundOnce', name: 'sfx_freespin_end' });
		
		// Show outro
		await eventEmitter.broadcastAsync({ type: 'uiHide' });
		eventEmitter.broadcast({ type: 'freeSpinOutroShow' });
		winLevelSoundsPlay({ winLevelData });
		await eventEmitter.broadcastAsync({
			type: 'freeSpinOutroUpdate',
			totalWin: bookEvent.amount,
		});
		eventEmitter.broadcast({ type: 'freeSpinOutroHide' });
		
		// Reset to base game
		stateGame.gameType = 'basegame';
		stateGameDerived.resetChipState();
		
		await eventEmitter.broadcastAsync({ type: 'transition' });
		eventEmitter.broadcast({ type: 'freeSpinCounterHide' });
		stateUi.freeSpinCounterShow = false;
		winLevelSoundsStop();
		await eventEmitter.broadcastAsync({ type: 'uiShow' });
	},

	finalWin: async (bookEvent: BookEventOfType<'finalWin'>) => {
		// Final win handling
		stateBet.winBookEventAmount = bookEvent.amount;
	},
};