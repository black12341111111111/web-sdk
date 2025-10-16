/**
 * Surge Slot Game - Emitter Event Types
 * Following Stake Engine pattern: All emitter events are union types
 * Each component exports its own EmitterEvent type
 */

import type { EmitterEventUi } from 'components-ui-pixi';
import type { EmitterEventBoard } from '../components/Board.svelte';

// Game-specific emitter events will be imported here as they're created
// Example: import type { EmitterEventBoard } from '../components/Board.svelte';

export type EmitterEventGame = 
	| EmitterEventBoard
	| { type: 'gameInit' }
	| { type: 'gameReset' };

// This will be expanded as components are added
