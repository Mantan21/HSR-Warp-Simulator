<script>
	import { registerSW } from 'virtual:pwa-register';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { onMount, setContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { writable } from 'svelte/store';
	import { isLoading, locale } from 'svelte-i18n';
	import { dev } from '$app/environment';
	import './styles.css';

	import { APP_TITLE, DESCRIPTION, HOST, KEYWORDS } from '$lib/data/site-setup.json';
	import {
		isMobile,
		isMobileLandscape,
		isPWA,
		viewportWidth,
		viewportHeight
	} from '$lib/stores/app-store';
	import { mobileDetect } from '$lib/helpers/mobile-detect';
	import { mountLocale } from '$lib/helpers/i18n';
	import Iklan from '$lib/components/Iklan.svelte';
	import InitialLoader from './_index/InitialLoader.svelte';

	let isLoaded = false;
	const showAd = writable(false);
	setContext('loaded', () => (isLoaded = true));
	setContext('showAd', showAd);

	let innerHeight;
	let innerWidth;
	$: viewportWidth.set(innerWidth);
	$: viewportHeight.set(innerHeight);
	$: previewScreen = $page.url.pathname.includes('screen');

	let font = '';
	$: {
		const lc = $locale?.toLowerCase() || '';
		const cnLogo = lc.match(/(zh|ja)/);
		font = cnLogo || lc.includes('th') ? lc.split('-')[0] : 'os';
	}

	const redirectIfNotValidPath = () => {
		const allowedPath = ['screen', 'feedback', 'privacy-policy'];
		const { pathname } = $page.url;
		const pathNow = pathname.split('/')[1];
		if (!pathNow || allowedPath.includes(pathNow)) return;
		return goto('/');
	};

	const setMobileMode = () => {
		if ($isPWA) return isMobileLandscape.set(true);
		const angle = screen.orientation?.angle || 0;
		const rotate = angle === 90 || angle === 270;
		isMobileLandscape.set(rotate);
	};

	mountLocale();
	onMount(() => {
		redirectIfNotValidPath();

		const url = new URL(window.location.href);
		const searchParams = new URLSearchParams(url.search);
		isPWA.set(!!searchParams.get('pwasc'));

		registerSW();
		isMobile.set(mobileDetect() || innerWidth < 601);
		if ($isMobile) setMobileMode();

		window.addEventListener('orientationchange', () => {
			if ($isMobile) setMobileMode();
		});

		// prevent Righ click (hold on android) on production mode
		if (!dev) document.addEventListener('contextmenu', (e) => e.preventDefault());
	});
</script>

<svelte:window bind:innerHeight bind:innerWidth />

<svelte:head>
	<meta name="description" content={DESCRIPTION} />
	<meta name="keywords" content={KEYWORDS} />
	<meta property="al:web:url" content={HOST} />
	<link rel="fluid-icon" href="{HOST}/meta-picture.jpg" title={APP_TITLE} />

	<meta property="og:url" content={HOST} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={APP_TITLE} />
	<meta property="og:description" content={DESCRIPTION} />
	<meta property="og:image" content="{HOST}/meta-picture.jpg" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta property="twitter:domain" content={HOST.replace('https://', '').replace('http://', '')} />
	<meta property="twitter:url" content={HOST} />
	<meta name="twitter:title" content={APP_TITLE} />
	<meta name="twitter:description" content={DESCRIPTION} />
	<meta name="twitter:image" content="{HOST}/meta-picture.jpg" />

	{#if !dev}
		<link rel="manifest" href="/appmanifest.json" />
	{/if}

	{#if $page.url.pathname !== '/'}
		<link rel="canonical" href={HOST} />
	{/if}

	<link
		rel="preload"
		href="/fonts/NovecentoSans-WideBold.woff2"
		as="font"
		type="font/woff2"
		crossorigin
	/>
	<link
		rel="preload"
		href="/fonts/StarRailNeue-Regular.woff2"
		as="font"
		type="font/woff2"
		crossorigin
	/>
	<link
		rel="preload"
		href="/fonts/optimized_global_web.woff2"
		as="font"
		type="font/woff2"
		crossorigin
	/>
	<link
		rel="preload"
		href="/fonts/optimized_ja_web.woff2"
		as="font"
		type="font/woff2"
		crossorigin
	/>
	<link
		rel="preload"
		href="/fonts/optimized_zh_web.woff2"
		as="font"
		type="font/woff2"
		crossorigin
	/>

	{#if isLoaded && $showAd}
		<Iklan head />
	{/if}
</svelte:head>

<main
	style="--screen-width:{innerWidth}px; --screen-height:{innerHeight}px; --hsr-font:var(--hsr-{font}-font)"
	class:mobileLandscape={$isMobileLandscape}
	class={$locale}
>
	{#if !isLoaded}
		<div class="loading" transition:fade={{ duration: 250 }}>
			<InitialLoader />
		</div>
	{/if}

	{#if !$isLoading && isLoaded}
		<slot />
	{/if}

	{#if !previewScreen}
		<span class="uid"> HSR.WishSimulator.App </span>
	{/if}
</main>

<style>
	@font-face {
		font-family: 'StarRail_Global_Web';
		src: url('/fonts/optimized_global_web.woff2') format('woff2');
		font-weight: normal;
		font-style: normal;
	}

	@font-face {
		font-family: 'StarRail_JA_Web';
		src: url('/fonts/optimized_ja_web.woff2') format('woff2');
		font-weight: normal;
		font-style: normal;
	}

	@font-face {
		font-family: 'StarRail_ZH_Web';
		src: url('/fonts/optimized_zh_web.woff2') format('woff2');
		font-weight: normal;
		font-style: normal;
	}

	@font-face {
		font-family: 'StarRail Neue';
		src: url('/fonts/StarRailNeue-Regular.woff2') format('woff2');
		font-weight: normal;
		font-style: normal;
	}

	@font-face {
		font-family: 'Novecento';
		src: url('/fonts/NovecentoSans-WideBold.woff2') format('woff2');
		font-weight: normal;
		font-style: normal;
	}

	main {
		display: block;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		font-family: var(--hsr-font);
		background-color: #000;
	}

	.loading {
		width: 100vw;
		height: 100%;
		position: absolute;
		z-index: 9980;
		left: 0;
		top: 0;
	}

	:global(audio) {
		visibility: hidden;
	}

	.uid {
		display: block;
		position: fixed;
		bottom: 0px;
		right: 2em;
		padding: 0.2%;
		z-index: 9999;
		color: #fff;
		text-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.7);
		-webkit-text-stroke: 0.01rem #000;
		pointer-events: none;
	}

	.mobileLandscape .uid {
		right: 5%;
	}
</style>
