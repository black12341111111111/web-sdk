// Sample base game events for Crypto Stacks Metavault
// Individual bookEvents for testing in storybook

export default {
	reveal: {
		index: 0,
		type: 'reveal',
		board: [
			[{ name: '9' }, { name: 'K' }, { name: 'Q' }, { name: 'A' }],
			[{ name: '10' }, { name: 'J' }, { name: 'K' }, { name: 'M1' }],
			[{ name: 'J' }, { name: 'Q' }, { name: 'A' }, { name: 'M2' }],
			[{ name: 'Q' }, { name: 'K' }, { name: 'M1' }, { name: '9' }],
			[{ name: 'K' }, { name: 'A' }, { name: 'M1' }, { name: '10' }],
		],
		paddingPositions: [0, 0, 0, 0, 0],
		gameType: 'basegame',
		anticipation: [0, 0, 0, 0, 0],
	},
	winInfo: {
		index: 1,
		type: 'winInfo',
		totalWin: 2.5,
		wins: [
			{
				symbol: 'M1',
				kind: 3,
				win: 2.5,
				positions: [
					{ reel: 0, row: 0 },
					{ reel: 0, row: 1 },
					{ reel: 0, row: 2 },
					{ reel: 1, row: 0 },
					{ reel: 2, row: 0 },
				],
				meta: {
					lineIndex: 0,
					multiplier: 1,
					winWithoutMult: 2.5,
					globalMult: 1,
					lineMultiplier: 1,
				},
			},
		],
	},
	setTotalWin: {
		index: 2,
		type: 'setTotalWin',
		amount: 2.5,
	},
	freeSpinTrigger: {
		index: 1,
		type: 'freeSpinTrigger',
		totalFs: 8,
		positions: [
			{ reel: 0, row: 0 },
			{ reel: 1, row: 1 },
			{ reel: 2, row: 1 },
		],
	},
	finalWin: {
		index: 3,
		type: 'finalWin',
		amount: 2.5,
	},
};