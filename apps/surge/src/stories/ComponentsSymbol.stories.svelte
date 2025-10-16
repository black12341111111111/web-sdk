<script lang="ts" module>
	/**
	 * Component Stories for Symbol Component
	 * Following Stake Engine Storybook pattern
	 * Tests individual symbol component with all states and symbols
	 */
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { App, Container } from 'pixi-svelte';
	import Symbol from '../components/Symbol.svelte';
	import { setContext } from '../game/context';
	import { StoryLocale } from 'components-storybook';
	import type { SymbolName, SymbolState } from '../game/types';

	const { Story } = defineMeta({
		component: Symbol,
		title: 'COMPONENTS/Symbol',
		args: {
			x: 200,
			y: 200,
			state: 'static' as SymbolState,
			rawSymbol: { name: 'H1' as SymbolName },
		},
		argTypes: {
			state: {
				control: 'select',
				options: ['static', 'spin', 'land', 'win', 'anticipation', 'postWinStatic'],
			},
			rawSymbol: {
				control: 'object',
			},
		},
	});

	// Set context for all stories
	setContext();

	// All symbol names for testing
	const allSymbols: SymbolName[] = [
		'H1', 'H2', 'H3',
		'M1', 'M2', 'M3',
		'L1', 'L2', 'L3', 'L4', 'L5', 'L6',
		'W', 'SC', 'BN', 'P'
	];

	const allStates: SymbolState[] = [
		'static', 'spin', 'land', 'win', 'anticipation', 'postWinStatic'
	];
</script>

<!-- Test single symbol with controls -->
<Story name="component">
	<StoryLocale lang="en">
		<App>
			<Symbol x={200} y={200} state="static" rawSymbol={{ name: 'H1' }} />
		</App>
	</StoryLocale>
</Story>

<!-- Test all symbols in a grid -->
<Story name="symbols (all)">
	<StoryLocale lang="en">
		<App>
			<Container x={50} y={50}>
				{#each allSymbols as symbolName, index (index)}
					<Symbol
						x={(index % 4) * 180}
						y={Math.floor(index / 4) * 180}
						state="static"
						rawSymbol={{ name: symbolName }}
					/>
				{/each}
			</Container>
		</App>
	</StoryLocale>
</Story>

<!-- Test all states for one symbol -->
<Story name="states (H1)">
	<StoryLocale lang="en">
		<App>
			<Container x={50} y={50}>
				{#each allStates as state, index (index)}
					<Symbol
						x={(index % 3) * 200}
						y={Math.floor(index / 3) * 200}
						{state}
						rawSymbol={{ name: 'H1' }}
					/>
				{/each}
			</Container>
		</App>
	</StoryLocale>
</Story>
