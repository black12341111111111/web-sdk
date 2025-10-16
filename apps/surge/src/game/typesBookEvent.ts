/**
 * Book Event Types for Surge Slot Game
 * Following Stake Engine pattern: Union types for type safety
 * 
 * These types match the data structure from the Math SDK RGS
 */

import type { RawSymbol, GameType } from './types';

// Helper type to extract bookEvent by type
export type BookEventOfType<T extends BookEvent['type']> = Extract<BookEvent, { type: T }>;

// Base event - always present
type BookEventReveal = {
	index: number;
	type: 'reveal';
	board: RawSymbol[][];
	gameType: GameType;
	anticipation?: number[];
	paddingPositions?: number[];
};

// Win events
type BookEventWin = {
	index: number;
	type: 'win';
	winAmount: number;
	winPositions: { reel: number; row: number }[];
};

type BookEventSetTotalWin = {
	index: number;
	type: 'setTotalWin';
	amount: number;
};

type BookEventFinalWin = {
	index: number;
	type: 'finalWin';
	amount: number;
};

// Multiplier events
type BookEventUpdateMultiplier = {
	index: number;
	type: 'updateMultiplier';
	multiplier: number;
};

// Sticky wilds events
type BookEventAddStickyWild = {
	index: number;
	type: 'addStickyWild';
	positions: { reel: number; row: number }[];
};

type BookEventClearStickyWilds = {
	index: number;
	type: 'clearStickyWilds';
};

// Free spins events
type BookEventFreeSpin = {
	index: number;
	type: 'freeSpin';
	totalFs: number;
	remainingFs: number;
};

type BookEventUpdateFreeSpin = {
	index: number;
	type: 'updateFreeSpin';
	current: number;
	total: number;
};

type BookEventFreeSpinStart = {
	index: number;
	type: 'freeSpinStart';
	totalFs: number;
};

type BookEventFreeSpinEnd = {
	index: number;
	type: 'freeSpinEnd';
	totalWin: number;
};

// Bonus events
type BookEventBonusStart = {
	index: number;
	type: 'bonusStart';
};

type BookEventBonusEnd = {
	index: number;
	type: 'bonusEnd';
	totalWin: number;
};

// Union type of all book events - Stake Engine pattern
export type BookEvent =
	| BookEventReveal
	| BookEventWin
	| BookEventSetTotalWin
	| BookEventFinalWin
	| BookEventUpdateMultiplier
	| BookEventAddStickyWild
	| BookEventClearStickyWilds
	| BookEventFreeSpin
	| BookEventUpdateFreeSpin
	| BookEventFreeSpinStart
	| BookEventFreeSpinEnd
	| BookEventBonusStart
	| BookEventBonusEnd;

// Context type for bookEventHandlers
export type BookEventContext = {
	bookEvents: BookEvent[];
};
