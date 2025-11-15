<script lang="ts">
	import { getContext } from '../game/context';
	
	const context = getContext();
</script>

<div class="game-rules">
	<h1>CRYPTO STACKS METAVAULT</h1>
	
	<section>
		<h2>Game Overview</h2>
		<p>Crypto Stacks Metavault is a 5-reel, 4-row slot game with 1024 ways to win. The game features a chip collection system during free spins that upgrades medium symbols for bigger wins.</p>
	</section>

	<section>
		<h2>How to Play</h2>
		<ul>
			<li>Select your bet amount using the + and - buttons</li>
			<li>Press the SPIN button or spacebar to play</li>
			<li>Win by landing matching symbols on adjacent reels from left to right</li>
			<li>1024 ways to win on every spin</li>
		</ul>
	</section>

	<section>
		<h2>Free Spins Feature</h2>
		<p><strong>Trigger:</strong> Land 3 or more SCATTER symbols anywhere on the reels</p>
		<ul>
			<li>3 Scatters = 8 Free Spins</li>
			<li>4 Scatters = 15 Free Spins</li>
			<li>5 Scatters = 20 Free Spins</li>
		</ul>
		<p>Free spins can be retriggered during the feature.</p>
	</section>

	<section>
		<h2>Chip Collection System</h2>
		<p>During free spins, collect CHIP symbols to upgrade medium symbols:</p>
		<ul>
			<li>4 chips collected: M1 symbols upgrade to M2</li>
			<li>7 chips collected: M2 symbols upgrade to M3</li>
			<li>12 chips collected: M3 symbols upgrade to M4</li>
			<li>15 chips collected: M4 symbols upgrade to DIAMOND</li>
		</ul>
		<p>Upgraded symbols remain for the duration of the free spins feature.</p>
	</section>

	<section>
		<h2>Wild Multipliers</h2>
		<p>WILD symbols appear on reels 2, 3, and 4 during free spins only. Each WILD carries a random multiplier of x2 or x3. Multiple WILD multipliers multiply together for massive wins!</p>
	</section>

	<section>
		<h2>Game Modes</h2>
		<ul>
			<li><strong>Base Game:</strong> 1x bet cost, standard gameplay</li>
			<li><strong>Buy Feature (8 FS):</strong> 100x bet cost, instantly triggers 8 free spins</li>
			<li><strong>Buy Feature (15 FS):</strong> 200x bet cost, instantly triggers 15 free spins</li>
		</ul>
	</section>

	<section>
		<h2>Game Statistics</h2>
		<ul>
			<li><strong>RTP:</strong> 96.00%</li>
			<li><strong>Maximum Win:</strong> 5000x your bet</li>
			<li><strong>Volatility:</strong> Medium-High</li>
			<li><strong>Ways to Win:</strong> 1024</li>
		</ul>
	</section>

	<section class="disclaimer">
		<h2>Disclaimer</h2>
		<p>Malfunction voids all wins and plays. A consistent internet connection is required. In the event of a disconnection, reload the game to finish any uncompleted rounds. The expected return is calculated over many plays. The game display is not representative of any physical device and is for illustrative purposes only. Winnings are settled according to the amount received from the Remote Game Server and not from events within the web browser. TM and © 2025 Stake Engine.</p>
	</section>
</div>

<style lang="scss">
	.game-rules {
		padding: 2rem;
		color: #ffffff;
		font-family: 'proxima-nova', sans-serif;
		max-width: 800px;
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

		ul {
			list-style: disc;
			padding-left: 2rem;
			margin-bottom: 1rem;

			li {
				margin-bottom: 0.5rem;
				line-height: 1.6;
			}
		}

		strong {
			color: #ffd700;
			font-weight: 600;
		}

		.disclaimer {
			background: rgba(255, 215, 0, 0.1);
			border: 1px solid #ffd700;
			border-radius: 8px;
			padding: 1.5rem;
			margin-top: 3rem;

			h2 {
				margin-top: 0;
			}

			p {
				font-size: 0.9rem;
				line-height: 1.5;
				margin-bottom: 0;
			}
		}
	}
</style>