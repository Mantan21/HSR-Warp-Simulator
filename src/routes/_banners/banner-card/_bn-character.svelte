<script>
	import { fly } from '$lib/helpers/transition';
	import { data } from '$lib/data/characters.json';
	import { isMobileLandscape } from '$lib/stores/app-store';
	import positionToStyle from '$lib/helpers/cssPosition';
	import BannerTpl from './__banner-tpl.svelte';

	export let item = {};

	const characterOffset = (characterName, ismobile) => {
		const nullValue = { bannerOffset: {} };
		const { bannerOffset } = data.find(({ name }) => name === characterName) || nullValue;
		if (!ismobile) return positionToStyle(bannerOffset);

		const tmp = {};
		tmp.b = (bannerOffset?.b || 0) - 23;
		tmp.l = (bannerOffset?.l || 0) + 5;

		return positionToStyle({ ...bannerOffset, ...tmp });
	};
</script>

<BannerTpl>
	<div class="featured-bg" />
	<div class="splash-art">
		<figure class="seele">
			<img
				src="/images/characters/5star/{item.featured}.webp"
				alt="Seele"
				in:fly={{ x: -15, duration: 1500, delay: 200 }}
				style={characterOffset(item.featured, $isMobileLandscape)}
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
