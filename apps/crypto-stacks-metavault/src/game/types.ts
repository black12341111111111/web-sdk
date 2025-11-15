import { type SpinningReelSymbolState } from 'utils-slots';
import type config from './config';

export type SymbolName = keyof typeof config.symbols;
export type RawSymbol = {
	name: SymbolName;
	multiplier?: number;
	scatter?: boolean;
	wild?: boolean;
	chip?: boolean;
};
export type BetMode = keyof typeof config.betModes;
export type GameType = keyof typeof config.paddingReels;

export const SYMBOL_STATES = [
	'static',
	'spin',
	'land',
	'win',
	'postWinStatic',
	'explosion',
	'chipCollect',
	'upgrade',
] as const;

export type SymbolState = SpinningReelSymbolState | (typeof SYMBOL_STATES)[number];

export type Position = {
	reel: number;
	row: number;
};

// Chip collection and upgrade types
export type ChipCollectionData = {
	chipCount: number;
	totalChips: number;
	positions: Position[];
	currentLevel: number;
};

export type SymbolUpgradeData = {
	oldLevel: number;
	newLevel: number;
	oldSymbol: string;
	newSymbol: string;
	chipsCollected: number;
};

export type FreeSpinStateData = {
	fsRemaining: number;
	chipsCollected: number;
	currentUpgradeLevel: number;
};