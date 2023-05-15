<script>
	import { onMount, setContext } from 'svelte';
	import { activePhase, activeVersion, showStarterBanner } from '$lib/stores/app-store';
	import { importLocalBalance, setBannerVersionAndPhase } from '$lib/helpers/readLocalData';
	import { browserState } from '$lib/helpers/page-navigation';
	import { handleShowStarter, initializeBanner } from '$lib/helpers/banner-loader';

	import Banners from './_banners/index.svelte';
	import Menu from './_menu/index.svelte';
	import Collection from './_collection/index.svelte';
	import LoginPage from './_login/index.svelte';
	import AllBanner from './_allbanner/index.svelte';

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

	$: initializeBanner($activeVersion, $activePhase);
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
</script>

{#if !loggedIn}
	<LoginPage />
{:else}
	{#if pageActive === 'index'}
		<Banners />
		<Menu />
	{/if}

	{#if pageActive === 'collection'}
		<Collection />
	{/if}

	{#if pageActive === 'allbanner'}
		<AllBanner />
	{/if}
{/if}
