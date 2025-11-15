// Sample free spin events for Crypto Stacks Metavault
// Individual bookEvents for testing chip collection and upgrades

export default {
	reveal: {
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
	CHIP_COLLECTION: {
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
	SYMBOL_UPGRADE: {
		index: 2,
		type: 'SYMBOL_UPGRADE',
		oldLevel: 0,
		newLevel: 1,
		oldSymbol: 'M1',
		newSymbol: 'M2',
		chipsCollected: 5,
	},
	FREESPIN_STATE: {
		index: 3,
		type: 'FREESPIN_STATE',
		fsRemaining: 6,
		chipsCollected: 5,
		currentUpgradeLevel: 1,
	},
	updateFreeSpin: {
		index: 4,
		type: 'updateFreeSpin',
		amount: 2,
		total: 8,
	},
	winInfo: {
		index: 5,
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
	freeSpinEnd: {
		index: 6,
		type: 'freeSpinEnd',
		amount: 15.0,
		winLevel: 2,
	},
};