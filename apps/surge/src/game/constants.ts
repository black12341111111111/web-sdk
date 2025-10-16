/**
 * Constants for Surge Slot Game
 * Following Stake Engine pattern - centralized game configuration
 */

import type { SymbolState } from './types';

// Board Configuration
export const BOARD_DIMENSIONS = {
	x: 5, // 5 reels
	y: 4, // 4 rows
} as const;

export const SYMBOL_SIZE = 150; // Symbol height/width in pixels

export const BOARD_SIZES = {
	width: BOARD_DIMENSIONS.x * SYMBOL_SIZE,
	height: BOARD_DIMENSIONS.y * SYMBOL_SIZE,
} as const;

// Spin Configuration
const SPIN_OPTIONS_SHARED = {
	reelBounceBackSpeed: 0.15,
	reelSpinSpeedBeforeBounce: 4,
	reelPaddingMultiplierNormal: 1.2,
	reelPaddingMultiplierAnticipated: 10,
	reelSpinDelay: 145,
};

export const SPIN_OPTIONS_DEFAULT = {
	...SPIN_OPTIONS_SHARED,
	reelPreSpinSpeed: 2,
	reelSpinSpeed: 3,
	reelBounceSizeMulti: 0.3,
};

export const SPIN_OPTIONS_FAST = {
	...SPIN_OPTIONS_SHARED,
	reelPreSpinSpeed: 5,
	reelSpinSpeed: 5,
	reelBounceSizeMulti: 0.05,
};

// Symbol States
export const INITIAL_SYMBOL_STATE: SymbolState = 'static';

// Game Configuration
export const GAME_CONFIG = {
	minBet: 0.2,
	maxBet: 100,
	defaultBet: 1,
	autoSpinOptions: [10, 25, 50, 100, 250, 500],
} as const;

// Feature Configuration
export const MULTIPLIERS = {
	min: 1,
	max: 10,
	colors: {
		1: 0xffffff,
		2: 0x00ff00,
		3: 0x00d4ff,
		5: 0xff00ff,
		10: 0xffff00,
	},
} as const;

export const FREE_SPINS = {
	triggerScatters: 3,
	minSpins: 8,
	maxSpins: 20,
} as const;

export const STICKY_WILDS = {
	maxCount: 8,
	color: 0xff00ff,
} as const;

// Reel padding for symbol positioning
export const REEL_PADDING = 0.53;

// Symbol info map - simplified for now, expand as needed
export const SYMBOL_INFO_MAP = {
	// Add symbol state mappings here as components are developed
} as const;

// Sound Configuration (to be expanded)
export const SOUNDS = {
	spinStart: 'sfx_spin_start',
	reelStop: 'sfx_reel_stop',
	symbolLand: 'sfx_symbol_land',
	win: 'sfx_win',
	bigWin: 'sfx_big_win',
	megaWin: 'sfx_mega_win',
	freeSpinTrigger: 'sfx_freespin_trigger',
	bonusTrigger: 'sfx_bonus_trigger',
} as const;
