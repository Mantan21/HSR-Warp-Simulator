<script>
	import { getContext, setContext } from 'svelte';
	import { fly } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { localBalance } from '$lib/helpers/dataAPI/api-localstorage';
	import { embers, regularPass, specialPass, starlight, stellarJade } from '$lib/stores/app-store';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import Modal from '$lib/components/Modal.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import Range from '$lib/components/Range.svelte';
	import MyFund from '$lib/components/MyFund.svelte';

	export let data = {};
	const { itemToExchange, currency, price } = data;

	const openObtained = getContext('openObtained');
	const closeExchangeModal = getContext('closeExchageModal');
	const closeModal = () => {
		playSfx('modal-close');
		closeExchangeModal();
	};
	setContext('closeModal', closeModal);

	let value = 1;

	const pass = itemToExchange === 'specialPass' ? specialPass : regularPass;
	const useUndying = currency === 'starlight' ? starlight : embers;
	const balance = currency === 'stellarJade' ? stellarJade : useUndying;
	const max = ($balance - ($balance % price)) / price;

	const setValue = (val) => (value = val);
	setContext('setValue', setValue);

	const confirmConvert = () => {
		playSfx();
		closeExchangeModal();
		balance.update((v) => {
			const newVal = v - value * price;
			localBalance.set(currency, newVal);
			return newVal;
		});

		pass.update((v) => {
			const newVal = v + value;
			localBalance.set(itemToExchange, newVal);
			return newVal;
		});

		openObtained({ qty: value, item: itemToExchange });
	};
</script>

<div class="top" transition:fly={{ y: -10, duration: 250 }}>
	<MyFund type={currency}>
		{$balance}
	</MyFund>
</div>

<Modal
	title={$t(`item.${itemToExchange}`)}
	exchange
	on:cancel={closeModal}
	on:confirm={confirmConvert}
	disabled={max < 1}
>
	<picture class="picture" slot="picture">
		<Icon type={itemToExchange} />
	</picture>

	<div class="modal-content">
		<div class="description">
			<p>{@html $t(`item.${itemToExchange}Story`)}</p>
		</div>
		<div class="range">
			<div class="amount">{$t('shop.amount')}: {value}</div>
			<Range {value} min={1} max={max || 1} disabled={max < 1} controller />
			<div class="price">
				<Icon type={currency} /> <span> {price * value} </span>
			</div>
		</div>
	</div>
</Modal>

<style>
	.top {
		width: 100%;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 550;
		display: flex;
		justify-content: flex-end;
		padding: 5vh 5% 0;
	}

	:global(.mobileLandscape) .top {
		padding: 1.5vh 5%;
	}

	.modal-content {
		width: 100%;
		height: 160px;
		padding: 1% 0 0;
		display: flex;
		flex-direction: column;
	}

	@media screen and (max-width: 640px) {
		.modal-content {
			height: 100px;
		}
	}

	:global(.mobileLandscape) .modal-content {
		height: calc(0.27 * var(--screen-height));
	}

	.description {
		height: 100%;
		width: 100%;
		overflow: auto;
		opacity: 0.6;
		mask-image: linear-gradient(black 90%, transparent 98%);
	}
	.range {
		width: 100%;
		padding: 3% 0 4%;
		position: relative;
	}

	.amount,
	.price {
		position: absolute;
		left: 50%;
	}
	.amount {
		top: 0;
		transform: translate(-50%, -10%);
		opacity: 0.5;
	}

	.price {
		bottom: 0;
		transform: translate(-50%, 10%);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.price :global(img) {
		width: 15%;
	}
</style>
