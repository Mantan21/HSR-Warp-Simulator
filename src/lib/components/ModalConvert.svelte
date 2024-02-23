<script>
	import { getContext, setContext } from 'svelte';
	import { fly } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { oneiric, stellarJade } from '$lib/stores/app-store';
	import { localBalance } from '$lib/helpers/dataAPI/api-localstorage';
	import { playSfx } from '$lib/helpers/sounds/audiofx';

	import Icon from './Icon.svelte';
	import Modal from './Modal.svelte';
	import Range from './Range.svelte';
	import MyFund from './MyFund.svelte';

	let value = 1;
	$: value = value > $oneiric ? $oneiric : parseInt(value);
	setContext('setValue', (val) => (value = val));

	const openObtained = getContext('openObtained');
	const closeConvertModal = getContext('closeConvertModal');
	const cancelModal = () => {
		closeConvertModal();
		playSfx('modal-close');
	};
	setContext('closeModal', cancelModal);

	const confirmConvert = () => {
		stellarJade.update((v) => {
			const newVal = v + value;
			localBalance.set('stellarJade', newVal);
			return newVal;
		});

		oneiric.update((v) => {
			const newVal = v - value;
			localBalance.set('oneiric', newVal);
			return newVal;
		});

		playSfx();
		closeConvertModal();
		openObtained({ qty: value });
	};
</script>

<div class="top" transition:fly={{ y: -10, duration: 250 }}>
	<MyFund type="oneiric">
		{$oneiric}
	</MyFund>

	<MyFund type="stellarJade">{$stellarJade}</MyFund>
</div>

<Modal
	title={$t('shop.stellarReedem')}
	disabled={isNaN(value) || value < 1}
	on:cancel={cancelModal}
	on:confirm={confirmConvert}
>
	<div class="modal-content">
		<div class="caption">
			{$t('shop.oneiricConvert')}
		</div>
		<div class="row">
			<div class="oneiric item">
				<div class="icon">
					<Icon type="oneiric" />
				</div>
			</div>
			<div class="divider">
				<i class="hsr-arrow-right" />
			</div>
			<div class="stellarJade item">
				<div class="icon">
					<Icon type="stellarJade" />
				</div>
			</div>
		</div>
		<div class="amount">
			<span>{$t('shop.amount')}:</span>
			<input type="number" bind:value disabled={$oneiric < 1} />
		</div>
		<div class="range">
			<Range
				max={$oneiric || 1}
				min={$oneiric < 2 ? 0 : 1}
				value={$oneiric < 1 ? 1 : value}
				disabled={$oneiric < 1}
				controller
			/>
		</div>
	</div>
</Modal>

<style>
	.modal-content {
		width: 100%;
	}
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

	.row,
	.amount {
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		padding: 4% 0 0;
	}

	.amount {
		justify-content: center;
	}

	.item {
		flex-basis: 15%;
		width: 15%;
	}

	.divider {
		font-size: 150%;
		opacity: 0.8;
	}

	.icon {
		width: 100%;
		aspect-ratio: 1/1;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		background-image: linear-gradient(#a7785e, #cda46e);
		border-top-right-radius: 25%;
	}

	.icon :global(img) {
		width: 85%;
	}

	.icon::after {
		content: '1';
		width: 100%;
		background-color: rgba(0, 0, 0, 0.4);
		color: #fff;
		position: absolute;
		bottom: 0;
		left: 0;
		text-align: center;
	}

	.amount span {
		opacity: 0.65;
		padding-right: 2%;
	}

	.amount input {
		outline: 0;
		border: 0.15rem solid #b7b5b6;
		border-radius: 2rem;
		height: 2.2rem;
		width: 40%;
		background-color: #cccacb;
		color: #000;
		padding: 1% 2%;
	}

	.range {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 4% 2% 0;
	}
</style>
