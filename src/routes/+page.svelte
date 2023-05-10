<script>
	import { onMount, setContext } from 'svelte';
	import { activePhase, activeVersion, showStarterBanner } from '$lib/stores/app-store';
	import { setBannerVersionAndPhase } from '$lib/helpers/readLocalData';
	import { browserState } from '$lib/helpers/page-navigation';
	import { handleShowStarter, initializeBanner } from '$lib/helpers/banner-loader';
	import Banners from './_banners/index.svelte';
	import Menu from './_menu/index.svelte';
	import Collection from './_collection/index.svelte';

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
		window.addEventListener('popstate', (e) => {
			if (e.state.page) return;
			if (pageActive === 'index') return;
			navigate('index');
		});
	});
</script>

{#if pageActive === 'index'}
	<Banners />
	<Menu />
{/if}

{#if pageActive === 'collection'}
	<Collection />
{/if}
