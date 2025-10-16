import { type SpinningReelSymbolState } from 'utils-slots';

// Symbol names matching our PNG files
export type SymbolName = 
	| 'H1' | 'H2' | 'H3'  // High paying characters
	| 'M1' | 'M2' | 'M3'  // Medium paying objects
	| 'L1' | 'L2' | 'L3' | 'L4' | 'L5' | 'L6'  // Low paying cards
	| 'W' | 'SC' | 'BN' | 'P';  // Special symbols

export type RawSymbol = {
	name: SymbolName;
	multiplier?: number;
	scatter?: boolean;
	wild?: boolean;
};

export const SYMBOL_STATES = [
	'static',
	'spin',
	'land',
	'win',
	'anticipation',
	'postWinStatic',
] as const;

export type SymbolState = SpinningReelSymbolState | (typeof SYMBOL_STATES)[number];

export type Position = {
	reel: number;
	row: number;
};

export type BetMode = 'normal' | 'high';
export type GameType = 'base' | 'free';
