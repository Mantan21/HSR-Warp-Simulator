<script>
	import { onMount, setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import {
		activePhase,
		activeVersion,
		isMobile,
		liteMode,
		showStarterBanner
	} from '$lib/stores/app-store';
	import { importLocalConfig, setBannerVersionAndPhase } from '$lib/helpers/readLocalData';
	import { browserState } from '$lib/helpers/page-navigation';
	import { handleShowStarter, initializeBanner } from '$lib/helpers/banner-loader';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import { randomTrack } from '$lib/helpers/sounds/phonograph';
	import { userCurrencies } from '$lib/helpers/shop-price';

	import ObtainedItem from '$lib/components/ObtainedItem.svelte';
	import ModalConvert from '$lib/components/ModalConvert.svelte';
	import PreloadExpress from './_banners/_preload-express/PreloadExpress.svelte';
	import Banners from './_banners/index.svelte';
	import LoginPage from './_login/index.svelte';
	import AllBanner from './_allbanner/index.svelte';
	import Menu from './_menu/index.svelte';
	import Collection from './_collection/index.svelte';
	import Shop from './_shop/index.svelte';
	import GachaInfo from './_gachainfo/index.svelte';
	import Phonograph from './_phonograph/index.svelte';
	import { localConfig } from '$lib/stores/localstorage';

	let status;
	let loggedIn = false;
	setContext('login', () => (loggedIn = true));

	let pageActive = 'index';
	const navigate = (page) => {
		let beforeNavigate = pageActive;
		pageActive = page;
		if (beforeNavigate !== 'index') return browserState.back();
		if (beforeNavigate === pageActive) return;
		browserState.set(page);
	};
	setContext('navigate', navigate);

	const checkBannerStatus = async (initBanner) => ({ status } = await initBanner);
	$: initBanner = initializeBanner($activeVersion, $activePhase);
	$: checkBannerStatus(initBanner);
	$: handleShowStarter($showStarterBanner);

	const handleLiteMode = () => {
		const lLitemode = localConfig.get('litemode');
		if (typeof lLitemode !== 'boolean') {
			liteMode.set(true);
			localConfig.set('litemode', true);
		}
	};

	onMount(() => {
		setBannerVersionAndPhase();
		importLocalConfig();

		// litemode
		if ($isMobile) handleLiteMode();

		// Detect Currencies
		userCurrencies.init();

		// Play Random music
		randomTrack('init');

		window.addEventListener('popstate', (e) => {
			if (e.state.page) return;
			if (pageActive === 'index') return;
			navigate('index');
		});
	});

	// Convert Modal
	let showConvertModal = false;
	setContext('openConvertModal', () => (showConvertModal = true));
	setContext('closeConvertModal', () => (showConvertModal = false));

	// Obtained
	let showObtained = false;
	let obtainedData = {};
	const openObtained = (data) => {
		obtainedData = data;
		showObtained = true;
	};
	const closeObtained = () => {
		showObtained = false;
		obtainedData = {};
		playSfx('modal-close');
	};
	setContext('openObtained', openObtained);
	setContext('closeObtained', closeObtained);

	// Express Loader
	const readyToPull = writable(true);
	setContext('readyToPull', readyToPull);
</script>

{#if status === 'error'}
	error bos
{/if}

{#if showObtained}
	<ObtainedItem {...obtainedData} />
{/if}

{#if !loggedIn}
	<LoginPage />
{:else}
	{#if showConvertModal}
		<ModalConvert />
	{/if}

	{#if pageActive === 'index'}
		<Banners />
		<Menu />
	{:else if pageActive === 'allbanner'}
		<AllBanner />
	{:else if pageActive === 'collection'}
		<Collection />
	{:else if pageActive === 'shop'}
		<Shop />
	{:else if pageActive === 'details'}
		<GachaInfo />
	{:else if pageActive === 'phonograph'}
		<Phonograph />
	{/if}

	<PreloadExpress />
{/if}
