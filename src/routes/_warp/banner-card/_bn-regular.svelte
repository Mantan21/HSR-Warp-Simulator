<script>
	import { bezier } from '$lib/helpers/easing';
	import { fade } from 'svelte/transition';
	import { fly } from '$lib/helpers/transition';
	import { assets, liteMode, probEdit } from '$lib/stores/app-store';
	import BannerTpl from './__banner-tpl.svelte';
</script>

<BannerTpl>
	<div class="wrapper" class:lite={$liteMode}>
		<div class="featured-bg" />
		{#if !$probEdit}
			<div class="splash-art himeko" transition:fade|local>
				<figure
					in:fly={{
						x: -25,
						duration: 3000,
						delay: 250,
						opacity: 1,
						easing: bezier(0.13, 0.14, 0, 1)
					}}
				>
					<img src={$assets['banner/himeko']} alt="Himeko" crossorigin="anonymous" />
				</figure>
			</div>
			<div class="splash-art gepard" transition:fade|local>
				<figure
					in:fly={{
						x: -20,
						duration: 3000,
						delay: 250,
						opacity: 1,
						easing: bezier(0.13, 0.14, 0, 1)
					}}
				>
					<img src={$assets['banner/gepard']} alt="Gepard" crossorigin="anonymous" />
				</figure>
			</div>
			<div class="splash-art bronya" transition:fade|local>
				<figure
					in:fly={{
						x: -40,
						delay: 250,
						duration: 3000,
						opacity: 1,
						easing: bezier(0.13, 0.14, 0, 1)
					}}
				>
					<img src={$assets['banner/bronya']} alt="Bronya" crossorigin="anonymous" />
				</figure>
			</div>
		{/if}
	</div>
</BannerTpl>

<style>
	.wrapper {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.featured-bg {
		width: 100%;
		height: 100%;
		background-image: linear-gradient(#272d5f, #7fa5eb 80%);
		z-index: -1;
	}

	.featured-bg {
		mask-image: linear-gradient(rgba(0, 0, 0, 1) 85%, transparent);
		position: relative;
	}

	.splash-art {
		position: absolute;
	}

	figure {
		position: relative;
	}

	img {
		width: 100%;
	}

	.gepard {
		top: -46.5%;
		left: -40%;
		width: 117%;
		z-index: -1;
		mask-image: linear-gradient(transparent 23%, black 38%, black 70%, transparent 85%);
	}
	:global(.mobileLandscape) .gepard {
		width: 120%;
		top: -70%;
		left: -41%;
		mask-image: linear-gradient(transparent 29%, black 40%, black 70%, transparent 85%);
	}

	.bronya {
		top: -14.5%;
		left: -25%;
		width: 125%;
		z-index: +1;
		display: flex;
		text-align: right;
		mask-image: linear-gradient(transparent 0, black 15%, black 70%, transparent 85%);
	}

	:global(.mobileLandscape) .bronya {
		top: -25%;
		mask-image: linear-gradient(transparent 0, black 15%, black 60%, transparent 80%);
	}

	.bronya img {
		width: 95.5%;
		transform: translateX(12.5%);
	}
	.himeko {
		top: -14.5%;
		left: 29%;
		width: 79%;
		z-index: -1;
		mask-image: linear-gradient(transparent 0, black 15%, black 70%, transparent 85%);
	}
	:global(.mobileLandscape) .himeko {
		left: 31%;
		width: 75%;
		top: -27%;
	}

	.lite .splash-art,
	.lite .featured-bg,
	.lite .bronya img {
		mask-image: unset !important;
	}
	.lite {
		overflow: hidden;
	}
	.lite .featured-bg {
		background-image: unset;
		background-color: #272d5f;
	}
</style>
