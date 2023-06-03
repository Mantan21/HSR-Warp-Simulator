<script>
	import { getContext, setContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { activeBanner, assets, bannerList } from '$lib/stores/app-store';
	import { activeBacksound } from '$lib/stores/phonograph-store';
	import { localConfig } from '$lib/stores/localstorage';
	import { playSfx } from '$lib/helpers/sounds/audiofx.js';

	import AdditionalReward from './additional-reward/AdditionalReward.svelte';
	import Footer from './_footer.svelte';
	import Header from './_header.svelte';
	import BannerItem from './BannerItem.svelte';
	import BannerSelection from './_banner-selection.svelte';
	import Background from './_background.svelte';
	import AstralExpress from './warp-result/_astral-express.svelte';
	import WarpResult from './warp-result/WarpResult.svelte';
	import { isPlaying, pauseTrack, resumeTrack } from '$lib/helpers/sounds/phonograph';
	import { writable } from 'svelte/store';

	let type, bannerName;
	$: ({ bannerName, beta, featured, type } = $bannerList[$activeBanner]);
	$: bannerType = type;

	let color1 = '0,0,0';
	let color2 = color1;
	setContext('setColor', (clr1, clr2) => {
		color1 = clr1;
		color2 = clr2;
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
	$: bgm = $activeBacksound;

	const showSplashArt = ({ skip } = { skip: false }) => {
		skipSplashart = skip;
		showWarpResult = true;
		showAstralExpress = false;
	};
	setContext('showSplashArt', showSplashArt);

	// Prevent phonograph playing when warping
	const onWarp = getContext('onWarp');
	const closeResult = () => {
		showWarpResult = false;
		onWarp.set(false);
		if (!isPlaying(bgm.sourceID)) resumeTrack(bgm.sourceID);
	};
	setContext('closeResult', closeResult);

	const handleGachaAnimation = (result, source = 'warp') => {
		onWarp.set(true);
		if (isPlaying(bgm.sourceID)) pauseTrack(bgm.sourceID, false);

		warpResult = result;
		const autoSkip = source !== 'warp' || localConfig.get('autoskip');
		if (autoSkip) return showSplashArt({ skip: true });

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
	style="--bn-color2: rgba({color2}, .9); --bn-color1: rgba({color1}, .9)"
	transition:fade={{ duration: 250 }}
>
	<Background activeType={bannerType} />
	<Header {bannerType} {bannerName} {beta} />
	<BannerSelection />

	{#each $bannerList as banner, i}
		{#if banner.type === bannerType}
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
		z-index: +1;
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
