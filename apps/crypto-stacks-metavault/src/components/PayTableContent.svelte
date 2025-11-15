<script lang="ts">
	import config from '../game/config';
</script>

<div class="paytable">
	<h1>PAYTABLE</h1>
	
	<section>
		<h2>Ways to Win</h2>
		<p>This game features <strong>1024 ways to win</strong>. Win by landing matching symbols on adjacent reels from left to right, starting from the leftmost reel.</p>
	</section>

	<section>
		<h2>Premium Symbols</h2>
		<div class="symbol-group">
			<div class="symbol-row">
				<span class="symbol-name">💎 DIAMOND</span>
				<div class="payouts">
					<span>5 of a kind: 50x</span>
					<span>4 of a kind: 20x</span>
					<span>3 of a kind: 10x</span>
				</div>
			</div>
		</div>
	</section>

	<section>
		<h2>Medium Symbols</h2>
		<div class="symbol-group">
			<div class="symbol-row">
				<span class="symbol-name">M4</span>
				<div class="payouts">
					<span>5 of a kind: 25x</span>
					<span>4 of a kind: 10x</span>
					<span>3 of a kind: 5x</span>
				</div>
			</div>
			<div class="symbol-row">
				<span class="symbol-name">M3</span>
				<div class="payouts">
					<span>5 of a kind: 20x</span>
					<span>4 of a kind: 8x</span>
					<span>3 of a kind: 4x</span>
				</div>
			</div>
			<div class="symbol-row">
				<span class="symbol-name">M2</span>
				<div class="payouts">
					<span>5 of a kind: 15x</span>
					<span>4 of a kind: 6x</span>
					<span>3 of a kind: 3x</span>
				</div>
			</div>
			<div class="symbol-row">
				<span class="symbol-name">M1</span>
				<div class="payouts">
					<span>5 of a kind: 12x</span>
					<span>4 of a kind: 5x</span>
					<span>3 of a kind: 2.5x</span>
				</div>
			</div>
		</div>
		<p class="note">💡 Medium symbols can be upgraded during free spins by collecting CHIP symbols!</p>
	</section>

	<section>
		<h2>Low Symbols</h2>
		<div class="symbol-group">
			<div class="symbol-row">
				<span class="symbol-name">A</span>
				<div class="payouts">
					<span>5 of a kind: 10x</span>
					<span>4 of a kind: 4x</span>
					<span>3 of a kind: 2x</span>
				</div>
			</div>
			<div class="symbol-row">
				<span class="symbol-name">K</span>
				<div class="payouts">
					<span>5 of a kind: 8x</span>
					<span>4 of a kind: 3x</span>
					<span>3 of a kind: 1.5x</span>
				</div>
			</div>
			<div class="symbol-row">
				<span class="symbol-name">Q</span>
				<div class="payouts">
					<span>5 of a kind: 6x</span>
					<span>4 of a kind: 2.5x</span>
					<span>3 of a kind: 1x</span>
				</div>
			</div>
			<div class="symbol-row">
				<span class="symbol-name">J</span>
				<div class="payouts">
					<span>5 of a kind: 5x</span>
					<span>4 of a kind: 2x</span>
					<span>3 of a kind: 0.8x</span>
				</div>
			</div>
			<div class="symbol-row">
				<span class="symbol-name">10</span>
				<div class="payouts">
					<span>5 of a kind: 4x</span>
					<span>4 of a kind: 1.5x</span>
					<span>3 of a kind: 0.6x</span>
				</div>
			</div>
			<div class="symbol-row">
				<span class="symbol-name">9</span>
				<div class="payouts">
					<span>5 of a kind: 3x</span>
					<span>4 of a kind: 1.2x</span>
					<span>3 of a kind: 0.5x</span>
				</div>
			</div>
		</div>
	</section>

	<section>
		<h2>Special Symbols</h2>
		<div class="symbol-group special">
			<div class="symbol-row">
				<span class="symbol-name">🎰 SCATTER</span>
				<p>Triggers free spins. Does not pay.</p>
				<ul>
					<li>3 Scatters = 8 Free Spins</li>
					<li>4 Scatters = 15 Free Spins</li>
					<li>5 Scatters = 20 Free Spins</li>
				</ul>
			</div>
			<div class="symbol-row">
				<span class="symbol-name">🃏 WILD</span>
				<p>Appears on reels 2, 3, 4 during free spins only. Substitutes for all symbols except SCATTER and CHIP. Carries x2 or x3 multiplier.</p>
			</div>
			<div class="symbol-row">
				<span class="symbol-name">🪙 CHIP</span>
				<p>Appears during free spins only. Collect chips to upgrade medium symbols. Does not pay.</p>
			</div>
		</div>
	</section>

	<section class="game-info">
		<h2>Game Information</h2>
		<div class="info-grid">
			<div class="info-item">
				<strong>RTP:</strong>
				<span>96.00%</span>
			</div>
			<div class="info-item">
				<strong>Max Win:</strong>
				<span>5000x</span>
			</div>
			<div class="info-item">
				<strong>Ways to Win:</strong>
				<span>1024</span>
			</div>
			<div class="info-item">
				<strong>Volatility:</strong>
				<span>Medium-High</span>
			</div>
		</div>
	</section>
