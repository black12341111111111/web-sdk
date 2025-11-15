import type { EmitterEventUi } from 'components-ui-pixi';
import type { EmitterEventHotKey } from 'components-shared';
import type { EmitterEventChipCollector } from '../components/ChipCollector.svelte';
import type { EmitterEventSymbolUpgrade } from '../components/SymbolUpgrade.svelte';
import type { EmitterEventWildMultiplier } from '../components/WildMultiplier.svelte';

// Game-specific emitter events
export type EmitterEventGame =
	| EmitterEventChipCollector
	| EmitterEventSymbolUpgrade
	| EmitterEventWildMultiplier
	// Board events
	| { type: 'boardShow' }
	| { type: 'boardHide' }
	| { type: 'boardSettle'; board: any[][] }
	| { type: 'boardWithAnimateSymbols'; symbolPositions: any[] }
	// Free spin events
	| { type: 'freeSpinCounterShow' }
	| { type: 'freeSpinCounterHide' }
	| { type: 'freeSpinCounterUpdate'; current?: number; total?: number }
	| { type: 'freeSpinIntroShow' }
	| { type: 'freeSpinIntroHide' }
	| { type: 'freeSpinIntroUpdate'; totalFreeSpins: number }
	| { type: 'freeSpinOutroShow' }
	| { type: 'freeSpinOutroHide' }
	| { type: 'freeSpinOutroUpdate'; totalWin: number }
	// Win events
	| { type: 'winShow' }
	| { type: 'winHide' }
	| { type: 'winUpdate'; amount: number }
	// Transition events
	| { type: 'transition' }
	| { type: 'transitionComplete' }
	// Sound events
	| { type: 'soundOnce'; name: string }
	| { type: 'soundLoop'; name: string }
	| { type: 'soundStop'; name: string }
	| { type: 'soundMusic'; name: string }
	| { type: 'soundScatterCounterClear' }
	// Stop button
	| { type: 'stopButtonEnable' }
	| { type: 'stopButtonDisable' }
	// Drawer
	| { type: 'drawerButtonShow' }
	| { type: 'drawerFold' }
	// UI
	| { type: 'uiShow' }
	| { type: 'uiHide' };

export type EmitterEvent = EmitterEventUi | EmitterEventHotKey | EmitterEventGame;