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
				type: 'win',
				winAmount: 500,
				winPositions: [
					{ reel: 0, row: 0 },
					{ reel: 1, row: 0 },
					{ reel: 2, row: 0 },
					{ reel: 3, row: 0 },
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
				type: 'freeSpinStart',
				totalFs: 10,
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
				type: 'bonusStart',
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
				type: 'updateMultiplier',
				multiplier: 3,
			},
			{
				index: 2,
				type: 'addStickyWild',
				positions: [
					{ reel: 0, row: 0 },
					{ reel: 2, row: 1 },
				],
			},
			{
				index: 3,
				type: 'win',
				winAmount: 3000,
				winPositions: [
					{ reel: 0, row: 0 },
					{ reel: 1, row: 0 },
					{ reel: 2, row: 0 },
					{ reel: 3, row: 0 },
				],
			},
			{ index: 4, type: 'setTotalWin', amount: 3000 },
			{ index: 5, type: 'finalWin', amount: 3000 },
		],
		criteria: 'big_win_with_features',
		baseGameWins: 3.0,
		freeGameWins: 0.0,
	},

	// Big win with max multiplier
	{
		id: 6,
		payoutMultiplier: 10.0,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					[{ name: 'H1' }, { name: 'H1' }, { name: 'H1' }, { name: 'H1' }],
					[{ name: 'H1' }, { name: 'P' }, { name: 'H1' }, { name: 'H1' }],
					[{ name: 'H1' }, { name: 'H1' }, { name: 'H1' }, { name: 'H1' }],
					[{ name: 'H1' }, { name: 'H1' }, { name: 'H1' }, { name: 'H1' }],
					[{ name: 'H1' }, { name: 'H1' }, { name: 'H1' }, { name: 'H1' }],
				],
				paddingPositions: [80, 90, 95, 85, 100],
				gameType: 'basegame',
				anticipation: [1, 1, 1, 1, 1],
			},
			{
				index: 1,
				type: 'updateMultiplier',
				multiplier: 10,
			},
			{
				index: 2,
				type: 'win',
				winAmount: 10000,
				winPositions: [
					{ reel: 0, row: 0 },
					{ reel: 1, row: 0 },
					{ reel: 2, row: 0 },
					{ reel: 3, row: 0 },
					{ reel: 4, row: 0 },
				],
			},
			{ index: 3, type: 'setTotalWin', amount: 10000 },
			{ index: 4, type: 'finalWin', amount: 10000 },
		],
		criteria: 'max_multiplier_big_win',
		baseGameWins: 10.0,
		freeGameWins: 0.0,
	},

	// Multiple wins
	{
		id: 7,
		payoutMultiplier: 2.5,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					[{ name: 'H2' }, { name: 'H2' }, { name: 'M1' }, { name: 'L1' }],
					[{ name: 'H2' }, { name: 'M2' }, { name: 'M1' }, { name: 'L2' }],
					[{ name: 'H2' }, { name: 'L3' }, { name: 'M1' }, { name: 'L3' }],
					[{ name: 'H2' }, { name: 'L4' }, { name: 'M1' }, { name: 'L4' }],
					[{ name: 'L5' }, { name: 'L5' }, { name: 'L5' }, { name: 'L5' }],
				],
				paddingPositions: [90, 95, 100, 105, 110],
				gameType: 'basegame',
				anticipation: [1, 1, 1, 1, 0],
			},
			{
				index: 1,
				type: 'win',
				winAmount: 1500,
				winPositions: [
					{ reel: 0, row: 0 },
					{ reel: 1, row: 0 },
					{ reel: 2, row: 0 },
					{ reel: 3, row: 0 },
				],
			},
			{
				index: 2,
				type: 'win',
				winAmount: 1000,
				winPositions: [
					{ reel: 0, row: 2 },
					{ reel: 1, row: 2 },
					{ reel: 2, row: 2 },
					{ reel: 3, row: 2 },
				],
			},
			{ index: 3, type: 'setTotalWin', amount: 2500 },
			{ index: 4, type: 'finalWin', amount: 2500 },
		],
		criteria: 'multiple_wins',
		baseGameWins: 2.5,
		freeGameWins: 0.0,
	},

	// Full board wilds
	{
		id: 8,
		payoutMultiplier: 50.0,
		events: [
			{
				index: 0,
				type: 'reveal',
				board: [
					[{ name: 'W' }, { name: 'W' }, { name: 'W' }, { name: 'W' }],
					[{ name: 'W' }, { name: 'W' }, { name: 'W' }, { name: 'W' }],
					[{ name: 'W' }, { name: 'W' }, { name: 'W' }, { name: 'W' }],
					[{ name: 'W' }, { name: 'W' }, { name: 'W' }, { name: 'W' }],
					[{ name: 'W' }, { name: 'W' }, { name: 'W' }, { name: 'W' }],
				],
				paddingPositions: [50, 60, 70, 80, 90],
				gameType: 'basegame',
				anticipation: [1, 1, 1, 1, 1],
			},
			{
				index: 1,
				type: 'updateMultiplier',
				multiplier: 5,
			},
			{
				index: 2,
				type: 'win',
				winAmount: 50000,
				winPositions: [
					{ reel: 0, row: 0 },
					{ reel: 1, row: 0 },
					{ reel: 2, row: 0 },
					{ reel: 3, row: 0 },
					{ reel: 4, row: 0 },
				],
			},
			{ index: 3, type: 'setTotalWin', amount: 50000 },
			{ index: 4, type: 'finalWin', amount: 50000 },
		],
		criteria: 'full_board_wilds',
		baseGameWins: 50.0,
		freeGameWins: 0.0,
	},
];
