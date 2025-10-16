/**
 * Mock base game events for Storybook testing
 * These are individual bookEvents used in MODE_BASE/bookEvent stories
 * Following Stake Engine pattern for Syndicate Surge
 */
export default {
	reveal: {
		index: 0,
		type: 'reveal',
		board: [
			[{ name: 'H1' }, { name: 'M1' }, { name: 'L1' }, { name: 'L4' }],
			[{ name: 'M2' }, { name: 'L2' }, { name: 'H2' }, { name: 'L5' }],
			[{ name: 'L3' }, { name: 'H3' }, { name: 'M3' }, { name: 'L6' }],
			[{ name: 'H1' }, { name: 'L1' }, { name: 'L2' }, { name: 'M1' }],
			[{ name: 'M2' }, { name: 'H2' }, { name: 'L3' }, { name: 'L4' }],
		],
		paddingPositions: [100, 120, 110, 115, 105],
		gameType: 'basegame',
		anticipation: [0, 0, 0, 0, 0],
	},

	setTotalWin: {
		index: 1,
		type: 'setTotalWin',
		amount: 1000,
	},

	multiplier: {
		index: 2,
		type: 'multiplier',
		multiplier: 3,
		position: { reel: 2, row: 1 },
	},

	stickyWild: {
		index: 3,
		type: 'stickyWild',
		positions: [
			{ reel: 1, row: 1 },
			{ reel: 3, row: 2 },
		],
		spinsRemaining: 3,
	},

	winInfo: {
		index: 4,
		type: 'winInfo',
		totalWin: 500,
		wins: [
			{
				symbol: 'H1',
				kind: 4,
				win: 500,
				positions: [
					{ reel: 0, row: 0 },
					{ reel: 1, row: 0 },
					{ reel: 2, row: 0 },
					{ reel: 3, row: 0 },
				],
				meta: {
					multiplier: 1,
					winWithoutMult: 500,
					globalMult: 1,
				},
			},
		],
	},

	freeSpinTrigger: {
		index: 5,
		type: 'freeSpinTrigger',
		totalFs: 10,
		scatterPositions: [
			{ reel: 0, row: 1 },
			{ reel: 2, row: 2 },
			{ reel: 4, row: 1 },
		],
	},

	updateFreeSpin: {
		index: 6,
		type: 'updateFreeSpin',
		amount: 5,
		total: 10,
	},

	bonusTrigger: {
		index: 7,
		type: 'bonusTrigger',
		bonusType: 'heist',
		picks: 5,
		bonusPositions: [
			{ reel: 1, row: 0 },
			{ reel: 2, row: 1 },
			{ reel: 3, row: 2 },
		],
	},

	finalWin: {
		index: 8,
		type: 'finalWin',
		amount: 2500,
	},
};
