<script>
	import { onMount } from 'svelte';
	import { starter } from '$lib/data/banners/starter.json';
	import { regular } from '$lib/data/banners/regular.json';
	import { checkStarterBanner, setBannerVersionAndPhase } from '$lib/helpers/readLocalData';
	import { activePhase, activeVersion, bannerList, showStarterBanner } from '$lib/stores/app-store';
	import Banners from './_banners/index.svelte';

	let pageActive = 'index';

	const switchBanner = async (version, phase) => {
		if (!version || !phase) return;
		const list = checkStarterBanner() ? [{ type: 'starter', item: starter.characters }] : [];
		const { data } = await import(`../lib/data/banners/events/${version}.json`);
		const { character, lightcone, regularVersion } = data.find((d) => d.phase === phase).banners;
		const regularChar = regular.find(({ version }) => version === regularVersion)?.characters;

		list.push({ type: 'character', item: character });
		list.push({ type: 'lightcone', item: lightcone });
		list.push({ type: 'regular', item: regularChar });

		bannerList.set(list);
	};

	const handleShhowStarter = (show) => {
		if ($bannerList.length < 2) return;
		if (!show) {
			return bannerList.update((bn) => {
				return bn.filter(({ type }) => type !== 'starter');
			});
		}
		return bannerList.update((bn) => {
			bn.unshift({ type: 'starter', item: starter.characters });
			return bn;
		});
	};

	$: switchBanner($activeVersion, $activePhase);
	$: handleShhowStarter($showStarterBanner);

	onMount(() => {
		setBannerVersionAndPhase();
	});
</script>

{#if pageActive === 'index'}
	<Banners />
{/if}
