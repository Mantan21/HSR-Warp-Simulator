<script>
	import { cubicOut } from 'svelte/easing';
	import { t } from 'svelte-i18n';
	import { data } from '$lib/data/light-cones.json';
	import { scaleOrigin } from '$lib/helpers/transition';
	import { assets, isMobileLandscape, liteMode } from '$lib/stores/app-store';
	import positionToStyle from '$lib/helpers/css-transformer';
	import BannerTpl from './__banner-tpl.svelte';

	export let item = {};

	let xOrigin = 100;
	let yOrigin = 100;
	const lcOffset = (lightconeName, isMobile) => {
		const { bannerOffset = {} } = data.find(({ name }) => name === lightconeName) || {};
		({ xOrigin = 100, yOrigin = 100 } = bannerOffset);
		if (!isMobile) return positionToStyle(bannerOffset);

		const tmp = {};
		tmp.b = (bannerOffset?.b || 0) - 20;
		return positionToStyle({ ...bannerOffset, ...tmp });
	};

	const offset = lcOffset(item.featured, $isMobileLandscape);
</script>

<BannerTpl blank>
	<div class="wrapper" class:lite={$liteMode}>
		<div
			class="layer-bg"
			in:scaleOrigin={{
				start: 1.15,
				duration: 3000,
				origin: `${xOrigin}% ${yOrigin}%`,
				easing: cubicOut
			}}
		>
			<picture style={offset}>
				<source srcset={$assets[`lc/medium/${item.featured}`]} media="(max-width: 640px)" />
				<img
					src={$assets[`lc/large/${item.featured}`]}
					alt={$t(item.featured)}
					crossorigin="anonymous"
				/>
			</picture>
		</div>
		<div class="layer-white">
			<img src={$assets['circle-ornament1.svg']} alt="Circle" class="ornament ornament1" />
			<img src={$assets['circle-ornament2.svg']} alt="Circle" class="ornament ornament2" />
			<div class="ornament ornament3" />
		</div>
	</div>
</BannerTpl>

<style>
	.wrapper {
		mask-image: linear-gradient(black 85%, transparent 98%);
		width: 100%;
		height: 100%;
		position: absolute;
		overflow: hidden;
		top: 0;
		right: 0;
		background-image: linear-gradient(170deg, #fff, transparent);
		z-index: -1;
	}

	.layer-bg {
		display: block;
		width: 100%;
		height: 100%;
		transform: scale(1.0001);
	}

	.layer-bg img {
		width: 100%;
	}
	.layer-bg picture {
		width: 100%;
		position: absolute;
		bottom: 0;
		right: -2%;
		mask-image: linear-gradient(black 80%, transparent 98%);
	}

	.layer-white {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: linear-gradient(
			90deg,
			rgb(240, 240, 240),
			rgb(240, 240, 240) 40%,
			rgba(240, 240, 240, 1) 55%,
			rgba(240, 240, 240, 0) 90%
		);
		mask-image: radial-gradient(circle farthest-side at right, transparent 31%, white 31%);
		mask-position: 74%;
		mask-size: 200% 100%;
	}

	.wrapper.lite,
	.lite .layer-bg,
	.lite .layer-bg img {
		mask-image: unset;
	}

	.lite.wrapper {
		overflow: hidden;
		background-image: unset;
	}
	.lite .layer-white {
		background-image: unset;
		background-color: rgba(255, 255, 255, 1);
	}

	/* ornament */
	.ornament {
		position: absolute;
	}

	.ornament1 {
		width: 125%;
		aspect-ratio: 1/1;
		object-fit: contain;
		top: 50%;
		left: 28%;
		transform: translateY(-50%);
		animation: rotate linear infinite 210s;
	}
	.ornament2 {
		width: 23%;
		aspect-ratio: 1/1;
		top: 50%;
		left: 47.5%;
		transform: translateY(-50%);
		animation: rotate linear reverse infinite 60s;
		opacity: 0.3;
	}
	.ornament3 {
		width: 40%;
		aspect-ratio: 1/1;
		top: 50%;
		left: 40%;
		border: 0.1rem dashed rgba(0, 0, 0, 0.3);
		border-radius: 100%;
		transform: translateY(-50%);
		animation: rotate linear reverse infinite 120s;
		opacity: 0.5;
	}

	@keyframes rotate {
		0% {
			transform: translateY(-50%) rotate(0deg);
		}
		100% {
			transform: translateY(-50%) rotate(-360deg);
		}
	}
</style>
