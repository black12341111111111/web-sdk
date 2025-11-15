import config from './config';

// Grid dimensions
export const NUM_REELS = config.numReels;
export const NUM_ROWS = config.numRows;
export const TOTAL_SYMBOLS = NUM_REELS * NUM_ROWS[0]; // 5x4 = 20 symbols
export const WAYS_TO_WIN = 1024; // 4^5 = 1024 ways
export const BOARD_DIMENSIONS = { x: NUM_REELS, y: NUM_ROWS[0] };

// Symbol dimensions (adjust based on your design)
export const SYMBOL_SIZE = 120;
export const REEL_PADDING = 0.53;
export const SYMBOL_WIDTH = 150;
export const SYMBOL_HEIGHT = 150;
export const SYMBOL_SPACING_X = 10;
export const SYMBOL_SPACING_Y = 10;

// Board dimensions
export const BOARD_WIDTH = NUM_REELS * (SYMBOL_WIDTH + SYMBOL_SPACING_X) - SYMBOL_SPACING_X;
export const BOARD_HEIGHT = NUM_ROWS[0] * (SYMBOL_HEIGHT + SYMBOL_SPACING_Y) - SYMBOL_SPACING_Y;

// Reel spin settings
export const REEL_SPIN_DURATION = 2000; // ms
export const REEL_STOP_DELAY = 100; // ms between each reel stop
export const SYMBOL_LAND_DURATION = 200; // ms

// Animation durations
export const WIN_ANIMATION_DURATION = 1000;
export const CHIP_COLLECT_DURATION = 800;
export const UPGRADE_ANIMATION_DURATION = 1500;
export const WILD_MULTIPLIER_DURATION = 600;
export const TRANSITION_DURATION = 1000;

// Chip collection thresholds (matching math-sdk)
export const CHIP_UPGRADE_THRESHOLDS = config.chipUpgradeThresholds;

// Symbol upgrade progression (matching math-sdk)
export const UPGRADE_PROGRESSION = config.upgradeProgression;
export const UPGRADE_NAMES = ['M1', 'M2', 'M3', 'M4', 'DIAMOND'];

// Wild multiplier values
export const WILD_MULTIPLIERS = [2, 3];
export const WILD_REELS = [1, 2, 3]; // Reels 2, 3, 4 (0-indexed)

// Free spin triggers
export const FS_TRIGGER_BASE = {
	3: 8,
	4: 15,
	5: 20,
};

export const FS_TRIGGER_RETRIGGER = {
	2: 4,
	3: 6,
	4: 8,
	5: 10,
};

// Win levels (adjust multipliers as needed)
export const WIN_LEVELS = {
	small: { min: 0, max: 5 },
	medium: { min: 5, max: 20 },
	big: { min: 20, max: 100 },
	mega: { min: 100, max: 1000 },
	max: { min: 1000, max: 5000 },
};

// Z-index layers
export const Z_INDEX = {
	background: 0,
	board: 10,
	symbols: 20,
	effects: 30,
	ui: 40,
	overlays: 50,
	modals: 60,
};

// Colors
export const COLORS = {
	primary: 0x00d4ff,
	secondary: 0xff6b00,
	accent: 0xffd700,
	success: 0x00ff00,
	warning: 0xffff00,
	danger: 0xff0000,
	text: 0xffffff,
	background: 0x1a1a2e,
	chipGold: 0xffd700,
	upgradeGlow: 0x00ffff,
	wildMultiplier: 0xff00ff,
};

// Game states
export const GAME_STATES = {
	IDLE: 'idle',
	SPINNING: 'spinning',
	REVEALING: 'revealing',
	EVALUATING: 'evaluating',
	WINNING: 'winning',
	CHIP_COLLECTING: 'chip_collecting',
	UPGRADING: 'upgrading',
	FREE_SPIN_TRIGGER: 'free_spin_trigger',
	FREE_SPIN_ACTIVE: 'free_spin_active',
	FREE_SPIN_END: 'free_spin_end',
} as const;

export type GameState = (typeof GAME_STATES)[keyof typeof GAME_STATES];

// Symbol info map for rendering
const symbolStatic = {
        type: 'sprite' as const,
        assetKey: 'symbolsStatic',
        sizeRatios: { width: 0.9, height: 0.9 },
};

const explosion = {
        type: 'spine' as const,
        assetKey: 'explosion',
        animationName: 'explosion',
        sizeRatios: { width: 1.5, height: 1.5 },
};

