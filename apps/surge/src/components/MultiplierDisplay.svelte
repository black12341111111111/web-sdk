<script lang="ts" module>
	/**
	 * Emitter Events for Multiplier Display Component
	 */
	export type EmitterEventMultiplierDisplay =
		| { type: 'multiplierShow' }
		| { type: 'multiplierHide' }
		| { type: 'multiplierUpdate'; multiplier: number };
</script>

<script lang="ts">
	/**
	 * MultiplierDisplay Component - Show current multiplier value
	 * Following Stake Engine pattern
	 */
	import { Container, Text } from 'pixi-svelte';
	import { getContext } from '../game/context';
	import { SYMBOL_SIZE } from '../game/constants';

	const context = getContext();

	// Component state
	let show = $state(true); // Always visible
	let multiplier = $state(1);
	let animationScale = $state(1.0);

	// Subscribe to multiplier events
	context.eventEmitter.subscribeOnMount({
		multiplierShow: () => {
			show = true;
		},

		multiplierHide: () => {
			show = false;
		},

		multiplierUpdate: ({ multiplier: newMultiplier }) => {
			multiplier = newMultiplier;
			
			// Animate scale on update
			animationScale = 1.5;
			setTimeout(() => {
				animationScale = 1.2;
				setTimeout(() => {
					animationScale = 1.0;
				}, 150);
			}, 150);
		},
	});

	// Format multiplier text
	const formattedText = $derived(`${multiplier}x`);

	// Position in top-right corner of board
	const displayX = $derived(
		context.stateGameDerived.boardLayout().x + 
		context.stateGameDerived.boardLayout().width + SYMBOL_SIZE * 0.5
	);
	const displayY = $derived(
		context.stateGameDerived.boardLayout().y - SYMBOL_SIZE * 0.5
	);

	// Color changes based on multiplier value
	const color = $derived(
		multiplier >= 10 ? 0xff0000 : // Red for 10x+
		multiplier >= 5 ? 0xff8800 : // Orange for 5x+
		multiplier >= 3 ? 0xffd700 : // Gold for 3x+
		0xffffff // White for less
	);
</script>

{#if show && multiplier > 1}
	<Container x={displayX} y={displayY}>
		<!-- Background circle/badge -->
		<Text
			text="●"
			anchor={0.5}
			scale={animationScale * 2}
			style={{
				fontFamily: 'Arial',
				fontSize: SYMBOL_SIZE * 0.5,
				fill: 0x000000,
				alpha: 0.7,
			}}
		/>

		<!-- Multiplier text -->
		<Text
			text={formattedText}
			anchor={{ x: 0.5, y: 0.5 }}
			scale={animationScale}
			style={{
				fontFamily: 'proxima-nova',
				fontSize: SYMBOL_SIZE * 0.5,
				fontWeight: '900',
				fill: color,
				stroke: { color: 0x000000, width: 4 },
				dropShadow: {
					alpha: 0.8,
					angle: Math.PI / 6,
					blur: 2,
					color: color,
					distance: 3,
				},
			}}
		/>
	</Container>
{/if}
