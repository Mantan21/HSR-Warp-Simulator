<script>
	import { t } from 'svelte-i18n';
	import { bezier } from '$lib/helpers/easing';
	import { fly } from '$lib/helpers/transition';
	import { data } from '$lib/data/characters.json';
	import { isMobileLandscape } from '$lib/stores/app-store';
	import positionToStyle from '$lib/helpers/cssPosition';
	import { assetPath } from '$lib/helpers/assets';
	import BannerTpl from './__banner-tpl.svelte';

	export let item = {};

	const characterOffset = (characterName, ismobile) => {
		const nullValue = { bannerOffset: {} };
		const { bannerOffset } = data.find(({ name }) => name === characterName) || nullValue;
		if (!ismobile) return positionToStyle(bannerOffset);

		const tmp = {};
		tmp.b = (bannerOffset?.b || 0) + 75;
		tmp.l = (bannerOffset?.l || 0) + 5;

		return positionToStyle({ ...bannerOffset, ...tmp });
	};
</script>

<BannerTpl>
	<div class="featured-bg" />
	<div class="splash-art">
		<div class="wrapper">
			<picture
				in:fly={{
					x: -30,
					duration: 4000,
					delay: 250,
					opacity: 0.8,
					easing: bezier(0.13, 0.14, 0, 1)
				}}
			>
				<source
					srcset={assetPath(`splash-art/5/${item.featured}`, 2000)}
					media="(min-width: 1280px)"
				/>
				<source
					srcset={assetPath(`splash-art/5/${item.featured}`, 1280)}
					media="(min-width: 640px)"
				/>
				<img
					crossorigin="anonymous"
					alt={$t(item.featured)}
					src={assetPath(`splash-art/5/${item.featured}`, 640)}
					style={characterOffset(item.featured, $isMobileLandscape)}
				/>
			</picture>
		</div>
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

	.wrapper {
		display: block;
		width: 100%;
		height: 100%;
		position: relative;
		mask-image: linear-gradient(black 65%, transparent 98%);
	}

	picture {
		position: relative;
		display: block;
		height: 100%;
		width: 100%;
	}
	img {
		position: absolute;
		left: 0;
		width: 100%;
	}

	:global(.mobileLandscape) picture {
		bottom: -80%;
		left: -3%;
		transform: scale(0.85);
	}
</style>
