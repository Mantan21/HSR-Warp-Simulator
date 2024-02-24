<script>
	import { getContext, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { t } from 'svelte-i18n';
	import { isMobile, isMobileLandscape, liteMode } from '$lib/stores/app-store';
	import { cookie } from '$lib/helpers/dataAPI/api-cookie';
	import { owneditem } from '$lib/helpers/dataAPI/api-localstorage';
	import { data as charDB } from '$lib/data/characters.json';
	import { data as lcDB } from '$lib/data/light-cones.json';

	import CollectionItem from './_collection-item.svelte';
	import Scrollable from '$lib/components/Scrollable.svelte';

	export let itemtype = 'character';
	export let showAll = false;
	export let path = 'all';

	// Data Processor
	let lightcones = [];
	let characters = [];
	let dataToShow = [];
	let loadedData = [];
	let isLoaded = false;
	const itemQty = { lightcone: 0, character: 0 };

	const setItemQty = getContext('setItemQty');
	const ownedItems = owneditem.getAll();

	const filterByPath = (arr, path) => {
		if (path === 'all') return arr;
		return arr.filter((v) => v.path === path);
	};

	const showHandle = (showAll, path) => {
		if (!isLoaded) return;
		if (showAll) return (dataToShow = filterByPath(loadedData, path));
		const data = [...loadedData].filter(({ isOwned }) => isOwned);
		dataToShow = filterByPath(data, path);
	};

	const loadItems = (type) => {
		const showHidden = cookie.get('showHiddenBanner');
		const isChar = type === 'character';
		const data = isChar ? charDB : lcDB;
		const result = data
			.filter(({ pro }) => showHidden || !pro)
			.map(({ name, itemID, path, rarity, combat_type }) => {
				const { warp = 0, manual = 0 } = ownedItems[itemID] || {};
				const qty = warp + manual;
				itemQty[type] = qty > 0 ? itemQty[type] + 1 : itemQty[type];
				return { name, path, rarity, combat_type, qty, isOwned: qty > 0 };
			});
		const sorted = result.sort((a, b) => b.rarity - a.rarity);
		return sorted;
	};

	const getAll = () => {
		characters = loadItems('character');
		lightcones = loadItems('lightcone');
		isLoaded = true;
		proccessData(itemtype);
	};

	const proccessData = (itemtype) => {
		if (!isLoaded) return;
		loadedData = itemtype === 'character' ? characters : lightcones;
		setItemQty({ owned: itemQty[itemtype], all: loadedData.length });
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
		<div class="load" in:fade={{ duration: 250 }}>
			<span>{$t('loading')}...</span>
		</div>
	{:else if dataToShow.length < 1}
		<div class="load" in:fade={{ duration: 250 }}>
			<span>{$t('nodata')}</span>
		</div>
	{:else}
		<Scrollable>
			<div class="list" style="--itemWidth: {itemWidth}%">
				{#if $liteMode || $isMobile}
					{#each dataToShow as { rarity, name, path, combat_type, isOwned, qty }}
						{#key name}
							<div class="item">
								<CollectionItem {rarity} {name} {path} {isOwned} combatType={combat_type} {qty} />
							</div>
						{/key}
					{/each}
				{:else}
					{#each dataToShow as { rarity, name, path, combat_type, isOwned, qty }, i (name)}
						<div
							class="item"
							in:fade={{ duration: 350, delay: i * 25 }}
							animate:flip={{ duration: (i) => 25 * Math.sqrt(i) }}
						>
							<CollectionItem {rarity} {name} {path} {isOwned} combatType={combat_type} {qty} />
						</div>
					{/each}
				{/if}
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
		padding: 0 1.5%;
	}

	.item {
		flex-basis: var(--itemWidth);
		width: var(--itemWidth);
		padding: 0.65%;
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
