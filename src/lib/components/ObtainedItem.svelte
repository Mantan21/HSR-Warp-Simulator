<script>
	import { getContext, onMount } from 'svelte';
	import { fade, fly, scale } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { bezier } from '$lib/helpers/easing';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import Icon from './Icon.svelte';

	let width;
	export let item = 'stellarJade';
	export let qty = 0;

	const closeObtained = getContext('closeObtained');
	onMount(() => playSfx('item-obtained'));
</script>

<section in:fade={{ duration: 250 }} on:mousedown={closeObtained}>
	<div class="container" bind:clientWidth={width} style="--wd:{width}px">
		<div class="top" in:fly={{ y: 30, duration: 500, easing: bezier(0.13, 0.14, 0, 1) }}>
			<svg
				class="cube"
				style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
				viewBox="0 0 162.16 187.06"
			>
				<g>
					<path
						class="fil1"
						d="M69.85 20.66l-58.12 33.44 -0 90.75 4.85 2.98 -0 -90.9 58.16 -33.49 -4.89 -2.78zm-11.81 -6.73l4.89 2.78 -58.12 33.46 0.05 90.45 -4.85 -2.98 0 -90.3 58.03 -33.41z"
					/>
					<path
						class="fil1"
						d="M150.2 118.32l-0.56 -67.05 -79.03 -44.6 -4.98 2.76 79.16 44.67 0.58 67.11 4.83 -2.89zm11.67 -6.98l-4.83 2.89 -0.58 -67.07 -78.79 -44.41 4.98 -2.76 78.64 44.38 0.58 66.96z"
					/>
					<path
						class="fil1"
						d="M25.5 140.28l58.23 33.24 78.3 -45.87 0.12 -5.69 -78.43 45.95 -58.3 -33.25 0.07 5.62zm0.16 13.59l-0.07 -5.62 58.25 33.23 78.01 -45.76 -0.12 5.69 -77.91 45.64 -58.17 -33.18z"
					/>
				</g>
				<g>
					<polygon
						class="fil1"
						points="36.35,74.66 76.51,96.83 76.51,96.85 77.97,97.66 77.97,143.53 37.81,121.36 37.81,121.34 36.35,120.53 "
					/>
					<path
						class="fil1"
						d="M125.81 74.37l-7.56 4.13 0 46.12 7.56 -4.13 0 -46.12zm-25.37 13.75l-16.63 9.18 0.03 46.08 29.74 -16.22 0 -46.12 -13.14 7.17 0 -0.1z"
					/>
					<path
						class="fil1"
						d="M36.35 68.66l8.19 4.55 45.45 -25.14 -8.19 -4.55 -45.45 25.14zm13.24 7.36l30.77 17.1 45.45 -25.14 -30.77 -17.1 -45.45 25.14z"
					/>
				</g>
			</svg>
			<span>{$t('item.obtained')}</span>
		</div>

		<div class="content">
			<svg
				class="cube-bg"
				style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
				viewBox="0 0 267.04 308.35"
			>
				<path
					class="fil0"
					d="M133.52 0l66.76 38.54 66.76 38.54 0 77.09 0 77.09 -66.76 38.54 -66.76 38.54 -66.76 -38.54 -66.76 -38.54 0 -77.09 0 -77.09 66.76 -38.54 66.76 -38.54zm-0 35.22l51.51 29.74 51.51 29.74 0 59.48 0 59.48 -51.51 29.74 -51.51 29.74 -51.51 -29.74 -51.51 -29.74 0 -59.48 0 -59.48 51.51 -29.74 51.51 -29.74z"
				/>
				<polygon
					class="fil0"
					points="133.52,76.21 167.28,95.7 201.03,115.19 201.03,154.17 201.03,193.15 167.28,212.65 133.52,232.14 99.76,212.65 66,193.15 66,154.17 66,115.19 99.76,95.7 "
				/>
			</svg>

			<div class="item" on:mousedown|stopPropagation>
				<div class="item-pic" in:scale={{ start: 0.5, duration: 300 }}>
					<picture>
						<Icon type={item} />
					</picture>
					<span class="star">
						{#each Array(5) as _}
							<i class="hsr-star" />
						{/each}
					</span>
					<span class="qty">{qty}</span>
				</div>
				<caption in:fade={{ duration: 250 }}> {$t(`item.${item}`)} </caption>
			</div>
		</div>

		<div class="bottom">
			{$t('clickToClose')}
		</div>
	</div>
</section>

<style>
	.fil0 {
		fill: rgba(255, 255, 255, 0.075);
	}
	.fil1 {
		fill: #ecd79e;
	}

	section {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(32, 32, 32, 0.5);
		backdrop-filter: blur(20px);
		z-index: 555;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.container {
		width: 100%;
		max-width: 100vh;
		aspect-ratio: 1/1;
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
		align-items: center;
	}

	@media screen and (max-width: 600px) {
		.container {
			transform: scale(1.5);
		}
	}

	.top span {
		display: block;
		color: #ecd79e;
		font-size: calc(0.02 * var(--wd));
	}

	.content {
		width: 100%;
		flex-basis: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.top,
	.bottom {
		width: 100%;
		text-align: center;
	}

	svg.cube {
		width: 6%;
	}
	svg.cube-bg {
		width: 30%;
	}

	.item {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -40%);
		width: calc(0.15 * var(--wd));
		text-align: center;
	}

	.item-pic {
		background-image: linear-gradient(#a7785e, #cda46e);
		position: relative;
		width: 70%;
		margin: auto;
		border-top-right-radius: calc(0.02 * var(--wd));
		border: calc(0.0025 * var(--wd)) solid #fff;
		box-shadow: 0 0 calc(0.01 * var(--wd)) rgba(255, 255, 255, 1);
	}

	picture {
		width: 100%;
		aspect-ratio: 1/1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.item-pic :global(img) {
		width: 80%;
	}

	span.star {
		display: block;
		position: absolute;
		bottom: 15%;
		left: 50%;
		transform: translateX(-50%);
	}
	.star i {
		letter-spacing: calc(-0.004 * var(--wd));
	}

	span.qty {
		background-color: #000;
		padding: 2%;
		width: 100%;
		display: block;
	}

	caption {
		display: block;
		padding: 5% 0;
		font-size: calc(0.015 * var(--wd));
	}

	.bottom {
		font-size: calc(0.02 * var(--wd));
		opacity: 0.7;
	}
</style>
