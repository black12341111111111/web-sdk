export default {
	providerName: 'sample_provider',
	gameName: 'crypto_stacks_metavault',
	gameID: 'crypto_stacks_metavault',
	rtp: 0.96,
	numReels: 5,
	numRows: [4, 4, 4, 4, 4], // 5x4 grid
	betModes: {
		base: {
			cost: 1.0,
			feature: true,
			buyBonus: false,
			rtp: 0.96,
			max_win: 5000,
		},
		buy_8: {
			cost: 100.0,
			feature: false,
			buyBonus: true,
			rtp: 0.96,
			max_win: 5000,
		},
		buy_15: {
			cost: 200.0,
			feature: false,
			buyBonus: true,
			rtp: 0.96,
			max_win: 5000,
		},
	},
	// Symbol IDs matching math-sdk (0-13)
	// 0-5: Low symbols (9, 10, J, Q, K, A)
	// 6-9: Medium symbols (M1, M2, M3, M4)
	// 10: Premium (DIAMOND)
	// 11: SCATTER
	// 12: WILD (FS only, reels 2-4)
	// 13: CHIP (FS only, collection feature)
	symbols: {
		'9': {
			id: 0,
			paytable: [
				{ '5': 3 },
				{ '4': 1.2 },
				{ '3': 0.5 },
			],
		},
		'10': {
			id: 1,
			paytable: [
				{ '5': 4 },
				{ '4': 1.5 },
				{ '3': 0.6 },
			],
		},
		J: {
			id: 2,
			paytable: [
				{ '5': 5 },
				{ '4': 2 },
				{ '3': 0.8 },
			],
		},
		Q: {
			id: 3,
			paytable: [
				{ '5': 6 },
				{ '4': 2.5 },
				{ '3': 1 },
			],
		},
		K: {
			id: 4,
			paytable: [
				{ '5': 8 },
				{ '4': 3 },
				{ '3': 1.5 },
			],
		},
		A: {
			id: 5,
			paytable: [
				{ '5': 10 },
				{ '4': 4 },
				{ '3': 2 },
			],
		},
		M1: {
			id: 6,
			paytable: [
				{ '5': 12 },
				{ '4': 5 },
				{ '3': 2.5 },
			],
		},
		M2: {
			id: 7,
			paytable: [
				{ '5': 15 },
				{ '4': 6 },
				{ '3': 3 },
			],
		},
		M3: {
			id: 8,
			paytable: [
				{ '5': 20 },
				{ '4': 8 },
				{ '3': 4 },
			],
		},
		M4: {
			id: 9,
			paytable: [
				{ '5': 25 },
				{ '4': 10 },
				{ '3': 5 },
			],
		},
		DIAMOND: {
			id: 10,
			paytable: [
				{ '5': 50 },
				{ '4': 20 },
				{ '3': 10 },
			],
		},
		SCATTER: {
			id: 11,
			paytable: null,
			special_properties: ['scatter'],
		},
		WILD: {
			id: 12,
			paytable: null,
			special_properties: ['wild', 'multiplier'],
		},
		CHIP: {
			id: 13,
			paytable: null,
			special_properties: ['chip'],
		},
	},
	paddingReels: {
		basegame: '',
		freegame: '',
	},
	// Chip collection thresholds for upgrades
	chipUpgradeThresholds: [4, 7, 12, 15],
	// Symbol upgrade progression: M1(6) -> M2(7) -> M3(8) -> M4(9) -> DIAMOND(10)
	upgradeProgression: [6, 7, 8, 9, 10],
};