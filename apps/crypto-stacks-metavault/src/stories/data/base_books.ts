// Sample base game books for Crypto Stacks Metavault
// These should be replaced with actual data from math-sdk generation

export default [
	{
		id: 1,
		payoutMultiplier: 0.0,
		events: [
			{
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
			{ index: 1, type: 'setTotalWin', amount: 0 },
			{ index: 2, type: 'finalWin', amount: 0 },
		],
		criteria: '0',
		baseGameWins: 0.0,
		freeGameWins: 0.0,
	},
	{
		id: 2,
		payoutMultiplier: 2.5,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					[{ name: 'M1' }, { name: 'M1' }, { name: 'M1' }, { name: 'A' }],
					[{ name: 'M1' }, { name: 'K' }, { name: 'Q' }, { name: 'M2' }],
					[{ name: 'M1' }, { name: 'A' }, { name: 'J' }, { name: 'M3' }],
					[{ name: 'Q' }, { name: 'K' }, { name: 'M1' }, { name: '9' }],
					[{ name: 'K' }, { name: 'A' }, { name: 'M2' }, { name: '10' }],
				],
				paddingPositions: [0, 0, 0, 0, 0],
				gameType: 'basegame',
				anticipation: [0, 0, 0, 0, 0],
			},
			{
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
			{ index: 2, type: 'setTotalWin', amount: 2.5 },
			{ index: 3, type: 'finalWin', amount: 2.5 },
		],
		criteria: 'basegame',
		baseGameWins: 2.5,
		freeGameWins: 0.0,
	},
	{
		id: 3,
		payoutMultiplier: 8.0,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					[{ name: 'SCATTER' }, { name: 'M1' }, { name: 'K' }, { name: 'A' }],
					[{ name: 'M2' }, { name: 'SCATTER' }, { name: 'Q' }, { name: 'M2' }],
					[{ name: 'J' }, { name: 'SCATTER' }, { name: 'A' }, { name: 'M3' }],
					[{ name: 'Q' }, { name: 'K' }, { name: 'M1' }, { name: '9' }],
					[{ name: 'K' }, { name: 'A' }, { name: 'M2' }, { name: '10' }],
				],
				paddingPositions: [0, 0, 0, 0, 0],
				gameType: 'basegame',
				anticipation: [0, 1, 1, 0, 0],
			},
			{
				index: 1,
				type: 'freeSpinTrigger',
				totalFs: 8,
				positions: [
					{ reel: 0, row: 0 },
					{ reel: 1, row: 1 },
					{ reel: 2, row: 1 },
				],
			},
			// Free spin events would follow here
			{ index: 2, type: 'setTotalWin', amount: 0 },
			{ index: 3, type: 'finalWin', amount: 0 },
		],
		criteria: 'freegame',
		baseGameWins: 0.0,
		freeGameWins: 0.0,
	},
];