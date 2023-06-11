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
	import { activeBacksound } from '$lib/stores/phonograph-store';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import { isPlaying, pauseTrack, resumeTrack } from '$lib/helpers/sounds/phonograph';
	import { importLocalConfig, setBannerVersionAndPhase } from '$lib/helpers/storage-reader';
	import { browserState } from '$lib/helpers/page-navigation';
	import { handleShowStarter, initializeBanner } from '$lib/helpers/banner-loader';
	import { userCurrencies } from '$lib/helpers/shop-price';
	import { localConfig } from '$lib/stores/localstorage';

	import ObtainedItem from '$lib/components/ObtainedItem.svelte';
	import ModalConvert from '$lib/components/ModalConvert.svelte';
	import Welcome from './_index/Welcome.svelte';
	import PreloadExpress from './_index/PreloadExpress.svelte';
	import Banners from './_banners/index.svelte';
	import AllBanner from './_allbanner/index.svelte';
	import Menu from './_menu/index.svelte';
	import Collection from './_collection/index.svelte';
	import Shop from './_shop/index.svelte';
	import GachaInfo from './_gachainfo/index.svelte';
	import Phonograph from './_phonograph/index.svelte';
	import { wakeLock } from '$lib/helpers/wakelock';

	let status;
	let welcomeScreen = true;
	setContext('closeGreeting', () => (welcomeScreen = false));

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

	const onWarp = writable(false);
	setContext('onWarp', onWarp);

	const handleTrack = () => {
		window.addEventListener('blur', () => {
			const { sourceID } = $activeBacksound;
			if ($onWarp) return;
			if (!isPlaying(sourceID) || pageActive === 'phonograph') return;
			pauseTrack(sourceID, false);
		});

		window.addEventListener('focus', () => {
			const { sourceID } = $activeBacksound;
			if ($onWarp) return;
			if (isPlaying(sourceID) || pageActive === 'phonograph') return;
			resumeTrack(sourceID);
		});
	};

	onMount(() => {
		setBannerVersionAndPhase();
		importLocalConfig();

		// litemode
		if ($isMobile) handleLiteMode();
		wakeLock();

		// Detect Currencies
		userCurrencies.init();

		// Play track
		handleTrack();

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

{#if welcomeScreen}
	<Welcome />
{/if}
<PreloadExpress />
