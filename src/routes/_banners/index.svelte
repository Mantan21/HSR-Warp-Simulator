<script>
	import { setContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { fade, fly } from '$lib/helpers/transition';
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
	import { pauseTrack, resumeTrack } from '$lib/helpers/sounds/phonograph';

	let type, bannerName;
	$: ({ bannerName, beta, featured, type } = $bannerList[$activeBanner]);
	$: bannerType = type;

	const bannerTransition = (node, args) => {
		if (args.fade) return fade(node, args);
		return fly(node, args);
	};

	let color1 = '0,0,0';
	let color2 = color1;
	setContext('setColor', (clr1, clr2) => {
		color1 = clr1;
		color2 = clr2;
	});

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

	const closeResult = () => {
		showWarpResult = false;
		resumeTrack(bgm.sourceID);
	};
	setContext('closeResult', closeResult);

	const handleGachaAnimation = (result, source = 'warp') => {
		pauseTrack(bgm.sourceID, false);
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
	<Background bannerList={$bannerList} {bannerType} {featured} />
	<Header {bannerType} {bannerName} {beta} />
	<BannerSelection />

	{#each $bannerList as banner}
		{#if banner.type === bannerType}
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
				<BannerItem banner={banner.type} item={banner} />
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
