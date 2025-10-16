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
	
	// Animation state
	let animationScale = $state(1.0);
	let animationAlpha = $state(1.0);
	let animationRotation = $state(0);
	let winAnimationFrame = $state(0);
	
	// Reactive values based on symbol state
	const scale = $derived(
		props.reelSymbol.symbolState === 'win' ? 1.0 + Math.sin(winAnimationFrame * 0.1) * 0.15 : 
		props.reelSymbol.symbolState === 'anticipation' ? 1.0 + Math.sin(Date.now() * 0.005) * 0.08 : 
		props.reelSymbol.symbolState === 'land' ? animationScale : 
		1.0
	);
	
	const alpha = $derived(
		props.reelSymbol.symbolState === 'spin' ? 0.6 : animationAlpha
	);

	// Rotation for spinning effect
	const rotation = $derived(
		props.reelSymbol.symbolState === 'spin' ? animationRotation : 0
	);

	// Win animation loop
	let winAnimationInterval: number | undefined;
	
	// Handle state transitions
	$effect(() => {
		const state = props.reelSymbol.symbolState;
		
		// When landing, add bounce effect
		if (state === 'land') {
			animationScale = 1.2;
			
			// Animate scale back down with bounce
			setTimeout(() => {
				animationScale = 0.95;
				setTimeout(() => {
					animationScale = 1.05;
					setTimeout(() => {
						animationScale = 1.0;
						if (props.reelSymbol.symbolState === 'land') {
							props.reelSymbol.symbolState = 'static';
						}
					}, 100);
				}, 100);
			}, 100);
		}

		// Win animation with pulsing effect
		if (state === 'win') {
			winAnimationFrame = 0;
			if (winAnimationInterval) clearInterval(winAnimationInterval);
			
			winAnimationInterval = setInterval(() => {
				winAnimationFrame += 1;
			}, 50) as unknown as number;
			
			setTimeout(() => {
				if (winAnimationInterval) clearInterval(winAnimationInterval);
				props.reelSymbol.oncomplete?.();
			}, 1200);
		} else {
			if (winAnimationInterval) {
				clearInterval(winAnimationInterval);
				winAnimationInterval = undefined;
			}
		}

		// Anticipation pulse effect (handled by derived scale)
		
		// Spinning rotation effect
		if (state === 'spin') {
			const rotationInterval = setInterval(() => {
				animationRotation += 0.05;
			}, 16);
			
			return () => clearInterval(rotationInterval);
		} else {
			animationRotation = 0;
		}
	});

	// Initialize
	onMount(() => {
		// Symbol is ready
		if (props.reelSymbol.symbolState === 'land') {
			props.reelSymbol.symbolState = 'static';
		}
		
		return () => {
			if (winAnimationInterval) clearInterval(winAnimationInterval);
		};
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
