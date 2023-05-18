<script>
	import { getContext, onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { t } from 'svelte-i18n';
	import { OverlayScrollbarsComponent as Scrollable } from 'overlayscrollbars-svelte';

	import { fade } from '$lib/helpers/transition';
	import { isMobileLandscape } from '$lib/stores/app-store';
	import IDBManager from '$lib/stores/idbManager';
	import { data as charDB } from '$lib/data/characters.json';
	import { data as lcDB } from '$lib/data/light-cones.json';
	import CollectionItem from './_collection-item.svelte';

	export let itemtype = 'character';
	export let showAll = false;
	export let path = 'all';

	// Data Processor
	let lightcones = [];
	let characters = [];
	let dataToShow = [];
	let loadedData = [];
	let isLoaded = false;

	const setItemQty = getContext('setItemQty');
	const { getAllHistories } = IDBManager;

	const getAll = async () => {
		const data = await getAllHistories();
		const groupByName = data.reduce((prev, current) => {
			const obj = prev || {};
			obj[current.name] = obj[current.name] || [];
			obj[current.name].push(current);
			return obj;
		}, {});

		const filtered = Object.values(groupByName)
			.map((val) => {
				const { name, path, rarity, type } = val[0];
				return { name, path, rarity, type };
			})
			.map((v) => {
				v.qty = groupByName[v.name].length;
				return v;
			});

		lightcones = filtered.filter(({ type }) => type === 'lightcone');
		characters = filtered.filter(({ type }) => type === 'character');
		isLoaded = true;
		proccessData(itemtype);
	};

	const filterByPath = (arr, path) => arr.filter((v) => path === 'all' || v.path === path);
	const showHandle = (showAll, path) => {
		if (!isLoaded) return;
		if (showAll) return (dataToShow = filterByPath(loadedData, path));
		const data = [...loadedData].filter(({ isOwned }) => isOwned);
		dataToShow = filterByPath(data, path);
	};

	const proccessData = (itemtype) => {
		if (!isLoaded) return;
		const dataFromIDB = itemtype === 'character' ? characters : lightcones;
		const allData = itemtype === 'character' ? charDB : lcDB;
		loadedData = allData
			.map(({ name, path, rarity, combat_type }) => {
				const idbData = dataFromIDB.find((v) => name === v.name);
				const qty = idbData?.qty || 0;
				return { name, path, rarity, combat_type, qty, isOwned: qty > 0 };
			})
			.sort((a, b) => b.rarity - a.rarity);
		setItemQty({ owned: dataFromIDB.length, all: allData.length });
		showHandle(showAll, path);
		return;
	};

	$: proccessData(itemtype);
	$: showHandle(showAll, path);
	onMount(getAll);

	// Layouting
	let containerWidth;
	let itemWidth = 100 / 3;

	const setItemWidth = (cwidth, mbl) => {
		if (cwidth >= 900 || mbl) {
			itemWidth = 100 / 6;
			return;
		}
		if (cwidth >= 650) {
			itemWidth = 100 / 5;
			return;
		}
		if (cwidth >= 500) {
			itemWidth = 100 / 4;
			return;
		}
		if (cwidth >= 350) {
			itemWidth = 100 / 3;
			return;
		}
		itemWidth = 100 / 2;
		return;
	};

	$: setItemWidth(containerWidth, $isMobileLandscape);
</script>

<div class="collection" bind:clientWidth={containerWidth}>
	{#if !isLoaded}
		<div class="load" in:fade|local={{ duration: 250 }}>
			<span>{$t('loading')}...</span>
		</div>
	{:else if dataToShow.length < 1}
		<div class="load" in:fade|local={{ duration: 250 }}>
			<span>{$t('nodata')}</span>
		</div>
	{:else}
		<Scrollable options={{ scrollbars: { theme: 'os-theme-light' } }}>
			<div class="list" style="--itemWidth: {itemWidth}%">
				{#each dataToShow as { rarity, name, path, combat_type, isOwned, qty }, i (name)}
					<div
						class="item"
						in:fade|local={{ duration: 350, delay: i * 25 }}
						animate:flip={{ duration: (i) => 25 * Math.sqrt(i) }}
					>
						<CollectionItem {rarity} {name} {path} {isOwned} combatType={combat_type} {qty} />
					</div>
				{/each}
			</div>
		</Scrollable>
	{/if}
</div>

<style>
	.collection {
		width: 100%;
		height: 100%;
		mask-image: linear-gradient(black 95%, transparent);
	}

	.list {
		display: flex;
		flex-wrap: wrap;
		padding: 0 2%;
	}

	.item {
		flex-basis: var(--itemWidth);
		width: var(--itemWidth);
		padding: 0.8%;
		padding-bottom: 2.5%;
	}

	@media screen and (min-width: 1440px) {
		.item {
			--itemWidth: 190px;
			flex-basis: unset;
			width: 190px;
		}
	}

	.load {
		width: 100%;
		height: 80%;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: larger;
	}

	.load span {
		font-size: 3vh;
	}
</style>