</div>

<style lang="scss">
	.paytable {
		padding: 2rem;
		color: #ffffff;
		font-family: 'proxima-nova', sans-serif;
		max-width: 900px;
		margin: 0 auto;

		h1 {
			font-size: 2rem;
			font-weight: 700;
			margin-bottom: 2rem;
			text-align: center;
			color: #ffd700;
		}

		h2 {
			font-size: 1.5rem;
			font-weight: 600;
			margin-top: 2rem;
			margin-bottom: 1rem;
			color: #ffd700;
		}

		section {
			margin-bottom: 2rem;
		}

		p {
			line-height: 1.6;
			margin-bottom: 1rem;
		}

		.symbol-group {
			background: rgba(255, 255, 255, 0.05);
			border-radius: 8px;
			padding: 1.5rem;
			margin-bottom: 1rem;

			&.special {
				background: rgba(255, 215, 0, 0.1);
				border: 1px solid rgba(255, 215, 0, 0.3);
			}
		}

		.symbol-row {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 1rem 0;
			border-bottom: 1px solid rgba(255, 255, 255, 0.1);

			&:last-child {
				border-bottom: none;
			}

			.symbol-name {
				font-size: 1.2rem;
				font-weight: 600;
				color: #ffd700;
				min-width: 120px;
			}

			.payouts {
				display: flex;
				gap: 1.5rem;
				flex-wrap: wrap;

				span {
					font-size: 0.95rem;
					color: #ffffff;
				}
			}

			p {
				margin: 0.5rem 0;
				font-size: 0.95rem;
				color: rgba(255, 255, 255, 0.9);
			}

			ul {
				list-style: none;
				padding: 0;
				margin: 0.5rem 0 0 0;

				li {
					padding: 0.25rem 0;
					font-size: 0.9rem;
					color: rgba(255, 255, 255, 0.8);
				}
			}
		}

		.note {
			margin-top: 1rem;
			padding: 1rem;
			background: rgba(255, 215, 0, 0.1);
			border-left: 3px solid #ffd700;
			border-radius: 4px;
			font-size: 0.95rem;
		}

		.game-info {
			background: rgba(255, 215, 0, 0.1);
			border: 1px solid #ffd700;
			border-radius: 8px;
			padding: 1.5rem;
			margin-top: 3rem;

			h2 {
				margin-top: 0;
			}
		}

		.info-grid {
			display: grid;
			grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
			gap: 1rem;
			margin-top: 1rem;
		}

		.info-item {
			display: flex;
			justify-content: space-between;
			padding: 0.75rem;
			background: rgba(0, 0, 0, 0.3);
			border-radius: 4px;

			strong {
				color: #ffd700;
			}

			span {
				color: #ffffff;
				font-weight: 600;
			}
		}

		strong {
			color: #ffd700;
			font-weight: 600;
		}
	}
</style>