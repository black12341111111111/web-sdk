// Sample free spin books for Crypto Stacks Metavault
// These include chip collection and symbol upgrade features

export default [
	{
		id: 1,
		payoutMultiplier: 15.0,
		events: [
			// Spin 1 - Collect 2 chips
			{
				index: 0,
				type: 'reveal',
				board: [
					[{ name: 'M1' }, { name: 'CHIP' }, { name: 'K' }, { name: 'A' }],
					[{ name: 'M2' }, { name: 'WILD', multiplier: 2 }, { name: 'Q' }, { name: 'M2' }],
					[{ name: 'J' }, { name: 'M1' }, { name: 'CHIP' }, { name: 'M3' }],
					[{ name: 'Q' }, { name: 'K' }, { name: 'M1' }, { name: '9' }],
					[{ name: 'K' }, { name: 'A' }, { name: 'M2' }, { name: '10' }],
				],
				paddingPositions: [0, 0, 0, 0, 0],
				gameType: 'freegame',
				anticipation: [0, 0, 0, 0, 0],
			},
			{
				index: 1,
				type: 'CHIP_COLLECTION',
				chipCount: 2,
				totalChips: 2,
				positions: [
					{ reel: 0, row: 1 },
					{ reel: 2, row: 2 },
				],
				currentLevel: 0,
			},
			{
				index: 2,
				type: 'winInfo',
				totalWin: 5.0,
				wins: [
					{
						symbol: 'M1',
						kind: 3,
						win: 5.0,
						positions: [
							{ reel: 0, row: 0 },
							{ reel: 1, row: 2 },
							{ reel: 2, row: 0 },
						],
						meta: {
							lineIndex: 0,
							multiplier: 2,
							winWithoutMult: 2.5,
							globalMult: 1,
							lineMultiplier: 2,
						},
					},
				],
			},
			{ index: 3, type: 'updateFreeSpin', amount: 1, total: 8 },
			// Spin 2 - Collect 3 more chips, trigger upgrade to M2
			{
				index: 4,
				type: 'reveal',
				board: [
					[{ name: 'CHIP' }, { name: 'M1' }, { name: 'K' }, { name: 'A' }],
					[{ name: 'M2' }, { name: 'CHIP' }, { name: 'Q' }, { name: 'M2' }],
					[{ name: 'J' }, { name: 'WILD', multiplier: 3 }, { name: 'CHIP' }, { name: 'M3' }],
					[{ name: 'Q' }, { name: 'K' }, { name: 'M1' }, { name: '9' }],
					[{ name: 'K' }, { name: 'A' }, { name: 'M2' }, { name: '10' }],
				],
				paddingPositions: [0, 0, 0, 0, 0],
				gameType: 'freegame',
				anticipation: [0, 0, 0, 0, 0],
			},
			{
				index: 5,
				type: 'CHIP_COLLECTION',
				chipCount: 3,
				totalChips: 5,
				positions: [
					{ reel: 0, row: 0 },
					{ reel: 1, row: 1 },
					{ reel: 2, row: 2 },
				],
				currentLevel: 0,
			},
			{
				index: 6,
				type: 'SYMBOL_UPGRADE',
				oldLevel: 0,
				newLevel: 1,
				oldSymbol: 'M1',
				newSymbol: 'M2',
				chipsCollected: 5,
			},
			{
				index: 7,
				type: 'winInfo',
				totalWin: 9.0,
				wins: [
					{
						symbol: 'M2',
						kind: 3,
						win: 9.0,
						positions: [
							{ reel: 0, row: 0 },
							{ reel: 1, row: 0 },
							{ reel: 2, row: 1 },
						],
						meta: {
							lineIndex: 0,
							multiplier: 3,
							winWithoutMult: 3.0,
							globalMult: 1,
							lineMultiplier: 3,
						},
					},
				],
			},
			{ index: 8, type: 'updateFreeSpin', amount: 2, total: 8 },
			// Remaining spins...
			{ index: 9, type: 'setTotalWin', amount: 15.0 },
			{ index: 10, type: 'freeSpinEnd', amount: 15.0, winLevel: 2 },
		],
		criteria: 'freegame',
		baseGameWins: 0.0,
		freeGameWins: 15.0,
	},
];