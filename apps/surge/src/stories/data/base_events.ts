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

	win: {
		index: 1,
		type: 'win',
		winAmount: 500,
		winPositions: [
			{ reel: 0, row: 0 },
			{ reel: 1, row: 0 },
			{ reel: 2, row: 0 },
			{ reel: 3, row: 0 },
		],
	},

	setTotalWin: {
		index: 2,
		type: 'setTotalWin',
		amount: 1000,
	},

	updateMultiplier: {
		index: 3,
		type: 'updateMultiplier',
		multiplier: 3,
	},

	addStickyWild: {
		index: 4,
		type: 'addStickyWild',
		positions: [
			{ reel: 1, row: 1 },
			{ reel: 3, row: 2 },
		],
	},

	clearStickyWilds: {
		index: 5,
		type: 'clearStickyWilds',
	},

	freeSpin: {
		index: 6,
		type: 'freeSpin',
		totalFs: 10,
		remainingFs: 5,
	},

	updateFreeSpin: {
		index: 7,
		type: 'updateFreeSpin',
		current: 5,
		total: 10,
	},

	freeSpinStart: {
		index: 8,
		type: 'freeSpinStart',
		totalFs: 10,
	},

	freeSpinEnd: {
		index: 9,
		type: 'freeSpinEnd',
		totalWin: 2500,
	},

	bonusStart: {
		index: 10,
		type: 'bonusStart',
	},

	bonusEnd: {
		index: 11,
		type: 'bonusEnd',
		totalWin: 5000,
	},

	finalWin: {
		index: 12,
		type: 'finalWin',
		amount: 2500,
	},
};
