<script lang="ts">
	/**
	 * Main Game Component for Surge Slot
	 * Following Stake Engine architecture pattern
	 * This is the entry component that orchestrates all game components
	 */
	import { onMount } from 'svelte';
	import { App, Text, REM } from 'pixi-svelte';
	import { MainContainer } from 'components-layout';
	import { EnablePixiExtension } from 'components-pixi';
	import { EnableHotkey } from 'components-shared';
	import { UI, UiGameName } from 'components-ui-pixi';
	import { GameVersion, Modals } from 'components-ui-html';
	import { stateModal } from 'state-shared';

	import { getContext } from '../game/context';
	import LoadingScreen from './LoadingScreen.svelte';
	import Board from './Board.svelte';
	import Win from './Win.svelte';
	import MultiplierDisplay from './MultiplierDisplay.svelte';
	import StickyWildsDisplay from './StickyWildsDisplay.svelte';
	// Additional components will be added as they're created
	// import Background from './Background.svelte';
	// import HeistBonus from './HeistBonus.svelte';

	const context = getContext();

	// Show loading screen on mount - Stake Engine pattern
	onMount(() => (context.stateLayout.showLoadingScreen = true));

	// Subscribe to emitter events - Stake Engine pattern
	context.eventEmitter.subscribeOnMount({
		// Example: When bonus is triggered, show modal
		// bonusConfirm: () => {
		// 	stateModal.modal = { name: 'bonusConfirm' };
		// },
	});
</script>

<App>
	<!-- Enable extensions - required by Stake Engine -->
	<EnableHotkey />
	<EnablePixiExtension />

	{#if context.stateLayout.showLoadingScreen}
		<LoadingScreen onloaded={() => (context.stateLayout.showLoadingScreen = false)} />
	{:else}
		<!-- Sound component will be added after loading screen interaction -->
		<!-- Per Chrome autoplay policy: requires user interaction first -->
		<!-- <Sound /> -->

		<!-- Background -->
		<!-- <Background /> -->

		<!-- Main game board container -->
		<MainContainer>
			<Board />
			<Win />
			<StickyWildsDisplay />
		</MainContainer>

		<!-- Feature displays -->
		<MultiplierDisplay />

		<!-- Bonus feature -->
		<!-- <HeistBonus /> -->

		<!-- UI Component - Stake Engine provided -->
		<UI>
			{#snippet gameName()}
				<UiGameName name="SYNDICATE SURGE" />
			{/snippet}
			{#snippet logo()}
				<Text
					anchor={{ x: 1, y: 0 }}
					text="SURGE"
					style={{
						fontFamily: 'Arial',
						fontSize: REM * 1.5,
						fontWeight: '700',
						lineHeight: REM * 2,
						fill: 0x00d4ff,
					}}
				/>
			{/snippet}
		</UI>
	{/if}
</App>

<!-- Modals for settings, info, etc. - Stake Engine provided -->
<Modals>
	{#snippet version()}
		<GameVersion version="0.0.1" />
	{/snippet}
</Modals>
