<script>
	import { getContext, onMount, setContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { playSfx } from '$lib/helpers/audio';
	import { assets, oneiric, stellarJade } from '$lib/stores/app-store';
	import ButtonIcon from '$lib/components/ButtonIcon.svelte';
	import Header from '$lib/components/Header.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import MyFund from '$lib/components/MyFund.svelte';
	import Oneiric from './Oneiric.svelte';
	import Embers from './Embers.svelte';
	import Aside from './_aside.svelte';

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

	onMount(() => {
		const x = setTimeout(() => {
			playSfx('shop-open');
			clearTimeout(x);
		}, 150);
	});

	// Modal
	let showModal = false;
	const closeModal = () => {
		playSfx('modal-close');
		showModal = false;
	};
	setContext('closeModal', closeModal);

	const openModal = () => {
		showModal = true;
	};
	setContext('openModal', openModal);
</script>

{#if showModal}
	<Modal title="Star Rail Special Pass" exchange on:cancel={closeModal}>
		<div class="picture" slot="picture">image</div>

		<div class="modal-content">iki kontent</div>
	</Modal>
{/if}

<section in:fade={{ duration: 250 }}>
	<img class="bg" src={$assets[`bg${random(1, 10)}.webp`]} alt="background" />

	<div class="container" in:fade={{ duration: 500 }}>
		<Header h1="Store" h2={$t(`shop.${activeShop}`)} icon="shop" relative>
			<MyFund type="oneiric">{$oneiric}</MyFund>
			<MyFund type="stellarjade" plusbutton>{$stellarJade}</MyFund>
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
					<Embers />
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
