<script>
	import { fly } from '$lib/helpers/transition';
	import BannerTpl from '$lib/components/banners/BannerTpl.svelte';
</script>

<BannerTpl>
	<div class="featured-bg" />
	<div class="splash-art">
		<figure class="seele">
			<img
				src="/images/characters/5star/seele.webp"
				alt="Seele"
				in:fly={{ x: -15, duration: 1500, delay: 200 }}
			/>
		</figure>
	</div>
</BannerTpl>

<style>
	.featured-bg {
		width: 100%;
		height: 100%;
		z-index: -1;
		mask-image: linear-gradient(rgba(0, 0, 0, 1) 85%, transparent);
		background-image: linear-gradient(
			170deg,
			rgb(0, 0, 0, 1),
			var(--bn-color1) 50%,
			var(--bn-color2)
		);
		background-color: rgba(255, 255, 255, 0.5);
		background-size: 200%;
		background-position: top left;
		position: relative;
	}

	.splash-art {
		position: absolute;
		top: 0;
		right: 0;
		z-index: -1;
		width: 150%;
		height: 110%;
		overflow: hidden;
		mask-image: linear-gradient(to right, transparent 20%, black 27%);
	}

	figure {
		width: 100%;
		height: 100%;
		position: relative;
		mask-image: linear-gradient(black 65%, transparent 98%);
	}

	img {
		position: absolute;
		z-index: 1;
		bottom: -57%;
		left: -8%;
		width: 160%;
	}

	:global(.mobileLandscape) img {
		bottom: -80%;
		left: -3%;
	}
</style>
