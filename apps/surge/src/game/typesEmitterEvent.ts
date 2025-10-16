/**
 * Surge Slot Game - Emitter Event Types
 * Following Stake Engine pattern: All emitter events are union types
 * Each component exports its own EmitterEvent type
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { EmitterEventUi } from 'components-ui-pixi';
import type { EmitterEventBoard } from '../components/Board.svelte';
import type { EmitterEventWin } from '../components/Win.svelte';
import type { EmitterEventMultiplierDisplay } from '../components/MultiplierDisplay.svelte';
import type { EmitterEventStickyWildsDisplay } from '../components/StickyWildsDisplay.svelte';

// Game-specific emitter events will be imported here as they're created
// Example: import type { EmitterEventBoard } from '../components/Board.svelte';

export type EmitterEventGame = 
	| EmitterEventBoard
	| EmitterEventWin
	| EmitterEventMultiplierDisplay
	| EmitterEventStickyWildsDisplay
	| { type: 'gameInit' }
	| { type: 'gameReset' };

// This will be expanded as components are added
