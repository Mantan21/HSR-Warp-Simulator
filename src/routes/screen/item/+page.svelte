<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { t } from 'svelte-i18n';

	import { APP_TITLE } from '$lib/data/site-setup.json';
	import { data as charDB } from '$lib/data/characters.json';
	import { data as lcDB } from '$lib/data/light-cones.json';
	import { decodeAndReadData } from '$lib/helpers/shareable-link';

	import WarpResult from '../../_warp/warp-result/WarpResult.svelte';

	let list = [];
	let itemName = '';
	const { url } = $page;

	const completeMissingData = (data) => {
		const { name, type } = data;
		itemName = name;
		const itemdb = type === 'character' ? charDB : lcDB;
		const complement = itemdb.find((v) => v.name === name);
		return { ...data, ...complement };
	};

	const resolveData = () => {
		try {
			const itemData = url.searchParams.get('a');
			if (!itemData) throw new Error('no Data');
			const parsed = decodeAndReadData.single(itemData);
			const data = completeMissingData(parsed);
			list = [data];
		} catch (e) {
			console.error('something Wrong');
			goto('/');
		}
	};

	onMount(resolveData);
</script>

<svelte:head>
	<title>
		{$t(itemName)} | {APP_TITLE}
	</title>

	<meta name="title" content={APP_TITLE} />
	<meta property="og:title" content={APP_TITLE} />
	<meta property="twitter:title" content={APP_TITLE} />
</svelte:head>

<section>
	{#if list.length > 0}
		<WarpResult {list} skip standalone />
	{/if}
</section>

<style>
	section {
		width: 100%;
		height: var(--screen-height);
	}
</style>
