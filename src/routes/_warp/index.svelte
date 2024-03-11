<script>
	import { getContext, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';

	import {
		activeBanner,
		assets,
		autoskip,
		bannerList,
		showStarterBanner
	} from '$lib/stores/app-store';
	import { rollCounter } from '$lib/helpers/dataAPI/api-localstorage';
	import { pauseTrack, resumeTrack } from '$lib/helpers/sounds/phonograph';
	import { playSfx } from '$lib/helpers/sounds/audiofx.js';

	import AdditionalReward from './additional-reward/AdditionalReward.svelte';
	import Footer from './_footer.svelte';
	import Header from './_header.svelte';
	import BannerItem from './BannerItem.svelte';
	import BannerSelection from './_banner-selection.svelte';
	import Background from './_background.svelte';
	import AstralExpress from './warp-result/_astral-express.svelte';
	import WarpResult from './warp-result/WarpResult.svelte';

	let type, bannerName;
	$: ({ bannerName, featured, type } = $bannerList[$activeBanner]);
	$: bannerType = type;

	let color1 = '0,0,0';
	let color2 = color1;
	let color3 = null;
	setContext('setColor', (clr1, clr2, clr3 = null) => {
		color1 = clr1;
		color2 = clr2;
		color3 = clr3 || clr2;
	});

	// Banner Index to adjust Transition
	setContext('beforeMoving', writable(0));

	// Additional Reward Handle
	let showAdditional = false;
	const handleAdditional = ({ confirm = false } = {}) => {
		playSfx(!showAdditional || confirm ? 'click' : 'modal-close');
		showAdditional = !showAdditional;
	};
	setContext('handleShowReward', handleAdditional);

	// Astral Express
	let skipSplashart = false;
	let showAstralExpress = false;
	let astralRarity = 3;
	let showWarpResult = false;
	let warpResult = [];

	const showSplashArt = ({ skip = false } = {}) => {
		skipSplashart = skip;
		showWarpResult = true;
		showAstralExpress = false;
		if (bannerType !== 'starter') return;

		const starterCount = rollCounter.get('starter');
		if (starterCount > 49) return showStarterBanner.set(false);
	};
	setContext('showSplashArt', showSplashArt);

	// Prevent phonograph playing when warping
	const onWarp = getContext('onWarp');
	const closeResult = () => {
		showWarpResult = false;
		onWarp.set(false);
		resumeTrack();
	};
	setContext('closeResult', closeResult);

	const handleGachaAnimation = (result, source = 'warp') => {
		onWarp.set(true);
		pauseTrack({ stop: false });

		warpResult = result;
		const { express: skipExpress, art: skipArt } = $autoskip;
		const skipAll = skipExpress && skipArt;
		const skipAnimation = source !== 'warp' || skipExpress;
		if (skipAnimation) return showSplashArt({ skip: skipAll });

		const star = result.map(({ rarity }) => rarity);
		if (star.includes(5)) astralRarity = 5;
		else if (star.includes(4)) astralRarity = 4;
		else astralRarity = 3;

		showAstralExpress = true;
	};
	setContext('handleGachaAnimation', handleGachaAnimation);
</script>

<svelte:head>
	<title>{$t('title')}</title>
</svelte:head>

{#if showAdditional}
	<AdditionalReward />
{/if}

<div
	class="warp-container"
	class:show={showAstralExpress || showWarpResult}
	style="--bg:url({$assets['warp-bg.webp']})"
>
	<AstralExpress show={showAstralExpress} rarity={astralRarity} banner={bannerType} />
	{#if showWarpResult}
		<WarpResult list={warpResult} skip={skipSplashart} />
	{/if}
</div>

<div
	class="banner"
	style="--bn-color2: rgba({color2}, .9);
	--bn-color1: rgba({color1}, .9);
	--ribbon-color: rgba({color3}, .9)"
	transition:fade={{ duration: 250 }}
>
	<Background />
	<Header {bannerType} {bannerName} />
	<BannerSelection />

	{#each $bannerList as banner, i}
		{#if i === $activeBanner}
			<div class="warp-banner">
				<BannerItem banner={banner.type} item={banner} bannerIndex={i} />
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
	}

	.banner {
		background-color: black;
	}
	.warp-banner {
		position: absolute;
		top: 0;
		left: 0;
	}

	/* Warp Result */
	.warp-container {
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 10;
		top: 0;
		left: 0;
		pointer-events: none;
	}

	.warp-container.show {
		background-image: var(--bg);
		background-size: cover;
		background-position: center center;
		pointer-events: unset;
	}
</style>
