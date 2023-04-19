<script>
	import positionToStyle from '$lib/helpers/cssPosition';
	import { diagonalSlide, fly } from '$lib/helpers/transition';
	const rateup = [
		{
			name: 'natasha',
			position: {
				h: 440,
				l: -600,
				t: -72
			}
		},
		{
			name: 'hook',
			position: {
				h: 520,
				l: -700,
				t: -215
			}
		},
		{
			name: 'pela',
			position: {
				h: 570,
				t: -202,
				l: -605
			}
		}
	];
</script>

<div class="content">
	<div class="banner-name">Character Event Warp</div>

	<!-- Left Pane -->
	<div class="wrapper-info">
		<div class="info-body">
			<div class="short-detail">
				<h1>Butterfly on Swordtip</h1>
				<div class="time"><i class="hsr-time" /> <caption> ∞ days ∞ hours</caption></div>
				<div class="description">
					<p>Every <span>10</span> Warps guarantees a <span>4</span>-star or above entity</p>
					<p>Featured Character</p>
				</div>
			</div>

			<div class="rateup-characters">
				<div class="rateup-row" in:diagonalSlide={{ delay: 250 }}>
					{#each rateup as { name, position }, i}
						<div class="rateup-item">
							<div class="rateup-content">
								<figure in:fly={{ x: -20, duration: 1000, delay: 250 + 100 * i }}>
									<img
										src="/images/characters/4star/{name}.webp"
										alt={name}
										style={positionToStyle(position)}
									/>
								</figure>
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<div class="detail-btn">
			<button>Details</button>
		</div>
	</div>

	<!-- Right Pane -->
	<div class="character">
		<div class="char-group" in:fly={{ duration: 1000, delay: 250, x: -20 }}>
			<div class="name">
				<i class="hsr-quantum icon-gradient quantum" />
				<span>Seele</span>
			</div>
			<div class="stars">
				{#each Array(5) as _} <i class="hsr-star" />{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.content {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
	}

	.detail-btn {
		position: absolute;
		left: 50%;
		bottom: 7%;
		transform: translateX(-50%);
	}

	.detail-btn button {
		padding: calc(0.005 * var(--bw)) calc(0.02 * var(--bw));
		font-size: calc(0.015 * var(--bw));
		border-radius: 5rem;
		background-color: var(--color-text);
		color: #333;
		transition: all 0.2s;
	}

	button:hover {
		background-color: #ddd;
	}

	button:active {
		transform: scale(0.95);
	}

	.banner-name {
		position: absolute;
		top: 2%;
		left: -1.1%;
		font-size: calc(0.015 * var(--bw));
		padding: 0.45% 1.5%;
		border-top-right-radius: 2rem;
		border-bottom-right-radius: 2rem;
		background-color: #3d81ce;
	}

	.wrapper-info {
		width: 30%;
		height: 100%;
		color: #333;
		padding: 1.3%;
		position: relative;
	}

	.info-body {
		height: 100%;
		border-left: 1px solid #aaa;
		padding: 5%;
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.description,
	.time {
		padding: 5% 0 0 1%;
		display: flex;
		align-items: center;
	}

	.time i {
		line-height: 0;
		margin-right: 2%;
	}

	.description {
		align-items: flex-start;
		flex-direction: column;
		height: calc(0.09 * var(--bw));
		overflow: auto;
		mask-image: linear-gradient(black 80%, transparent);
	}

	.description::-webkit-scrollbar {
		display: none;
	}

	.description p,
	.time {
		font-size: calc(0.021 * var(--bw));
		font-weight: bold;
		line-height: normal;
	}
	.description p {
		margin-bottom: 5%;
	}

	.description span,
	.time {
		color: #e6993d;
	}

	h1 {
		padding-top: 15%;
		font-size: calc(0.046 * var(--bw));
	}

	/* Rateup */
	.rateup-characters {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.rateup-row {
		display: flex;
		width: 100%;
		height: calc(0.202 * var(--bw));
		justify-content: center;
		padding: 1.725%;
	}

	.rateup-item {
		width: 33.33333333%;
		height: 100%;
		padding: 0 2.5%;
	}
	.rateup-content {
		width: 100%;
		height: 100%;
		border-radius: 10rem;
		overflow: hidden;
		background-color: rgba(255, 255, 255, 0.9);
	}

	figure {
		position: relative;
		height: 100%;
	}

	figure img {
		position: absolute;
		height: 200%;
	}

	/* character name */
	.character {
		width: 70%;
		height: 100%;
		position: relative;
	}
	.char-group {
		position: absolute;
		z-index: +3;
		top: 62%;
		left: 12%;
	}
	.name {
		background-color: rgba(0, 0, 0, 0.65);
		height: calc(0.0235 * var(--bw));
		display: flex;
		align-items: center;
	}
	.name i {
		padding: 0 calc(0.01 * var(--bw));
		font-size: calc(0.025 * var(--bw));
	}
	.name span {
		display: block;
		padding-right: calc(0.01 * var(--bw));
		font-size: calc(0.02 * var(--bw));
		text-transform: capitalize;
	}

	.stars {
		padding: 0 10%;
		text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
		height: calc(0.02 * var(--bw));
		width: fit-content;
		display: flex;
		align-items: center;
		font-size: calc(0.014 * var(--bw));
		margin-top: 4%;
		background-color: rgba(0, 0, 0, 0.65);
	}
</style>
