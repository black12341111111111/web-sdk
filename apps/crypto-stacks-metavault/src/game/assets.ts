// Official Stake Engine SDK asset loading pattern
// Updated to use custom Crypto Stacks Metavault assets

export default {
	// Loader (preload)
	loader: {
		type: 'spine',
		src: {
			atlas: new URL('../../static/assets/spines/loader/loader.atlas', import.meta.url).href,
			skeleton: new URL('../../static/assets/spines/loader/loader.json', import.meta.url).href,
			scale: 2,
		},
		preload: true,
	},
	
	pressToContinueText: {
		type: 'sprites',
		src: new URL('../../static/assets/sprites/pressToContinueText/MM_pressanywhere.json', import.meta.url).href,
		preload: true,
	},

	// Symbol assets - Low symbols (0-5)
	// NOW USING CUSTOM ASSETS
	'9': {
		type: 'sprite',
		src: new URL('../../static/assets/sprites/custom_symbols/symbol_9.png', import.meta.url).href,
	},
	'10': {
		type: 'sprite',
		src: new URL('../../static/assets/sprites/custom_symbols/symbol_10.png', import.meta.url).href,
	},
	J: {
		type: 'sprite',
		src: new URL('../../static/assets/sprites/custom_symbols/symbol_J.png', import.meta.url).href,
	},
	Q: {
		type: 'sprite',
		src: new URL('../../static/assets/sprites/custom_symbols/symbol_Q.png', import.meta.url).href,
	},
	K: {
		type: 'sprite',
		src: new URL('../../static/assets/sprites/custom_symbols/symbol_K.png', import.meta.url).href,
	},
	A: {
		type: 'sprite',
		src: new URL('../../static/assets/sprites/custom_symbols/symbol_A.png', import.meta.url).href,
	},

	// Symbol assets - Medium symbols (6-9)
	// NOW USING CUSTOM ASSETS
	M1: {
		type: 'sprite',
		src: new URL('../../static/assets/sprites/custom_symbols/symbol_M1.png', import.meta.url).href,
	},
	M2: {
		type: 'sprite',
		src: new URL('../../static/assets/sprites/custom_symbols/symbol_M2.png', import.meta.url).href,
	},
	M3: {
		type: 'sprite',
		src: new URL('../../static/assets/sprites/custom_symbols/symbol_M3.png', import.meta.url).href,
	},
	M4: {
		type: 'sprite',
		src: new URL('../../static/assets/sprites/custom_symbols/symbol_M4.png', import.meta.url).href,
	},

	// Symbol assets - Premium and special (10-13)
	// NOW USING CUSTOM ASSETS
	DIAMOND: {
		type: 'sprite',
		src: new URL('../../static/assets/sprites/custom_symbols/symbol_DIAMOND.png', import.meta.url).href,
	},
	SCATTER: {
		type: 'sprite',
		src: new URL('../../static/assets/sprites/custom_symbols/symbol_SCATTER.png', import.meta.url).href,
	},
	WILD: {
		type: 'sprite',
		src: new URL('../../static/assets/sprites/custom_symbols/symbol_WILD.png', import.meta.url).href,
	},
	CHIP: {
		type: 'sprite',
		src: new URL('../../static/assets/sprites/custom_symbols/symbol_CHIP.png', import.meta.url).href,
	},

	// UI Elements
	reelsFrame: {
		type: 'sprites',
		src: new URL('../../static/assets/sprites/reelsFrame/reels_frame.json', import.meta.url).href,
	},
	
	payFrame: {
		type: 'sprite',
		src: new URL('../../static/assets/sprites/payFrame/payFrame.png', import.meta.url).href,
	},

	// Animations
	anticipation: {
		type: 'spine',
		src: {
			atlas: new URL('../../static/assets/spines/anticipation/anticipation.atlas', import.meta.url).href,
			skeleton: new URL('../../static/assets/spines/anticipation/anticipation.json', import.meta.url).href,
			scale: 2,
		},
	},

	explosion: {
		type: 'spine',
		src: {
			atlas: new URL('../../static/assets/spines/symbols3/symbols3.atlas', import.meta.url).href,
			skeleton: new URL('../../static/assets/spines/symbols3/explosion.json', import.meta.url).href,
			scale: 2,
		},
	},

	// Win animations
	bigwin: {
		type: 'spine',
		src: {
			atlas: new URL('../../static/assets/spines/bigwin/big_wins.atlas', import.meta.url).href,
			skeleton: new URL('../../static/assets/spines/bigwin/mm_bigwin.json', import.meta.url).href,
			scale: 2,
		},
	},

	// Free spin screens
	fsIntro: {
		type: 'spine',
		src: {
			atlas: new URL('../../static/assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../static/assets/spines/fsIntro/fs_screen.json', import.meta.url).href,
			scale: 2,
		},
	},

	fsIntroNumber: {
		type: 'spine',
		src: {
			atlas: new URL('../../static/assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../static/assets/spines/fsIntro/fs_screen_number.json', import.meta.url).href,
			scale: 2,
		},
	},

	fsOutroNumber: {
		type: 'spine',
		src: {
			atlas: new URL('../../static/assets/spines/fsIntro/fs_screen.atlas', import.meta.url).href,
			skeleton: new URL('../../static/assets/spines/fsIntro/fs_total_number.json', import.meta.url).href,
			scale: 2,
		},
	},

	// Background animations
	foregroundAnimation: {
		type: 'spine',
		src: {
			atlas: new URL('../../static/assets/spines/foregroundAnimation/mm_bg.atlas', import.meta.url).href,
			skeleton: new URL('../../static/assets/spines/foregroundAnimation/mm_bg.json', import.meta.url).href,
			scale: 2,
		},
		preload: true,
	},

	foregroundFeatureAnimation: {
		type: 'spine',
		src: {
			atlas: new URL('../../static/assets/spines/foregroundFeatureAnimation/mm_bg_feature.atlas', import.meta.url).href,
			skeleton: new URL('../../static/assets/spines/foregroundFeatureAnimation/mm_bg_feature.json', import.meta.url).href,
			scale: 2,
		},
		preload: true,
	},

	transition: {
		type: 'spine',
		src: {
			atlas: new URL('../../static/assets/spines/transition/transition.atlas', import.meta.url).href,
			skeleton: new URL('../../static/assets/spines/transition/transition.json', import.meta.url).href,
			scale: 2,
		},
	},

	// Multiplier (reusing globalMultiplier for wild multipliers and chip collection)
	globalMultiplier: {
		type: 'spine',
		src: {
			atlas: new URL('../../static/assets/spines/globalMultiplier/multiframe.atlas', import.meta.url).href,
			skeleton: new URL('../../static/assets/spines/globalMultiplier/multiframe.json', import.meta.url).href,
			scale: 2,
		},
	},

	reelhouse: {
		type: 'spine',
		src: {
			atlas: new URL('../../static/assets/spines/reelhouse/reelhouse_glow.atlas', import.meta.url).href,
			skeleton: new URL('../../static/assets/spines/reelhouse/reelhouse_glow.json', import.meta.url).href,
			scale: 2,
		},
	},

	// Fonts
	goldFont: {
		type: 'font',
		src: new URL('../../static/assets/fonts/goldFont/mm_gold.xml', import.meta.url).href,
	},

	goldBlur: {
		type: 'font',
		src: new URL('../../static/assets/fonts/goldBlur/miningfont_gold_blur.xml', import.meta.url).href,
	},

	silverFont: {
		type: 'font',
		src: new URL('../../static/assets/fonts/silverFont/mm_silver.xml', import.meta.url).href,
	},

	purpleFont: {
		type: 'font',
		src: new URL('../../static/assets/fonts/purpleFont/mm_purple.xml', import.meta.url).href,
	},

	// Sprites
	freeSpins: {
		type: 'sprites',
		src: new URL('../../static/assets/sprites/freeSpins/freeSpins.json', import.meta.url).href,
	},

	winSmall: {
		type: 'sprites',
		src: new URL('../../static/assets/sprites/winSmall/MM_Localisation_winsmall.json', import.meta.url).href,
	},

	symbolsStatic: {
		type: 'sprites',
		src: new URL('../../static/assets/sprites/symbolsStatic/symbolsStatic.json', import.meta.url).href,
	},

	progressBar: {
		type: 'sprites',
		src: new URL('../../static/assets/sprites/progressBar/progressBar.json', import.meta.url).href,
		preload: true,
	},

	// Cluster win (can be reused for chip collection animation)
	clusterWin: {
		type: 'spine',
		src: {
			atlas: new URL('../../static/assets/spines/clusterWin/clusterpay.atlas', import.meta.url).href,
			skeleton: new URL('../../static/assets/spines/clusterWin/clusterpay.json', import.meta.url).href,
			scale: 2,
		},
	},

	// Tumble win (can be reused for symbol upgrade animation)
	tumble_multiplier: {
		type: 'spine',
		src: {
			atlas: new URL('../../static/assets/spines/tumbleWin/tumble_win.atlas', import.meta.url).href,
			skeleton: new URL('../../static/assets/spines/tumbleWin/tumble_multiplier.json', import.meta.url).href,
			scale: 2,
		},
	},

	tumble_win: {
		type: 'spine',
		src: {
			atlas: new URL('../../static/assets/spines/tumbleWin/tumble_win.atlas', import.meta.url).href,
			skeleton: new URL('../../static/assets/spines/tumbleWin/tumble_win.json', import.meta.url).href,
			scale: 2,
		},
	},

	// Coins animation
	coins: {
		type: 'spriteSheet',
		src: new URL('../../static/assets/sprites/coin/SD2_Coin.json', import.meta.url).href,
	},

	// Audio
	sound: {
		type: 'audio',
		src: new URL('../../static/assets/audio/sounds.json', import.meta.url).href,
		preload: true,
	},
} as const;