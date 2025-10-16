<script lang="ts" module>
	import type { RawSymbol } from '../game/types';

	/**
	 * Emitter Events for Board Component
	 */
	export type EmitterEventBoard =
		| { type: 'boardSpin'; board: RawSymbol[][]; anticipation: number[] }
		| { type: 'boardSettle'; board: RawSymbol[][] }
		| { type: 'boardShow' }
		| { type: 'boardHide' }
		| { type: 'stopButtonClick' };
</script>

<script lang="ts">
	/**
	 * Board Component - Main Reel Board for Syndicate Surge
	 * Following Stake Engine pattern
	 * Displays the 5x4 reel grid with spinning symbols
	 */
	import { Container } from 'pixi-svelte';
	import { getContext } from '../game/context';
	import Symbol from './Symbol.svelte';
	import { getSymbolX } from '../game/utils';

	const context = getContext();
	const { stateGame, eventEmitter, stateGameDerived } = context;

	// Subscribe to board events
	eventEmitter.subscribeOnMount({
		// Start spinning the reels
		boardSpin: async ({ board, anticipation }) => {
			console.log('🎰 Board spinning with anticipation:', anticipation);
			
			// Trigger the spin with the result board and anticipation
			await stateGameDerived.enhancedBoard.spin({
				rawBoard: board,
				anticipation: anticipation,
			});
			
			// After spin completes, broadcast settle event
			eventEmitter.broadcast({
				type: 'boardSettle',
				board: board,
			});
		},

		// Stop all reels when stop button is clicked
		stopButtonClick: () => {
			console.log('🛑 Stop button clicked - stopping reels');
			stateGameDerived.enhancedBoard.stop();
		},

		// Settle the board with new symbols after spin
		boardSettle: ({ board }) => {
			console.log('🎰 Board settling with new symbols:', board);
			stateGameDerived.enhancedBoard.settle(board);
		},

		// Show the board
		boardShow: () => {
			console.log('👁️ Showing board');
			// Board visibility can be controlled here if needed
		},

		// Hide the board
		boardHide: () => {
			console.log('🙈 Hiding board');
			// Board visibility can be controlled here if needed
		},
	});

	// Initialize the board as ready to spin
	stateGameDerived.enhancedBoard.readyToSpinEffect();
</script>

<Container>
	<!-- Render all reels and their symbols -->
	{#each stateGame.board as reel, reelIndex (reelIndex)}
		<Container x={getSymbolX(reelIndex)} y={0}>
			{#each reel.reelState.symbols as reelSymbol, symbolIndex (symbolIndex)}
				<Symbol
					{reelSymbol}
					{reelIndex}
					rowIndex={reelSymbol.symbolIndex}
				/>
			{/each}
		</Container>
	{/each}
</Container>
