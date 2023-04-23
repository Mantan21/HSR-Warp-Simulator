<script>
	import { isLoading, locale } from 'svelte-i18n';
	import { dev } from '$app/environment';
	import './styles.css';
	import {
		isMobile,
		isMobileLandscape,
		viewportWidth,
		viewportHeight
	} from '$lib/stores/app-store';
	import { onMount, setContext } from 'svelte';
	import { mobileDetect } from '$lib/helpers/mobile-detect';
	import { mountLocale } from '$lib/helpers/i18n';
	import { fade } from '$lib/helpers/transition';
	import InitialLoader from '$lib/components/InitialLoader.svelte';

	let isLoaded = false;
	const loaded = () => (isLoaded = true);
	setContext('loaded', loaded);

	let innerHeight;
	let innerWidth;
	$: viewportWidth.set(innerWidth);
	$: viewportHeight.set(innerHeight);

	const setMobileMode = () => {
		// if ($isPWA) return isMobileLandscape.set(true);
		const angle = screen.orientation?.angle || 0;
		const rotate = angle === 90 || angle === 270;
		isMobileLandscape.set(rotate);
	};

	mountLocale();
	onMount(() => {
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
	<link
		rel="preload"
		href="/fonts/NovecentoSans-WideBold.woff2"
		as="font"
		type="font/woff2"
		crossorigin
	/>
	<link rel="preload" href="/fonts/d-din-pro.woff2" as="font" type="font/woff2" crossorigin />
	<link
		rel="preload"
		href="/fonts/StarRailNeue-Regular.woff2"
		as="font"
		type="font/woff2"
		crossorigin
	/>
</svelte:head>

<main
	style="--screen-width:{innerWidth}px; --screen-height:{innerHeight}px"
	class:mobileLandscape={$isMobileLandscape}
>
	{#if !$isLoading && isLoaded}
		<slot />
	{:else}
		<div class="loading" transition:fade={{ duration: 250 }}>
			<InitialLoader />
		</div>
	{/if}
	<a
		href="/"
		on:click|preventDefault={() => window.location.replace('/')}
		class="uid"
		title="Try Your Luck by this Simulator"
	>
		HSR.WishSimulator.App
	</a>
</main>

<style>
	@font-face {
		font-family: 'DDin Pro';
		src: url('/fonts/d-din-pro.woff2') format('woff2');
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

	:global(.os-theme-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle) {
		background-color: #d2c69c;
		opacity: 0.5;
	}
	:global(.os-theme-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle:hover),
	:global(.os-theme-light > .os-scrollbar > .os-scrollbar-track > .os-scrollbar-handle:active) {
		background-color: #d2c69c;
		opacity: 1;
	}

	:global(.os-theme-light > .os-scrollbar-vertical) {
		width: 8px;
	}
	:global(.os-theme-light > .os-scrollbar-horizontal) {
		height: 8px;
	}

	main {
		display: block;
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		font-family: var(--hsr-font);
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
		z-index: 9999;
		color: #fff;
		text-shadow: 0 0 1.5px rgba(0, 0, 0, 0.7);
		font-family: Roboto, sans-serif;
		pointer-events: none;
	}

	.mobileLandscape .uid {
		right: 5%;
	}
</style>
