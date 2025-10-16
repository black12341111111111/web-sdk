/**
 * Book Event Handler Map for Surge Slot
 * Following Stake Engine pattern:
 * - Each bookEvent type maps to a handler function
 * - Handlers broadcast emitterEvents to components
 * - This is the bridge between RGS data and game UI
 */

import type { BookEventHandlerMap } from 'utils-book';
import type { BookEvent, BookEventOfType, BookEventContext } from './typesBookEvent';
import { eventEmitter } from './eventEmitter';
import { stateGame } from './stateGame.svelte';

/**
 * Book Event Handler Map
 * Each handler receives a bookEvent and broadcasts emitterEvents
 * Components subscribe to emitterEvents and update UI accordingly
 */
export const bookEventHandlerMap: BookEventHandlerMap<BookEvent, BookEventContext> = {
	/**
	 * Reveal - Main spin event
	 * Shows the board result from RGS
	 */
	reveal: async (bookEvent: BookEventOfType<'reveal'>) => {
		// Update game state
		stateGame.gameType = bookEvent.gameType;

		// Start the spin animation
		await eventEmitter.broadcastAsync({
			type: 'boardSpin',
			board: bookEvent.board,
			anticipation: bookEvent.anticipation,
		});

		console.log('Reveal bookEvent:', bookEvent);
	},

	/**
	 * Win - Show win animation and amount
	 */
	win: async (bookEvent: BookEventOfType<'win'>) => {
		await eventEmitter.broadcastAsync({
			type: 'winShow',
			amount: bookEvent.winAmount,
			positions: bookEvent.winPositions,
		});

		console.log('Win bookEvent:', bookEvent);
	},

	/**
	 * Set Total Win - Update total win display
	 */
	setTotalWin: async (bookEvent: BookEventOfType<'setTotalWin'>) => {
		// eventEmitter.broadcast({
		// 	type: 'updateTotalWin',
		// 	amount: bookEvent.amount,
		// });

		console.log('SetTotalWin bookEvent:', bookEvent);
	},

	/**
	 * Final Win - Show final win celebration
	 */
	finalWin: async (bookEvent: BookEventOfType<'finalWin'>) => {
		// await eventEmitter.broadcastAsync({
		// 	type: 'showFinalWin',
		// 	amount: bookEvent.amount,
		// });

		console.log('FinalWin bookEvent:', bookEvent);
	},

	/**
	 * Update Multiplier - Change the current multiplier
	 */
	updateMultiplier: async (bookEvent: BookEventOfType<'updateMultiplier'>) => {
		stateGame.currentMultiplier = bookEvent.multiplier;

		eventEmitter.broadcast({
			type: 'multiplierUpdate',
			multiplier: bookEvent.multiplier,
		});

		console.log('UpdateMultiplier bookEvent:', bookEvent);
	},

	/**
	 * Add Sticky Wild - Add wild symbols that stick
	 */
	addStickyWild: async (bookEvent: BookEventOfType<'addStickyWild'>) => {
		stateGame.stickyWilds = [...stateGame.stickyWilds, ...bookEvent.positions];

		await eventEmitter.broadcastAsync({
			type: 'stickyWildsAdd',
			positions: bookEvent.positions,
		});

		console.log('AddStickyWild bookEvent:', bookEvent);
	},

	/**
	 * Clear Sticky Wilds - Remove all sticky wilds
	 */
	clearStickyWilds: async (bookEvent: BookEventOfType<'clearStickyWilds'>) => {
		stateGame.stickyWilds = [];

		eventEmitter.broadcast({
			type: 'stickyWildsClear',
		});

		console.log('ClearStickyWilds bookEvent:', bookEvent);
	},

	/**
	 * Free Spin - Trigger free spins
	 */
	freeSpin: async (bookEvent: BookEventOfType<'freeSpin'>) => {
		// await eventEmitter.broadcastAsync({
		// 	type: 'freeSpinTrigger',
		// 	totalFs: bookEvent.totalFs,
		// 	remainingFs: bookEvent.remainingFs,
		// });

		console.log('FreeSpin bookEvent:', bookEvent);
	},

	/**
	 * Update Free Spin - Update free spin counter
	 */
	updateFreeSpin: async (bookEvent: BookEventOfType<'updateFreeSpin'>) => {
		// eventEmitter.broadcast({
		// 	type: 'freeSpinCounterUpdate',
		// 	current: bookEvent.current,
		// 	total: bookEvent.total,
		// });

		console.log('UpdateFreeSpin bookEvent:', bookEvent);
	},

	/**
	 * Free Spin Start - Show intro screen
	 */
	freeSpinStart: async (bookEvent: BookEventOfType<'freeSpinStart'>) => {
		// await eventEmitter.broadcastAsync({
		// 	type: 'freeSpinIntro',
		// 	totalFs: bookEvent.totalFs,
		// });

		console.log('FreeSpinStart bookEvent:', bookEvent);
	},

	/**
	 * Free Spin End - Show outro screen with total win
	 */
	freeSpinEnd: async (bookEvent: BookEventOfType<'freeSpinEnd'>) => {
		// await eventEmitter.broadcastAsync({
		// 	type: 'freeSpinOutro',
		// 	totalWin: bookEvent.totalWin,
		// });

		console.log('FreeSpinEnd bookEvent:', bookEvent);
	},

	/**
	 * Bonus Start - Start the heist bonus game
	 */
	bonusStart: async (bookEvent: BookEventOfType<'bonusStart'>) => {
		// await eventEmitter.broadcastAsync({
		// 	type: 'bonusGameStart',
		// });

		console.log('BonusStart bookEvent:', bookEvent);
	},

	/**
	 * Bonus End - End bonus with total win
	 */
	bonusEnd: async (bookEvent: BookEventOfType<'bonusEnd'>) => {
		// await eventEmitter.broadcastAsync({
		// 	type: 'bonusGameEnd',
		// 	totalWin: bookEvent.totalWin,
		// });

		console.log('BonusEnd bookEvent:', bookEvent);
	},
};
