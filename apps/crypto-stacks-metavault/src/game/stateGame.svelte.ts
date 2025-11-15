import { createEnhanceBoard } from 'utils-slots';
import type { GameType, RawSymbol } from './types';
import config from './config';

// Game state matching math-sdk GameState
export const stateGame = $state({
	gameType: 'basegame' as GameType,
	// Chip collection state (matching math-sdk)
	chipsCollected: 0,
	currentUpgradeLevel: 0, // 0-4 (M1, M2, M3, M4, DIAMOND)
	fsRemaining: 0,
	// Wild multiplier tracking
	wildMultipliers: {} as Record<number, number>, // reel -> multiplier
	// Current board state
	currentBoard: [] as RawSymbol[][],
});

export const stateGameDerived = {
	enhancedBoard: createEnhanceBoard({
		numReels: config.numReels,
		numRows: config.numRows,
	}),
	
	// Get current upgrade symbol name
	getCurrentUpgradeSymbol(): string {
		const upgradeNames = ['M1', 'M2', 'M3', 'M4', 'DIAMOND'];
		return upgradeNames[stateGame.currentUpgradeLevel] || 'M1';
	},
	
	// Get next upgrade threshold
	getNextUpgradeThreshold(): number | null {
		const thresholds = config.chipUpgradeThresholds;
		if (stateGame.currentUpgradeLevel >= thresholds.length) {
			return null; // Max level reached
		}
		return thresholds[stateGame.currentUpgradeLevel];
	},
	
	// Get progress to next upgrade
	getUpgradeProgress(): number {
		const nextThreshold = this.getNextUpgradeThreshold();
		if (!nextThreshold) return 1; // Max level
		
		const prevThreshold = stateGame.currentUpgradeLevel > 0 
			? config.chipUpgradeThresholds[stateGame.currentUpgradeLevel - 1] 
			: 0;
		
		const progress = (stateGame.chipsCollected - prevThreshold) / (nextThreshold - prevThreshold);
		return Math.max(0, Math.min(1, progress));
	},
	
	// Check if upgrade is available
	canUpgrade(): boolean {
		const nextThreshold = this.getNextUpgradeThreshold();
		return nextThreshold !== null && stateGame.chipsCollected >= nextThreshold;
	},
	
	// Reset chip collection state
	resetChipState(): void {
		stateGame.chipsCollected = 0;
		stateGame.currentUpgradeLevel = 0;
		stateGame.wildMultipliers = {};
	},
	
	// Update chip collection
	addChips(count: number): void {
		stateGame.chipsCollected += count;
	},
	
	// Upgrade to next level
	upgradeLevel(): void {
		if (this.canUpgrade()) {
			stateGame.currentUpgradeLevel++;
		}
	},
	
	// Set wild multiplier for a reel
	setWildMultiplier(reel: number, multiplier: number): void {
		stateGame.wildMultipliers[reel] = multiplier;
	},
	
	// Clear wild multipliers
	clearWildMultipliers(): void {
		stateGame.wildMultipliers = {};
	},
	
	// Get wild multiplier for a reel
	getWildMultiplier(reel: number): number {
		return stateGame.wildMultipliers[reel] || 1;
	},
};