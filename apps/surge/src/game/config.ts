/**
 * Game Configuration for Syndicate Surge
 * Following Stake Engine pattern
 */

export default {
	providerName: 'sample_provider',
	gameName: 'syndicate_surge',
	gameID: '0_0_surge',
	rtp: 0.96,
	numReels: 5,
	numRows: [4, 4, 4, 4, 4],
	betModes: {
		base: {
			cost: 1.0,
			feature: true,
			buyBonus: false,
			rtp: 0.96,
			max_win: 10000.0,
		},
	},
	symbols: {
		// High-paying symbols
		H1: { paytable: [{ '5': 50 }, { '4': 20 }, { '3': 10 }] },
		H2: { paytable: [{ '5': 40 }, { '4': 15 }, { '3': 8 }] },
		H3: { paytable: [{ '5': 30 }, { '4': 12 }, { '3': 6 }] },
		
		// Medium-paying symbols
		M1: { paytable: [{ '5': 20 }, { '4': 8 }, { '3': 4 }] },
		M2: { paytable: [{ '5': 15 }, { '4': 6 }, { '3': 3 }] },
		M3: { paytable: [{ '5': 12 }, { '4': 5 }, { '3': 2.5 }] },
		
		// Low-paying symbols
		L1: { paytable: [{ '5': 10 }, { '4': 4 }, { '3': 2 }] },
		L2: { paytable: [{ '5': 8 }, { '4': 3 }, { '3': 1.5 }] },
		L3: { paytable: [{ '5': 6 }, { '4': 2.5 }, { '3': 1 }] },
		L4: { paytable: [{ '5': 5 }, { '4': 2 }, { '3': 0.8 }] },
		L5: { paytable: [{ '5': 4 }, { '4': 1.5 }, { '3': 0.6 }] },
		L6: { paytable: [{ '5': 3 }, { '4': 1 }, { '3': 0.5 }] },
		
		// Special symbols
		W: { special_properties: ['wild'], substitutes_for: 'all_except_scatter_bonus' },
		SC: { special_properties: ['scatter'] },
		BN: { special_properties: ['bonus'] },
		P: { special_properties: ['persistent_wild'] },
	},
	features: {
		multiplier: {
			min: 1,
			max: 10,
			increments: [1, 2, 3, 5, 10],
		},
		stickyWilds: {
			enabled: true,
			maxPositions: 20,
		},
		freeSpins: {
			trigger: { symbol: 'SC', count: 3 },
			awards: [10, 15, 20],
		},
		bonus: {
			trigger: { symbol: 'BN', count: 3 },
			type: 'pick_em',
		},
	},
};
