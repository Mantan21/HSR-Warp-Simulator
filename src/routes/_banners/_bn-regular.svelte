<script>
	import BannerTpl from '$lib/components/banners/BannerTpl.svelte';
	import { fly } from '$lib/helpers/transition';
</script>

<BannerTpl>
	<div class="featured-bg" />
	<div class="splash-art himeko">
		<figure in:fly={{ x: -15, duration: 1500, delay: 250 }}>
			<img src="/images/banners/regular/himeko.webp" alt="Himeko" />
		</figure>
	</div>
	<div class="splash-art gepard">
		<figure in:fly={{ x: -15, duration: 1500, delay: 250 }}>
			<img src="/images/banners/regular/gepard.webp" alt="Gepard" />
		</figure>
	</div>
	<div class="splash-art bronya">
		<figure in:fly={{ x: -30, duration: 1500, delay: 250 }}>
			<img src="/images/banners/regular/bronya.webp" alt="Bronya" />
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
	.bronya {
		top: -14.5%;
		left: -5.5%;
		width: 120%;
		z-index: +1;
		mask-image: linear-gradient(transparent 0, black 15%, black 70%, transparent 85%);
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
</style>
