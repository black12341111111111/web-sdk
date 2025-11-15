<script lang="ts" module>
	export type EmitterEventWildMultiplier =
		| { type: 'wildMultiplierShow'; reel: number; multiplier: number }
		| { type: 'wildMultiplierHide' };
</script>

<script lang="ts">
	import { Container, Text, Graphics } from 'pixi-svelte';
	import { getContext } from '../game/context';
	import { COLORS, SYMBOL_WIDTH } from '../game/constants';

	const context = getContext();
	
	let show = $state(false);
	let reel = $state(0);
	let multiplier = $state(1);
	let scale = $state(1);

	context.eventEmitter.subscribeOnMount({
		wildMultiplierShow: async (emitterEvent) => {
			reel = emitterEvent.reel;
			multiplier = emitterEvent.multiplier;
			show = true;
			
			// Pulse animation
			for (let i = 0; i < 3; i++) {
				for (let s = 1; s <= 1.2; s += 0.05) {
					scale = s;
					await new Promise(resolve => setTimeout(resolve, 20));
				}
				for (let s = 1.2; s >= 1; s -= 0.05) {
					scale = s;
					await new Promise(resolve => setTimeout(resolve, 20));
				}
			}
		},
		wildMultiplierHide: () => {
			show = false;
			scale = 1;
		},
	});
</script>

{#if show}
	<Container x={reel * (SYMBOL_WIDTH + 10) + SYMBOL_WIDTH / 2} y={100} scale={scale}>
		<!-- Multiplier background -->
		<Graphics
			draw={(graphics) => {
				graphics.clear();
				graphics.beginFill(COLORS.wildMultiplier, 0.8);
				graphics.drawCircle(0, 0, 40);
				graphics.endFill();
				graphics.lineStyle(3, COLORS.text);
				graphics.drawCircle(0, 0, 40);
			}}
		/>
		
		<!-- Multiplier text -->
		<Text
			value={`x${multiplier}`}
			x={0}
			y={0}
			anchor={0.5}
			style={{
				fill: COLORS.text,
				fontSize: 32,
				fontWeight: 'bold',
			}}
		/>
	</Container>
{/if}