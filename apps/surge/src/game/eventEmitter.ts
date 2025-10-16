/**
 * Event Emitter for Surge Slot Game
 * Following Stake Engine pattern
 */

import { createEventEmitter } from 'utils-event-emitter';
import type { EmitterEventUi } from 'components-ui-pixi';
import type { EmitterEventGame } from './typesEmitterEvent';

// Union type of all emitter events - this is the Stake Engine pattern
export type EmitterEvent = EmitterEventUi | EmitterEventGame;

export const { eventEmitter } = createEventEmitter<EmitterEvent>();
