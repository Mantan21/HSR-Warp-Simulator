<script>
	import ColorThief from '../../../node_modules/colorthief/dist/color-thief.mjs';
	import { fade, fly } from '$lib/helpers/transition';
	import { activeBanner, assets, bannerList } from '$lib/stores/app-store';
	import Footer from './_footer.svelte';
	import Header from './_header.svelte';
	import BannerItem from './BannerItem.svelte';
	import BannerSelection from '$lib/components/banners/BannerSelection.svelte';

	let item, type;
	$: ({ item, type } = $bannerList[$activeBanner]);
	$: bannerType = type;

	let color1 = '0,0,0';
	let color2 = color1;
	const colorthief = new ColorThief();

	const getColor = (list) => {
		try {
			const { item } = list.find(({ type }) => type === 'character') || { item: null };
			if (!item) return;

			const img = new Image();
			img.crossOrigin = 'anonymous';
			img.src = `/images/characters/5star/${item.featured.characterName}.webp`;
			img.addEventListener('load', () => {
				const [clr1, clr2] = colorthief.getPalette(img, 2);
				color1 = clr1.join(',');
				color2 = clr2.join(',');
			});
		} catch (e) {
			console.log(e);
		}
	};

	const bannerTransition = (node, args) => {
		if (args.fade) return fade(node, args);
		return fly(node, args);
	};

	$: getColor($bannerList);
</script>

<div class="banner" style="--bn-color2: rgba({color1}, 0.8); --bn-color1: rgba({color2}, 0.8)">
	{#if bannerType === 'starter'}
		<div class="bg" transition:fade|local={{ duration: 250 }}>
			<img src={$assets['departure-bg.webp']} alt="Background" crossorigin="anonymous" />
		</div>
	{:else if bannerType === 'regular'}
		<div class="bg" transition:fade|local={{ duration: 250 }}>
			<img src={$assets['stellar-bg.webp']} alt="Background" crossorigin="anonymous" />
		</div>
	{:else if bannerType === 'character'}
		<div class="bg character" transition:fade|local={{ duration: 250 }}>
			<img
				src="/images/characters/5star/{item.featured.characterName}.webp"
				alt="Background"
				crossorigin="anonymous"
			/>
		</div>
	{:else if bannerType === 'lightcone'}
		<div class="bg lightcone" transition:fade|local={{ duration: 250 }}>
			<img
				src="/images/light-cones/5star/{item.featured}.webp"
				alt="Background"
				crossorigin="anonymous"
			/>
		</div>
	{/if}

	<Header {bannerType} />
	<BannerSelection />
	{#each $bannerList as { type, item }}
		{#if type === bannerType}
			<div
				class="warp-banner"
				in:bannerTransition|local={{
					y: -100,
					duration: 200,
					delay: 200,
					fade: bannerType === 'starter'
				}}
				out:bannerTransition|local={{ y: 100, duration: 200 }}
			>
				<BannerItem banner={type} {item} />
			</div>
		{/if}
	{/each}
	<Footer {bannerType} />
</div>

<style>
	.banner,
	.warp-banner {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.banner {
		background-color: black;
	}
	.warp-banner {
		z-index: +1;
	}

	.bg {
		width: 100vw;
		height: 100%;
		position: fixed;
		z-index: 0;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(1.1);
		filter: blur(10px);
	}

	img {
		width: 100%;
		height: 100%;
	}

	.bg.character {
		background-image: linear-gradient(
			170deg,
			rgb(0, 0, 0, 1),
			var(--bn-color1) 50%,
			var(--bn-color2)
		);
		background-size: 200%;
		background-position: top left;
		filter: blur(15px);
		background-color: #fff;
	}

	.bg.character img {
		position: absolute;
		transform: scale(1.9);
		top: -28%;
		left: -4.5%;
		mask-image: linear-gradient(45deg, rgba(0, 0, 0, 0.8) 20%, transparent 65%);
	}

	.bg.lightcone {
		filter: blur(15px);
		background-image: linear-gradient(
			170deg,
			rgb(0, 0, 0, 1),
			var(--bn-color1) 50%,
			var(--bn-color2)
		);
	}

	.bg.lightcone img {
		position: absolute;
		top: unset;
		left: unset;
		bottom: -2%;
		right: 0%;
		height: unset;
		width: unset;
		min-height: 100vh;
		min-width: 100vw;
		opacity: 0.8;
	}
</style>
