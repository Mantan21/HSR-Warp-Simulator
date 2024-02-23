<script>
	import { getContext } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import { assets, oneiric, stellarJade } from '$lib/stores/app-store';
	import { cookie } from '$lib/helpers/dataAPI/api-cookie';
	import { localBalance } from '$lib/helpers/dataAPI/api-localstorage';
	import ButtonIcon from '$lib/components/ButtonIcon.svelte';

	export let data = { qty: 0, bonus: 0, price: '0' };

	const closeModal = getContext('closeModal');
	const confirmBuy = getContext('confirmBuy');
	const openObtained = getContext('openObtained');

	const payMethod = ['imaginary-money', 'tears', 'firefly-savings'];
	let autoConvert = cookie.get('autoconvert-oneiric');
	let activeMethod = cookie.get('payment-method') || 'firefly-savings';
	$: cookie.set('autoconvert-oneiric', autoConvert);

	const selectMethod = (method) => {
		if (method === activeMethod) return;
		activeMethod = method;
		cookie.set('payment-method', method);
		playSfx('click2');
	};

	const convertBuy = () => {
		stellarJade.update((v) => {
			const afterUpdate = v + data.qty + data.bonus;
			localBalance.set('stellarJade', afterUpdate);
			return afterUpdate;
		});
	};

	const handleBuy = () => {
		const item = autoConvert ? 'stellarJade' : 'oneiric';
		confirmBuy({ qty: data.qty, bonus: data.bonus, item });
		openObtained({ qty: data.qty + data.bonus, item });

		if (autoConvert) return convertBuy();
		oneiric.update((v) => {
			const afterUpdate = v + data.qty + data.bonus;
			localBalance.set('oneiric', afterUpdate);
			return afterUpdate;
		});
	};
</script>

<div class="modal" on:mousedown|self={closeModal} transition:fade={{ duration: 200 }}>
	<div class="container" transition:fly={{ y: 20, duration: 250 }}>
		<div class="header">
			<h1>{$t('shop.payment')}</h1>
			<div class="close">
				<ButtonIcon on:click={closeModal} icon="times" dark />
			</div>
		</div>
		<div class="modal-content">
			<div class="item">
				<div class="name">
					{$t('item.oneiric')} ×{data.qty}
					{#if data.bonus > 0}
						<small>+{data.bonus} {$t('shop.bonus')}</small>
					{/if}
				</div>
				<div class="price">{data.price}</div>
			</div>

			<caption>{$t('shop.selectMethod')}</caption>
			<div class="payment-method">
				{#each payMethod as method}
					<div class="method">
						<button on:click={() => selectMethod(method)} class:active={activeMethod === method}>
							<img src={$assets[`method-${method}.webp`]} alt={$t(`shop.method-${method}`)} />
							{$t(`shop.method-${method}`)}
						</button>
					</div>
				{/each}
			</div>

			<div class="autoConvert">
				<input
					type="checkbox"
					name="autoConvert"
					id="autoConvert"
					bind:checked={autoConvert}
					on:change={() => playSfx('click2')}
				/>
				<label for="autoConvert">
					<i>✔</i>
					{$t('shop.autoConvert')}
				</label>
			</div>

			<div class="paybutton">
				<button on:click={handleBuy}> {$t('shop.pay')} </button>
			</div>
		</div>
	</div>
</div>

<style>
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: var(--screen-height);
		background-color: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(10px);
		z-index: 500;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.container {
		max-width: 90%;
		width: 600px;
		position: relative;
		color: rgba(0, 0, 0, 0.75);
		background-color: #fff;
		border-radius: 0.5rem;
		z-index: 2;
		padding: 2%;
	}

	:global(.mobileLandscape) .container {
		min-width: 400px;
		width: 50%;
	}

	.header {
		position: relative;
		text-align: center;
	}
	.close {
		position: absolute;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
	}

	.modal-content {
		padding: 2% 2% 0;
		font-size: 110%;
	}

	.item {
		display: flex;
		width: 100%;
		justify-content: space-between;
		font-size: 130%;
		padding: 2% 0;
	}

	.name {
		opacity: 0.6;
	}
	.price {
		color: #de6422;
	}

	caption {
		display: block;
		width: 100%;
		padding: 2% 0;
		text-align: left;
	}

	.payment-method {
		width: 100%;
		display: flex;
	}
	.method {
		width: 33.33333%;
		flex-basis: 33.33333%;
		padding: 0 1% 2%;
	}

	.method button {
		border: 0.1rem solid #ccc;
		font-size: 85%;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
		padding: 5%;
		border-radius: 0.25rem;
		transition: 0.2s all;
		color: rgba(0, 0, 0, 0.6);
	}
	button.active {
		border-color: #00c3ff;
		box-shadow: 0 0 0.2rem #00c3ff;
		color: #000;
	}

	.method img {
		width: 20%;
	}

	/* Checkbox */
	.autoConvert {
		padding: 3% 2% 2%;
	}
	label {
		cursor: inherit;
	}
	.autoConvert input + label i {
		color: white;
		display: inline-block;
		padding: 0.1rem 0.2rem 0.1rem 0.1rem;
		margin-right: 0.5rem;
		line-height: 1rem;
		background-color: #fff;
		border: 1px solid #ccc;
		transition: all 0.2s;
	}
	.autoConvert input:checked + label i {
		background-color: #00c3ff;
	}

	.autoConvert:hover input + label i {
		border: 1px solid #00c3ff;
		box-shadow: rgba(106, 168, 230, 0.6) 0 0 0.2rem;
	}

	.autoConvert input {
		display: none;
	}

	.paybutton {
		width: 100%;
		text-align: center;
		padding: 3% 0 1%;
	}

	.paybutton button {
		background-color: #00c3ff;
		padding: 2% 5%;
		color: #fff;
		font-size: 110%;
	}
</style>
