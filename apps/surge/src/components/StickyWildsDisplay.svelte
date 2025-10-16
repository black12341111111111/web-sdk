<script lang="ts" module>
	/**
	 * Emitter Events for Sticky Wilds Display Component
	 */
	export type EmitterEventStickyWildsDisplay =
		| { type: 'stickyWildsShow' }
		| { type: 'stickyWildsHide' }
		| { type: 'stickyWildsAdd'; positions: { reel: number; row: number }[] }
		| { type: 'stickyWildsClear' };
</script>

<script lang="ts">
	/**
	 * StickyWildsDisplay Component - Show sticky wild indicators
	 * Following Stake Engine pattern
	 */
	import { Container, Graphics } from 'pixi-svelte';
	import { getContext } from '../game/context';
	import { SYMBOL_SIZE } from '../game/constants';
	import { getSymbolX } from '../game/utils';

	const context = getContext();

	// Component state
	let show = $state(true);
	let stickyPositions = $state<{ reel: number; row: number }[]>([]);

	// Derived positions with computed coordinates
	const stickyPositionsWithCoords = $derived(
		stickyPositions.map((position) => ({
			...position,
			x: getSymbolX(position.reel),
			y: context.stateGameDerived.boardLayout().y + position.row * SYMBOL_SIZE,
		}))
	);

	// Subscribe to sticky wild events
	context.eventEmitter.subscribeOnMount({
		stickyWildsShow: () => {
			show = true;
		},

		stickyWildsHide: () => {
			show = false;
		},

		stickyWildsAdd: ({ positions }) => {
			// Add new positions to existing ones
			stickyPositions = [...stickyPositions, ...positions];
		},

		stickyWildsClear: () => {
			stickyPositions = [];
		},
	});
</script>

{#if show}
	<!-- Sticky wild indicators -->
	{#each stickyPositionsWithCoords as position (JSON.stringify(position))}
		<Container
			x={position.x}
			y={position.y}
		>
			<!-- Border/frame to indicate sticky -->
			<Graphics
				draw={(g) => {
					g.clear();
					// Draw yellow border
					g.lineStyle(4, 0xffff00, 1);
					g.drawRoundedRect(
						-SYMBOL_SIZE / 2,
						-SYMBOL_SIZE / 2,
						SYMBOL_SIZE,
						SYMBOL_SIZE,
						8
					);
					// Draw corner indicators
					g.beginFill(0xffff00, 0.8);
					const cornerSize = 12;
					// Top-left corner
					g.drawRect(-SYMBOL_SIZE / 2, -SYMBOL_SIZE / 2, cornerSize, cornerSize);
					// Top-right corner
					g.drawRect(SYMBOL_SIZE / 2 - cornerSize, -SYMBOL_SIZE / 2, cornerSize, cornerSize);
					// Bottom-left corner
					g.drawRect(-SYMBOL_SIZE / 2, SYMBOL_SIZE / 2 - cornerSize, cornerSize, cornerSize);
					// Bottom-right corner
					g.drawRect(SYMBOL_SIZE / 2 - cornerSize, SYMBOL_SIZE / 2 - cornerSize, cornerSize, cornerSize);
					g.endFill();
				}}
			/>
		</Container>
	{/each}
{/if}
