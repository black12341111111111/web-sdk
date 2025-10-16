<script lang="ts" module>
	/**
	 * Component Stories for Game Component
	 * Following Stake Engine Storybook pattern for testing
	 */
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Game from '../components/Game.svelte';
	import { setContext } from '../game/context';
	import { StoryLocale } from 'components-storybook';

	const { Story } = defineMeta({
		component: Game,
		title: 'COMPONENTS/Game',
	});

	// Set context for all stories
	setContext();
</script>

<!-- Test Game component with loading screen -->
<Story name="component (loadingScreen)">
	<StoryLocale lang="en">
		<Game />
	</StoryLocale>
</Story>

<!-- Test Game component with loading screen skipped -->
<!-- This will be useful once we have more components -->
<!-- 
<Story name="preSpin" args={templateArgs({})}>
	<StoryLocale lang="en">
		<Game />
	</StoryLocale>
</Story>
-->
