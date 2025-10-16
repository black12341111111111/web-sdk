<script lang="ts">
	/**
	 * Loading Screen Component for Surge Slot
	 * Following Stake Engine pattern - preloads all assets
	 */
	import { Container, Graphics, Text, REM } from 'pixi-svelte';
	import { getContext } from '../game/context';

	type Props = {
		onloaded: () => void;
	};

	const props: Props = $props();
	const context = getContext();

	// Loading progress tracking
	let progress = $state(0);
	let loaded = $state(false);

	// Watch for loading progress from stateApp
	$effect(() => {
		progress = context.stateApp.loadingProgress;
		loaded = context.stateApp.loaded;
	});

	// Handle click/tap to continue after assets loaded
	const handleClick = () => {
		if (loaded) {
			props.onloaded();
		}
	};

	// Position centered on canvas
	const centerX = $derived(context.stateLayoutDerived.canvasSizes().width / 2);
	const centerY = $derived(context.stateLayoutDerived.canvasSizes().height / 2);
</script>

<Container
	x={centerX}
	y={centerY}
	eventMode="static"
	onclick={handleClick}
	cursor={loaded ? 'pointer' : 'default'}
>
	<!-- Background overlay -->
	<Graphics
		draw={(g) => {
			g.clear();
			g.rect(
				-context.stateLayoutDerived.canvasSizes().width / 2,
				-context.stateLayoutDerived.canvasSizes().height / 2,
				context.stateLayoutDerived.canvasSizes().width,
				context.stateLayoutDerived.canvasSizes().height
			);
			g.fill({ color: 0x000000, alpha: 0.9 });
		}}
	/>

	<!-- Loading text -->
	<Text
		text={loaded ? 'TAP TO CONTINUE' : `LOADING... ${Math.round(progress * 100)}%`}
		anchor={{ x: 0.5, y: 0.5 }}
		y={-50}
		style={{
			fontFamily: 'Arial',
			fontSize: REM * 1.5,
			fontWeight: '700',
			fill: 0x00d4ff,
			align: 'center',
		}}
	/>

	<!-- Progress bar background -->
	{#if !loaded}
		<Graphics
			y={20}
			draw={(g) => {
				g.clear();
				g.rect(-200, -10, 400, 20);
				g.fill({ color: 0x333333 });
			}}
		/>

		<!-- Progress bar fill -->
		<Graphics
			y={20}
			draw={(g) => {
				g.clear();
				g.rect(-200, -10, 400 * progress, 20);
				g.fill({ color: 0x00d4ff });
			}}
		/>
	{/if}

	<!-- Game title -->
	<Text
		text="SYNDICATE SURGE"
		anchor={{ x: 0.5, y: 0.5 }}
		y={-150}
		style={{
			fontFamily: 'Arial',
			fontSize: REM * 3,
			fontWeight: '900',
			fill: 0xffffff,
			stroke: { color: 0x00d4ff, width: 4 },
		}}
	/>
</Container>
