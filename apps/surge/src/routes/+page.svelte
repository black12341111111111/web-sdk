<script lang="ts">
	/**
	 * Entry point for Surge Slot Game
	 * Following Stake Engine pattern:
	 * 1. Set context at entry level
	 * 2. Render Game component
	 */
	import Game from '../components/Game.svelte';
	import { setContext } from '../game/context';

	// Set all contexts (EventEmitter, Xstate, Layout, App)
	// This must be done before any child components are rendered
	setContext();
</script>

<Game />
