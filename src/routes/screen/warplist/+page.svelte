<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	import { data as charDB } from '$lib/data/characters.json';
	import { data as lcDB } from '$lib/data/light-cones.json';
	import { decodeAndReadData } from '$lib/helpers/shareable-link';
	import WarpResult from '../../_warp/warp-result/WarpResult.svelte';

	let list = [];
	const { url } = $page;

	const completeMissingData = (data) => {
		const mergeData = data.map((itemData) => {
			const { type, name } = itemData;
			const itemdb = type === 'character' ? charDB : lcDB;
			const complement = itemdb.find((v) => v.name === name);
			return { ...itemData, ...complement };
		});
		return mergeData;
	};

	const resolveData = () => {
		try {
			const itemData = url.searchParams.get('a');
			if (!itemData) throw new Error('no Data');
			const parsed = decodeAndReadData.multi(itemData);
			list = completeMissingData(parsed) || [];
		} catch (e) {
			console.error('something Wrong', e);
			goto('/');
		}
	};

	onMount(resolveData);
</script>

<section>
	{#if list.length > 1}
		<WarpResult {list} skip standalone />
	{/if}
</section>

<style>
	section {
		width: 100%;
		height: var(--screen-height);
	}
</style>
