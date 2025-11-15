<script lang="ts">
	import { Popup } from 'components-shared';
	import { zIndex } from 'constants-shared/zIndex';
	import { stateModal } from 'state-shared';
	
	import GameRulesContent from './GameRulesContent.svelte';
</script>

{#if stateModal.modal?.name === 'gameRules'}
	<Popup zIndex={zIndex.modal} onclose={() => (stateModal.modal = null)}>
		<div class="modal-content">
			<GameRulesContent />
		</div>
	</Popup>
{/if}

<style lang="scss">
	.modal-content {
		background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
		border-radius: 16px;
		max-width: 900px;
		max-height: 80vh;
		overflow-y: auto;
		box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
		
		/* Custom scrollbar */
		&::-webkit-scrollbar {
			width: 8px;
		}
		
		&::-webkit-scrollbar-track {
			background: rgba(0, 0, 0, 0.2);
			border-radius: 4px;
		}
		
		&::-webkit-scrollbar-thumb {
			background: rgba(255, 215, 0, 0.5);
			border-radius: 4px;
			
			&:hover {
				background: rgba(255, 215, 0, 0.7);
			}
		}
	}
</style>