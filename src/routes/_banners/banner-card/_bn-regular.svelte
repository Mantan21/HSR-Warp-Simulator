<script>
	import { assetPath } from '$lib/helpers/assets';
	import { bezier } from '$lib/helpers/easing';
	import { fly } from '$lib/helpers/transition';
	import BannerTpl from './__banner-tpl.svelte';
</script>

<BannerTpl>
	<div class="featured-bg" />
	<div class="splash-art himeko">
		<figure
			in:fly={{
				x: -25,
				duration: 4000,
				delay: 250,
				opacity: 0.8,
				easing: bezier(0.13, 0.14, 0, 1)
			}}
		>
			<img src={assetPath('banners/regular/himeko.webp')} alt="Himeko" crossorigin="anonymous" />
		</figure>
	</div>
	<div class="splash-art gepard">
		<figure
			in:fly={{
				x: -25,
				duration: 4000,
				delay: 250,
				opacity: 0.8,
				easing: bezier(0.13, 0.14, 0, 1)
			}}
		>
			<img src={assetPath('banners/regular/gepard.webp')} alt="Gepard" crossorigin="anonymous" />
		</figure>
	</div>
	<div class="splash-art bronya">
		<figure
			in:fly={{
				x: -50,
				delay: 250,
				duration: 4000,
				opacity: 0.8,
				easing: bezier(0.13, 0.14, 0, 1)
			}}
		>
			<img src={assetPath('banners/regular/bronya.webp')} alt="Bronya" crossorigin="anonymous" />
		</figure>
	</div>
</BannerTpl>

<style>
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
		top: -28.5%;
		left: -34%;
		width: 112%;
		z-index: -1;
		mask-image: linear-gradient(transparent 10%, black 25%, black 60%, transparent 80%);
	}
	:global(.mobileLandscape) .gepard {
		width: 95%;
	}

	.bronya {
		top: -14.5%;
		left: -5.5%;
		width: 120%;
		z-index: +1;
		mask-image: linear-gradient(transparent 0, black 15%, black 70%, transparent 85%);
	}
	:global(.mobileLandscape) .bronya {
		width: 105%;
		left: -0.5%;
	}

	.bronya img {
		mask-image: linear-gradient(to right, black 85%, transparent 95%);
	}
	.himeko {
		top: -14.5%;
		left: 29%;
		width: 79%;
		z-index: -1;
		mask-image: linear-gradient(transparent 0, black 15%, black 70%, transparent 85%);
	}
	:global(.mobileLandscape) .himeko {
		left: 30%;
		width: 70%;
	}
</style>
