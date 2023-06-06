<script>
	import { getContext } from 'svelte';
	import { assets } from '$lib/stores/app-store';
	import { albumList } from '$lib/stores/phonograph-store';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	export let activeAlbum = '';
	export let playedAlbum = '';

	const pickAlbum = getContext('pickAlbum');
	const selectAlbum = (name) => {
		if (name === playedAlbum) return;
		pickAlbum(name);
		playSfx('paper-flip');
	};
</script>

<div class="album-list">
	{#each $albumList as name}
		<div class="album-item">
			<button
				class="wrapper"
				class:active={playedAlbum === name}
				on:click={() => selectAlbum(name)}
			>
				<div class="indicator">
					<span />
				</div>
				<picture class="cover">
					<img src={$assets[`album_${name}.webp`]} alt={name} />
				</picture>
				<div class="disc">
					<img src={$assets['music-disc.webp']} alt="disc" />
				</div>

				{#if activeAlbum === name}
					<span class="note">
						<i class="hsr-music" />
					</span>
				{/if}
			</button>
		</div>
	{/each}
</div>

<style>
	.album-list {
		margin-top: 2rem;
		display: flex;
		flex-direction: column;
		width: fit-content;
		padding-left: 5%;
	}

	.album-item {
		display: flex;
		justify-content: center;
		padding: 0 calc(0.015 * var(--screen-height));
		padding-bottom: calc(0.05 * var(--screen-height));
	}
	.wrapper {
		aspect-ratio: 1/1;
		width: calc(0.135 * var(--screen-height));
		max-width: calc(0.35 * var(--screen-width));
		min-width: 120px;
		position: relative;
		filter: brightness(0.5);
		transition: all 0.25s;
		display: block;
	}

	.wrapper:hover {
		filter: brightness(1);
	}
	.wrapper.active {
		filter: brightness(1);
		transform: scale(1.05);
	}

	.indicator {
		opacity: 0;
		transition: 0.25s opacity;
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
	.active .indicator {
		opacity: 1;
	}
	.indicator span {
		position: absolute;
		top: 50%;
		right: -70%;
		transform: translateY(-50%);
		background-color: yellow;
		width: 300%;
		height: 0.15rem;
		border-radius: 1rem;
		/* prettier-ignore */
		box-shadow: 0 0 1rem 1rem rgba(249, 170, 2, .2),
			0 0 2rem 1.5rem rgba(249, 200, 2, 0.1),
			0 0 3rem 1rem rgba(249, 183, 2, 0.1);
	}

	.indicator span::after {
		content: '';
		position: absolute;
		right: 0;
		top: 50%;
		transform: translate(100%, -50%);
		border-radius: 100%;
		width: 2.5%;
		aspect-ratio: 1/1;
		border: 0.15rem solid yellow;
	}

	picture.cover,
	img {
		width: 100%;
		height: 100%;
		display: block;
	}

	.disc {
		height: 115%;
		width: 120%;
		top: 50%;
		left: 50%;
		transform: translate(-35%, -50%);
		position: absolute;
		z-index: -1;
		transition: all 0.2s;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.active .disc {
		transform: translate(-18%, -50%);
	}

	.disc img {
		height: 100%;
		width: auto;
		aspect-ratio: 1/1;
	}
	.active .disc img {
		animation: rotate 25s linear infinite;
	}

	.note {
		color: yellow;
		position: absolute;
		z-index: +2;
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 50%);
		background-color: #000;
		border-width: 0.15rem;
		border-color: yellow;
		border-style: dotted dotted solid dotted;
		border-radius: 100%;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		aspect-ratio: 100%;
		width: 17%;
		aspect-ratio: 1/1;
		font-size: 100%;
		transition: 0.25s all;
	}

	/* Mobile Landscape */
	:global(.mobileLandscape) .wrapper {
		width: calc(0.175 * var(--screen-height));
		max-width: calc(0.35 * var(--screen-width));
		min-width: unset;
	}

	:global(.mobileLandscape) .indicator span {
		transform: scale(0.8);
	}

	:global(.mobileLandscape) .note {
		width: 25%;
		font-size: 75%;
	}

	/* Mobile Portrait*/
	@media screen and (max-width: 620px) {
		.album-list {
			flex-direction: row;
			margin-top: 1em;
			width: fit-content;
			justify-content: center;
			padding-left: unset;
		}
		.album-item {
			padding-bottom: 0;
		}
		.wrapper {
			width: calc(0.06 * var(--screen-height));
			max-width: calc(0.35 * var(--screen-width));
			min-width: 50px;
		}

		.wrapper.active {
			transform: translateX(-10%);
		}

		.indicator {
			display: none;
		}

		.note {
			width: 25%;
			font-size: 75%;
		}
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
