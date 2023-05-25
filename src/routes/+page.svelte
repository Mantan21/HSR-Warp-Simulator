<script>
	import { onMount, setContext } from 'svelte';
	import { activePhase, activeVersion, showStarterBanner } from '$lib/stores/app-store';
	import { importLocalBalance, setBannerVersionAndPhase } from '$lib/helpers/readLocalData';
	import { browserState } from '$lib/helpers/page-navigation';
	import { handleShowStarter, initializeBanner } from '$lib/helpers/banner-loader';

	import ModalConvert from '$lib/components/ModalConvert.svelte';
	import LoginPage from './_login/index.svelte';
	import AllBanner from './_allbanner/index.svelte';
	import Banners from './_banners/index.svelte';
	import Menu from './_menu/index.svelte';
	import Collection from './_collection/index.svelte';
	import Shop from './_shop/index.svelte';
	import GachaInfo from './_gachainfo/index.svelte';
	import ObtainedItem from '$lib/components/ObtainedItem.svelte';
	import { playSfx } from '$lib/helpers/audio';

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

	onMount(() => {
		setBannerVersionAndPhase();
		importLocalBalance();
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
	{/if}

	{#if pageActive === 'allbanner'}
		<AllBanner />
	{/if}

	{#if pageActive === 'collection'}
		<Collection />
	{/if}

	{#if pageActive === 'shop'}
		<Shop />
	{/if}

	{#if pageActive === 'details'}
		<GachaInfo />
	{/if}
{/if}
