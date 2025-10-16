import _ from 'lodash';
import { createReelForSpinning, createEnhanceBoard } from 'utils-slots';
import type { RawSymbol, SymbolState } from './types';
import { SPIN_OPTIONS_DEFAULT, SPIN_OPTIONS_FAST, SYMBOL_SIZE, BOARD_DIMENSIONS } from './constants';

// Initial board setup with placeholder symbols
const INITIAL_BOARD: RawSymbol[][] = [
	[{ name: 'L1' }, { name: 'L2' }, { name: 'L3' }, { name: 'L4' }],
	[{ name: 'M1' }, { name: 'M2' }, { name: 'L5' }, { name: 'L6' }],
	[{ name: 'H1' }, { name: 'H2' }, { name: 'L1' }, { name: 'L2' }],
	[{ name: 'M3' }, { name: 'L3' }, { name: 'L4' }, { name: 'L5' }],
	[{ name: 'H3' }, { name: 'L6' }, { name: 'L1' }, { name: 'L2' }],
];

const INITIAL_SYMBOL_STATE: SymbolState = 'static';

// Create the spinning reels
const board = _.range(BOARD_DIMENSIONS.x).map((reelIndex) => {
	const reel = createReelForSpinning({
		reelIndex,
		symbolHeight: SYMBOL_SIZE,
		initialSymbols: INITIAL_BOARD[reelIndex],
		initialSymbolState: INITIAL_SYMBOL_STATE,
		onReelStopping: () => {
			// Can add sound effects here
		},
		onSymbolLand: () => {
			// Can add landing effects here
		},
	});

	reel.reelState.spinOptions = () =>
		reel.reelState.spinType === 'fast' ? SPIN_OPTIONS_FAST : SPIN_OPTIONS_DEFAULT;

	return reel;
});

export type Reel = (typeof board)[number];
export type ReelSymbol = Reel['reelState']['symbols'][number];

// Game state
export const stateGame = $state({
	board,
	gameType: 'base' as 'base' | 'free',
	currentMultiplier: 1,
	stickyWilds: [] as { reel: number; row: number }[],
	bonusProgress: 0,
});

// Derived state and helper functions
export const stateGameDerived = {
	boardLayout: () => ({
		x: 400, // Will be updated based on actual layout
		y: 300, // Will be updated based on actual layout
		width: BOARD_DIMENSIONS.x * SYMBOL_SIZE,
		height: BOARD_DIMENSIONS.y * SYMBOL_SIZE,
	}),
	
	boardRaw: () =>
		board.map((reel) => reel.reelState.symbols.map((reelSymbol) => reelSymbol.rawSymbol)),
	
	// Enhanced board with spinning functionality
	enhancedBoard: createEnhanceBoard().enhanceBoard({ board }),
};