export const SYMBOL_INFO_MAP = {
        '9': {
                explosion,
                win: {
                        type: 'spine' as const,
                        assetKey: '9',
                        animationName: 'animation',
                        sizeRatios: { width: 0.9, height: 0.9 },
                },
                postWinStatic: symbolStatic,
                static: symbolStatic,
                spin: symbolStatic,
                land: symbolStatic,
        },
        '10': {
                explosion,
                win: {
                        type: 'spine' as const,
                        assetKey: '10',
                        animationName: 'animation',
                        sizeRatios: { width: 0.9, height: 0.9 },
                },
                postWinStatic: symbolStatic,
                static: symbolStatic,
                spin: symbolStatic,
                land: symbolStatic,
        },
        J: {
                explosion,
                win: {
                        type: 'spine' as const,
                        assetKey: 'J',
                        animationName: 'animation',
                        sizeRatios: { width: 0.9, height: 0.9 },
                },
                postWinStatic: symbolStatic,
                static: symbolStatic,
                spin: symbolStatic,
                land: symbolStatic,
        },
        Q: {
                explosion,
                win: {
                        type: 'spine' as const,
                        assetKey: 'Q',
                        animationName: 'animation',
                        sizeRatios: { width: 0.9, height: 0.9 },
                },
                postWinStatic: symbolStatic,
                static: symbolStatic,
                spin: symbolStatic,
                land: symbolStatic,
        },
        K: {
                explosion,
                win: {
                        type: 'spine' as const,
                        assetKey: 'K',
                        animationName: 'animation',
                        sizeRatios: { width: 0.9, height: 0.9 },
                },
                postWinStatic: symbolStatic,
                static: symbolStatic,
                spin: symbolStatic,
                land: symbolStatic,
        },
        A: {
                explosion,
                win: {
                        type: 'spine' as const,
                        assetKey: 'A',
                        animationName: 'animation',
                        sizeRatios: { width: 0.9, height: 0.9 },
                },
                postWinStatic: symbolStatic,
                static: symbolStatic,
                spin: symbolStatic,
                land: symbolStatic,
        },
        M1: {
                explosion,
                win: {
                        type: 'spine' as const,
                        assetKey: 'M1',
                        animationName: 'animation',
                        sizeRatios: { width: 0.9, height: 0.9 },
                },
                postWinStatic: symbolStatic,
                static: symbolStatic,
                spin: symbolStatic,
                land: symbolStatic,
        },
        M2: {
                explosion,
                win: {
                        type: 'spine' as const,
                        assetKey: 'M2',
                        animationName: 'animation',
                        sizeRatios: { width: 0.9, height: 0.9 },
                },
                postWinStatic: symbolStatic,
                static: symbolStatic,
                spin: symbolStatic,
                land: symbolStatic,
        },
        M3: {
                explosion,
                win: {
                        type: 'spine' as const,
                        assetKey: 'M3',
                        animationName: 'animation',
                        sizeRatios: { width: 0.9, height: 0.9 },
                },
                postWinStatic: symbolStatic,
                static: symbolStatic,
                spin: symbolStatic,
                land: symbolStatic,
        },
        M4: {
                explosion,
                win: {
                        type: 'spine' as const,
                        assetKey: 'M4',
                        animationName: 'animation',
                        sizeRatios: { width: 0.9, height: 0.9 },
                },
                postWinStatic: symbolStatic,
                static: symbolStatic,
                spin: symbolStatic,
                land: symbolStatic,
        },
        DIAMOND: {
                explosion,
                win: {
                        type: 'spine' as const,
                        assetKey: 'DIAMOND',
                        animationName: 'animation',
                        sizeRatios: { width: 1, height: 1 },
                },
                postWinStatic: symbolStatic,
                static: symbolStatic,
                spin: symbolStatic,
                land: symbolStatic,
        },
        SCATTER: {
                explosion,
                win: {
                        type: 'spine' as const,
                        assetKey: 'SCATTER',
                        animationName: 'animation',
                        sizeRatios: { width: 1.2, height: 1.2 },
                },
                postWinStatic: symbolStatic,
                static: symbolStatic,
                spin: symbolStatic,
                land: symbolStatic,
        },
        WILD: {
                explosion,
                win: {
                        type: 'spine' as const,
                        assetKey: 'WILD',
                        animationName: 'animation',
                        sizeRatios: { width: 1.2, height: 1.2 },
                },
                postWinStatic: symbolStatic,
                static: symbolStatic,
                spin: symbolStatic,
                land: symbolStatic,
        },
        CHIP: {
                explosion,
                win: {
                        type: 'spine' as const,
                        assetKey: 'CHIP',
                        animationName: 'animation',
                        sizeRatios: { width: 1, height: 1 },
                },
                postWinStatic: symbolStatic,
                static: symbolStatic,
                spin: symbolStatic,
                land: symbolStatic,
        },
} as const;