/**
 * Mock base game books for Storybook testing
 * These are complete books (sequences of bookEvents) used in MODE_BASE/book/random story
 * Following Stake Engine pattern for Syndicate Surge
 */
export default [
	// No win book
	{
		id: 1,
		payoutMultiplier: 0.0,
		events: [
			{
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
			{ index: 1, type: 'setTotalWin', amount: 0 },
			{ index: 2, type: 'finalWin', amount: 0 },
		],
		criteria: '0',
		baseGameWins: 0.0,
		freeGameWins: 0.0,
	},

	// Small win book
	{
		id: 2,
		payoutMultiplier: 0.5,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					[{ name: 'H1' }, { name: 'H1' }, { name: 'H1' }, { name: 'H1' }],
					[{ name: 'M1' }, { name: 'M2' }, { name: 'M3' }, { name: 'L1' }],
					[{ name: 'L2' }, { name: 'L3' }, { name: 'L4' }, { name: 'L5' }],
					[{ name: 'H2' }, { name: 'H3' }, { name: 'M1' }, { name: 'M2' }],
					[{ name: 'L6' }, { name: 'L1' }, { name: 'L2' }, { name: 'L3' }],
				],
				paddingPositions: [95, 105, 115, 100, 110],
				gameType: 'basegame',
				anticipation: [1, 1, 1, 1, 0],
			},
			{
				index: 1,
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
			{ index: 2, type: 'setTotalWin', amount: 500 },
			{ index: 3, type: 'finalWin', amount: 500 },
		],
		criteria: 'basegame_win',
		baseGameWins: 0.5,
		freeGameWins: 0.0,
	},

	// Free spin trigger book
	{
		id: 3,
		payoutMultiplier: 0.0,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					[{ name: 'SC' }, { name: 'H1' }, { name: 'M1' }, { name: 'L1' }],
					[{ name: 'M2' }, { name: 'L2' }, { name: 'H2' }, { name: 'L5' }],
					[{ name: 'L3' }, { name: 'SC' }, { name: 'M3' }, { name: 'L6' }],
					[{ name: 'H1' }, { name: 'L1' }, { name: 'L2' }, { name: 'M1' }],
					[{ name: 'M2' }, { name: 'SC' }, { name: 'L3' }, { name: 'L4' }],
				],
				paddingPositions: [100, 120, 110, 115, 105],
				gameType: 'basegame',
				anticipation: [0, 0, 1, 0, 1],
			},
			{
				index: 1,
				type: 'freeSpinTrigger',
				totalFs: 10,
				scatterPositions: [
					{ reel: 0, row: 0 },
					{ reel: 2, row: 1 },
					{ reel: 4, row: 1 },
				],
			},
			{ index: 2, type: 'setTotalWin', amount: 0 },
			{ index: 3, type: 'finalWin', amount: 0 },
		],
		criteria: 'freespin_trigger',
		baseGameWins: 0.0,
		freeGameWins: 0.0,
	},

	// Bonus trigger book
	{
		id: 4,
		payoutMultiplier: 0.0,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					[{ name: 'H1' }, { name: 'BN' }, { name: 'M1' }, { name: 'L1' }],
					[{ name: 'M2' }, { name: 'L2' }, { name: 'BN' }, { name: 'L5' }],
					[{ name: 'L3' }, { name: 'H3' }, { name: 'M3' }, { name: 'BN' }],
					[{ name: 'H1' }, { name: 'L1' }, { name: 'L2' }, { name: 'M1' }],
					[{ name: 'M2' }, { name: 'H2' }, { name: 'L3' }, { name: 'L4' }],
				],
				paddingPositions: [100, 120, 110, 115, 105],
				gameType: 'basegame',
				anticipation: [0, 0, 1, 1, 0],
			},
			{
				index: 1,
				type: 'bonusTrigger',
				bonusType: 'heist',
				picks: 5,
				bonusPositions: [
					{ reel: 1, row: 0 },
					{ reel: 2, row: 1 },
					{ reel: 3, row: 2 },
				],
			},
			{ index: 2, type: 'setTotalWin', amount: 0 },
			{ index: 3, type: 'finalWin', amount: 0 },
		],
		criteria: 'bonus_trigger',
		baseGameWins: 0.0,
		freeGameWins: 0.0,
	},

	// Win with multiplier and sticky wilds
	{
		id: 5,
		payoutMultiplier: 3.0,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					[{ name: 'W' }, { name: 'H2' }, { name: 'H2' }, { name: 'H2' }],
					[{ name: 'M1' }, { name: 'P' }, { name: 'M3' }, { name: 'L1' }],
					[{ name: 'L2' }, { name: 'W' }, { name: 'L4' }, { name: 'L5' }],
					[{ name: 'H3' }, { name: 'H1' }, { name: 'M1' }, { name: 'M2' }],
					[{ name: 'L6' }, { name: 'L1' }, { name: 'L2' }, { name: 'L3' }],
				],
				paddingPositions: [95, 105, 115, 100, 110],
				gameType: 'basegame',
				anticipation: [1, 1, 1, 0, 0],
			},
			{
				index: 1,
				type: 'multiplier',
				multiplier: 3,
				position: { reel: 1, row: 1 },
			},
			{
				index: 2,
				type: 'stickyWild',
				positions: [
					{ reel: 0, row: 0 },
					{ reel: 2, row: 1 },
				],
				spinsRemaining: 3,
			},
			{
				index: 3,
				type: 'winInfo',
				totalWin: 3000,
				wins: [
					{
						symbol: 'H2',
						kind: 4,
						win: 3000,
						positions: [
							{ reel: 0, row: 0 },
							{ reel: 1, row: 0 },
							{ reel: 2, row: 0 },
							{ reel: 3, row: 0 },
						],
						meta: {
							multiplier: 3,
							winWithoutMult: 1000,
							globalMult: 3,
						},
					},
				],
			},
			{ index: 4, type: 'setTotalWin', amount: 3000 },
			{ index: 5, type: 'finalWin', amount: 3000 },
		],
		criteria: 'big_win_with_features',
		baseGameWins: 3.0,
		freeGameWins: 0.0,
	},
];
