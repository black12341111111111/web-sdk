<script lang="ts" module>
	export type EmitterEventChipCollector =
		| { type: 'chipCollectionShow' }
		| { type: 'chipCollectionHide' }
		| { type: 'chipCollectionUpdate'; chipCount: number; totalChips: number; positions: any[] }
		| { type: 'chipCollectionAnimate'; positions: any[] };
</script>

<script lang="ts">
	import { Container, Text, Graphics } from 'pixi-svelte';
	import { getContext } from '../game/context';
	import { COLORS, CHIP_UPGRADE_THRESHOLDS } from '../game/constants';

	const context = getContext();
	
	let show = $state(false);
	let chipCount = $state(0);
	let totalChips = $state(0);
	let animating = $state(false);

	// Calculate progress to next upgrade
	$effect(() => {
		const nextThreshold = CHIP_UPGRADE_THRESHOLDS.find(t => t > totalChips);
		if (nextThreshold) {
			const prevThreshold = CHIP_UPGRADE_THRESHOLDS[CHIP_UPGRADE_THRESHOLDS.indexOf(nextThreshold) - 1] || 0;
			const progress = (totalChips - prevThreshold) / (nextThreshold - prevThreshold);
		}
	});

	context.eventEmitter.subscribeOnMount({
		chipCollectionShow: () => (show = true),
		chipCollectionHide: () => (show = false),
		chipCollectionUpdate: (emitterEvent) => {
			chipCount = emitterEvent.chipCount;
			totalChips = emitterEvent.totalChips;
		},
		chipCollectionAnimate: async (emitterEvent) => {
			animating = true;
			// Animation logic here
			await new Promise(resolve => setTimeout(resolve, 800));
			animating = false;
		},
	});
</script>

{#if show}
	<Container x={50} y={50}>
		<!-- Chip counter background -->
		<Graphics
			draw={(graphics) => {
				graphics.clear();
				graphics.beginFill(0x000000, 0.7);
				graphics.drawRoundedRect(0, 0, 200, 80, 10);
				graphics.endFill();
			}}
		/>
		
		<!-- Chip icon -->
		<Graphics
			x={20}
			y={20}
			draw={(graphics) => {
				graphics.clear();
				graphics.beginFill(COLORS.chipGold);
				graphics.drawCircle(0, 0, 20);
				graphics.endFill();
			}}
		/>
		
		<!-- Chip count text -->
		<Text
			value={`Chips: ${totalChips}`}
			x={60}
			y={15}
			style={{
				fill: COLORS.text,
				fontSize: 24,
				fontWeight: 'bold',
			}}
		/>
		
		<!-- Progress bar -->
		<Graphics
			x={20}
			y={55}
			draw={(graphics) => {
				graphics.clear();
				// Background
				graphics.beginFill(0x333333);
				graphics.drawRoundedRect(0, 0, 160, 10, 5);
				graphics.endFill();
				
				// Progress
				const nextThreshold = CHIP_UPGRADE_THRESHOLDS.find(t => t > totalChips) || CHIP_UPGRADE_THRESHOLDS[CHIP_UPGRADE_THRESHOLDS.length - 1];
				const prevThreshold = CHIP_UPGRADE_THRESHOLDS[CHIP_UPGRADE_THRESHOLDS.indexOf(nextThreshold) - 1] || 0;
				const progress = Math.min(1, (totalChips - prevThreshold) / (nextThreshold - prevThreshold));
				
				graphics.beginFill(COLORS.chipGold);
				graphics.drawRoundedRect(0, 0, 160 * progress, 10, 5);
				graphics.endFill();
			}}
		/>
	</Container>
{/if}