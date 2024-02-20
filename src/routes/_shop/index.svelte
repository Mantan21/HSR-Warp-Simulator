<script>
	import { getContext, onMount, setContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import { assets, embers, oneiric, starlight, stellarJade } from '$lib/stores/app-store';

	import ButtonIcon from '$lib/components/ButtonIcon.svelte';
	import Header from '$lib/components/Header.svelte';
	import MyFund from '$lib/components/MyFund.svelte';
	import Aside from './_aside.svelte';
	import ExchangeModal from './_exchange-modal.svelte';
	import Oneiric from './Oneiric.svelte';
	import ExchangeItem from './ExchangeItem.svelte';
	import Donate from './Donate.svelte';

	const random = (min, max) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	const navigate = getContext('navigate');
	const back = () => {
		playSfx('close');
		navigate('index');
	};

	let activeShop = 'oneiricPouch';
	let isOpen = false;
	const toggle = () => (isOpen = !isOpen);
	setContext('navlinkToggle', toggle);

	const selectShop = (selected) => {
		if (selected === activeShop) return;
		activeShop = selected;
		isOpen = false;
		playSfx('sidebar-click');
	};
	setContext('selectShop', selectShop);

	onMount(() => playSfx('shop-open'));

	// Modal
	let showModal = false;
	let exchangeData = {};

	setContext('closeExchageModal', () => (showModal = false));
	const openModal = (data) => {
		exchangeData = data;
		showModal = true;
	};
	setContext('openExchangeModal', openModal);
</script>

<svelte:head>
	<title>{$t(`shop.${activeShop}`)} | {$t('title')}</title>
</svelte:head>

{#if showModal}
	<ExchangeModal data={exchangeData} />
{/if}

<section in:fade={{ duration: 250 }}>
	<img class="bg" src={$assets[`bg${random(1, 14)}.webp`]} alt="background" />

	<div class="container" in:fade={{ duration: 500 }}>
		<Header h1="Store" h2={$t(`shop.${activeShop}`)} icon="shop" relative>
			{#if activeShop === 'oneiricPouch'}
				<MyFund type="oneiric">{$oneiric}</MyFund>
			{/if}

			{#if ['stellarTrade', 'oneiricPouch'].includes(activeShop)}
				<MyFund type="stellarJade" plusbutton>{$stellarJade}</MyFund>
			{/if}

			{#if activeShop === 'embers'}
				<MyFund type="embers">{$embers}</MyFund>
			{/if}

			{#if activeShop === 'starlight'}
				<MyFund type="starlight">{$starlight}</MyFund>
			{/if}

			<div class="close">
				<ButtonIcon on:click={back} />
			</div>
		</Header>

		<div class="shop-content">
			<Aside {activeShop} {isOpen} />

			<div class="shop-group">
				{#if activeShop === 'oneiricPouch'}
					<Oneiric />
				{/if}

				{#if activeShop === 'embers'}
					<ExchangeItem item="embers" />
				{/if}

				{#if activeShop === 'starlight'}
					<ExchangeItem item="starlight" />
				{/if}

				{#if activeShop === 'stellarTrade'}
					<ExchangeItem item="stellarJade" />
				{/if}

				{#if activeShop === 'donate'}
					<Donate />
				{/if}
			</div>
		</div>
	</div>
</section>

<style>
	section {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.bg {
		width: 100vw;
		height: 100%;
		object-fit: cover;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(1.1);
		filter: blur(10px) brightness(0.8);
	}

	.container {
		height: 100%;
		width: 100%;
		position: relative;
		z-index: +1;
	}

	.shop-content {
		padding: 1% 2% 0;
		width: 100%;
		height: 88%;
		display: flex;
	}

	:global(.mobileLandscape) .shop-content {
		padding: 0 5%;
	}

	.shop-group {
		width: 100%;
		height: 100%;
	}

	@media screen and (max-width: 674px) {
		.shop-content {
			padding-top: 5%;
		}
	}
</style>
