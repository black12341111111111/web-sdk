<script lang="ts" module>
	/**
	 * Emitter Events for Win Component
	 */
	export type EmitterEventWin =
		| { type: 'winShow'; amount: number; positions: { reel: number; row: number }[] }
		| { type: 'winHide' };
</script>

<script lang="ts">
	/**
	 * Win Component - Display win amounts and celebrations
	 * Following Stake Engine pattern
	 */
	import { Container, Text } from 'pixi-svelte';
	import { getContext } from '../game/context';
	import { SYMBOL_SIZE } from '../game/constants';

	const context = getContext();

	// Component state
	let show = $state(false);
	// eslint-disable-next-line no-unused-vars
	let amount = $state(0);
	let positions = $state<{ reel: number; row: number }[]>([]);
	let countUpAmount = $state(0);
	let countUpInterval: number | undefined;

	// Subscribe to win events
	context.eventEmitter.subscribeOnMount({
		winShow: ({ amount: winAmount, positions: winPositions }) => {
			show = true;
			amount = winAmount;
			positions = winPositions;
			
			// Clear any existing interval
			if (countUpInterval) {
				clearInterval(countUpInterval);
			}
			
			// Start count-up animation
			countUpAmount = 0;
			const duration = 2000; // 2 seconds
			const steps = 60;
			const increment = winAmount / steps;
			const interval = duration / steps;
			
			let currentStep = 0;
			countUpInterval = setInterval(() => {
				currentStep++;
				if (currentStep >= steps) {
					countUpAmount = winAmount;
					if (countUpInterval) clearInterval(countUpInterval);
				} else {
					countUpAmount += increment;
				}
			}, interval);
		},

		winHide: () => {
			show = false;
			if (countUpInterval) {
				clearInterval(countUpInterval);
				countUpInterval = undefined;
			}
		},
	});

	// Cleanup on unmount
	$effect(() => {
		return () => {
			if (countUpInterval) {
				clearInterval(countUpInterval);
			}
		};
	});

	// Format amount for display
	const formattedAmount = $derived(`WIN: ${Math.floor(countUpAmount)}`);

	// Calculate position above the board center
	const displayX = $derived(
		context.stateGameDerived.boardLayout().x + 
		(context.stateGameDerived.boardLayout().width / 2)
	);
	const displayY = $derived(
		context.stateGameDerived.boardLayout().y - SYMBOL_SIZE
	);
</script>

{#if show}
	<Container x={displayX} y={displayY}>
		<!-- Win text with glow effect -->
		<Text
			text={formattedAmount}
			anchor={{ x: 0.5, y: 0.5 }}
			style={{
				fontFamily: 'proxima-nova',
				fontSize: SYMBOL_SIZE * 0.8,
				fontWeight: '900',
				fill: 0xffd700, // Gold color
				stroke: { color: 0x000000, width: 8 },
				dropShadow: {
					alpha: 0.8,
					angle: Math.PI / 6,
					blur: 4,
					color: 0xffd700,
					distance: 6,
				},
			}}
		/>
	</Container>

	<!-- Highlight winning symbols -->
	{#each positions as position, index (index)}
		<Container
			x={context.stateGameDerived.boardLayout().x + position.reel * SYMBOL_SIZE}
			y={context.stateGameDerived.boardLayout().y + position.row * SYMBOL_SIZE}
		>
			<!-- Yellow glow rectangle behind winning symbol -->
			<Text
				text="█"
				anchor={0.5}
				style={{
					fontFamily: 'proxima-nova',
					fontSize: SYMBOL_SIZE * 1.5,
					fill: 0xffff00,
					alpha: 0.3,
				}}
			/>
		</Container>
	{/each}
{/if}
