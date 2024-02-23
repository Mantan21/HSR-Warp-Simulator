<script>
	import { getContext, onMount, setContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { fade } from '$lib/helpers/transition';
	import { assets } from '$lib/stores/app-store';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import { cookie } from '$lib/helpers/dataAPI/api-cookie';
	import Header from '$lib/components/Header.svelte';
	import ButtonIcon from '$lib/components/ButtonIcon.svelte';
	import Aside from './_aside.svelte';
	import Footer from './_footer.svelte';
	import CollectionList from './_collection-list.svelte';
	import CollectionDetails from './_collection-details.svelte';

	let footerHeight;
	let showAll = cookie.get('showAllCollection');
	$: cookie.set('showAllCollection', showAll);

	let itemQty = { owned: 0, all: 0 };
	setContext('setItemQty', (obj) => (itemQty = obj));

	const navigate = getContext('navigate');
	const closeCollection = () => {
		playSfx('collection-close');
		navigate('index');
	};

	let itemtype = cookie.get('collectionType') || 'character';

	const showItem = (type) => {
		if (itemtype === type) return;
		playSfx();
		itemtype = type;
		cookie.set('collectionType', type);
	};
	setContext('showItem', showItem);

	let activePath = 'all';
	const selectPath = (path) => {
		if (path === activePath) return;
		playSfx('sidebar-click');
		activePath = path;
	};
	setContext('selectPath', selectPath);

	onMount(() => {
		playSfx('collection-open');
	});

	// Show Detail Handle
	let detailItem = {};
	let isDetailOpen = false;
	const openDetails = (detail) => {
		playSfx('click2');
		detailItem = detail;
		isDetailOpen = true;
	};
	setContext('openDetails', openDetails);

	const closeDetail = () => {
		playSfx('warpresult-close');
		isDetailOpen = false;
	};
	setContext('closeDetail', closeDetail);
</script>

<svelte:head>
	<title>
		{$t('collection.heading')} | {$t('title')}
	</title>
</svelte:head>

<section
	class="collection"
	style="--bg: url('{$assets['archive-bg.webp']}')"
	transition:fade={{ duration: 250 }}
>
	<Header icon="archive" h1={$t('collection.heading')} h2={$t(itemtype)} relative>
		<div class="showAll">
			<input
				type="checkbox"
				name="showAll"
				id="showAll"
				bind:checked={showAll}
				on:change={() => playSfx()}
			/>
			<label for="showAll">
				<i>✔</i>
				{$t('collection.showAll', { values: { itemtype: $t(itemtype) } })}
				<span> {itemQty.owned}/{itemQty.all}</span>
			</label>
		</div>
		<div class="back">
			<ButtonIcon icon="back" on:click={closeCollection} />
		</div>
	</Header>

	<div class="container padding" style="--footHeight:{footerHeight}px">
		<Aside {activePath} />
		<div class="list">
			<CollectionList {itemtype} {showAll} path={activePath} />
		</div>
	</div>
	<div class="footer padding" bind:clientHeight={footerHeight}>
		<Footer {itemtype} />
	</div>
</section>

{#if isDetailOpen}
	<CollectionDetails {...detailItem} />
{/if}

<style>
	section {
		width: 100%;
		height: 100%;
		background-image: var(--bg);
		background-size: cover;
		background-position: center center;
		position: relative;
		display: flex;
		flex-direction: column;
	}

	.showAll span {
		color: var(--color-second);
	}

	.showAll {
		font-size: 130%;
		text-transform: capitalize;
	}
	label {
		cursor: inherit;
	}
	.showAll input + label i {
		color: white;
		display: inline-block;
		padding: 0.1rem 0.2rem 0.1rem 0.1rem;
		line-height: 1rem;
		background-color: #fff;
		border: 1px solid transparent;
		transition: all 0.2s;
	}
	.showAll input:checked + label i {
		background-color: #06bbff;
	}

	.showAll:hover input + label i {
		border: 1px solid #06bbff;
		box-shadow: rgba(106, 168, 230, 0.6) 0px 0px 7px 5px;
	}

	.showAll input {
		display: none;
	}

	/*  */
	.padding {
		padding: 1% 2% 0;
	}
	:global(.mobileLandscape) .padding {
		padding: 0 5%;
	}

	.container {
		height: calc(var(--screen-height) - var(--footHeight) - 70px);
		width: 100%;
		display: flex;
	}

	:global(.mobileLandscape) .container {
		height: calc(var(--screen-height) - var(--footHeight) - 40px);
	}

	.list {
		width: 100%;
		height: calc(inherit - 20px);
	}
	.footer {
		margin-top: 10;
		padding-top: 0;
		border-top: 1px solid rgba(255, 255, 255, 0.2);
	}

	@media screen and (max-width: 900px) {
		:global(main):not(.mobileLandscape) .footer {
			padding: 5px 0 10px;
		}
	}
</style>
