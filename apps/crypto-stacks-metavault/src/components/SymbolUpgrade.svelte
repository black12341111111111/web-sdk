<script lang="ts" module>
	export type EmitterEventSymbolUpgrade =
		| { type: 'symbolUpgradeShow' }
		| { type: 'symbolUpgradeHide' }
		| { type: 'symbolUpgradeAnimate'; oldLevel: number; newLevel: number }
		| { type: 'symbolUpgradeComplete'; newLevel: number };
</script>

<script lang="ts">
	import { Container, Text, Graphics } from 'pixi-svelte';
	import { getContext } from '../game/context';
	import { COLORS, UPGRADE_NAMES } from '../game/constants';

	const context = getContext();
	
	let show = $state(false);
	let oldLevel = $state(0);
	let newLevel = $state(0);
	let animating = $state(false);
	let alpha = $state(0);

	context.eventEmitter.subscribeOnMount({
		symbolUpgradeShow: () => {
			show = true;
			alpha = 0;
		},
		symbolUpgradeHide: () => {
			show = false;
			alpha = 0;
		},
		symbolUpgradeAnimate: async (emitterEvent) => {
			oldLevel = emitterEvent.oldLevel;
			newLevel = emitterEvent.newLevel;
			animating = true;
			
			// Fade in
			for (let i = 0; i <= 10; i++) {
				alpha = i / 10;
				await new Promise(resolve => setTimeout(resolve, 50));
			}
			
			// Hold
			await new Promise(resolve => setTimeout(resolve, 1000));
			
			// Fade out
			for (let i = 10; i >= 0; i--) {
				alpha = i / 10;
				await new Promise(resolve => setTimeout(resolve, 50));
			}
			
			animating = false;
		},
		symbolUpgradeComplete: (emitterEvent) => {
			// Upgrade complete
		},
	});
</script>

{#if show && animating}
	<Container x={400} y={300} alpha={alpha}>
		<!-- Background glow -->
		<Graphics
			draw={(graphics) => {
				graphics.clear();
				graphics.beginFill(COLORS.upgradeGlow, 0.3);
				graphics.drawCircle(0, 0, 200);
				graphics.endFill();
			}}
		/>
		
		<!-- Upgrade text -->
		<Text
			value="SYMBOL UPGRADE!"
			x={0}
			y={-80}
			anchor={0.5}
			style={{
				fill: COLORS.upgradeGlow,
				fontSize: 48,
				fontWeight: 'bold',
				stroke: 0x000000,
				strokeThickness: 4,
			}}
		/>
		
		<!-- Old symbol name -->
		<Text
			value={UPGRADE_NAMES[oldLevel] || 'M1'}
			x={-60}
			y={0}
			anchor={0.5}
			style={{
				fill: 0xaaaaaa,
				fontSize: 36,
				fontWeight: 'bold',
			}}
		/>
		
		<!-- Arrow -->
		<Text
			value="→"
			x={0}
			y={0}
			anchor={0.5}
			style={{
				fill: COLORS.text,
				fontSize: 48,
			}}
		/>
		
		<!-- New symbol name -->
		<Text
			value={UPGRADE_NAMES[newLevel] || 'M2'}
			x={60}
			y={0}
			anchor={0.5}
			style={{
				fill: COLORS.upgradeGlow,
				fontSize: 36,
				fontWeight: 'bold',
			}}
		/>
	</Container>
{/if}