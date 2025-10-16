<script lang="ts">
	/**
	 * Symbol Component - Individual Reel Symbol
	 * Handles different states: static, spin, land, win, anticipation
	 */
	import { Sprite } from 'pixi-svelte';
	import { onMount } from 'svelte';
	import assets from '../game/assets';
	import { SYMBOL_SIZE } from '../game/constants';

	type Props = {
		reelSymbol: any; // Type from createReelForSpinning
		reelIndex: number;
		rowIndex: number;
	};

	const props: Props = $props();
	
	// Get the asset path for this symbol
	const assetKey = `symbol_${props.reelSymbol.rawSymbol.name}` as keyof typeof assets;
	
	// Reactive values based on symbol state
	const scale = $derived(
		props.reelSymbol.symbolState === 'win' ? 1.15 : 
		props.reelSymbol.symbolState === 'anticipation' ? 1.08 : 
		props.reelSymbol.symbolState === 'land' ? 1.05 : 
		1.0
	);
	
	const alpha = $derived(
		props.reelSymbol.symbolState === 'spin' ? 0.6 : 1.0
	);

	// Rotation for spinning effect
	const rotation = $derived(
		props.reelSymbol.symbolState === 'spin' ? 0.1 : 0
	);

	// Handle state transitions
	$effect(() => {
		const state = props.reelSymbol.symbolState;
		
		// When landing, transition to static after animation
		if (state === 'land') {
			setTimeout(() => {
				if (props.reelSymbol.symbolState === 'land') {
					props.reelSymbol.symbolState = 'static';
				}
			}, 300);
		}

		// When win animation completes, call oncomplete
		if (state === 'win') {
			setTimeout(() => {
				props.reelSymbol.oncomplete?.();
			}, 800);
		}
	});

	// Initialize
	onMount(() => {
		// Symbol is ready
		if (props.reelSymbol.symbolState === 'land') {
			props.reelSymbol.symbolState = 'static';
		}
	});
</script>

<Sprite 
	key={assetKey}
	y={props.reelSymbol.symbolY()}
	anchor={0.5}
	width={SYMBOL_SIZE}
	height={SYMBOL_SIZE}
	{scale}
	{alpha}
	{rotation}
/>
