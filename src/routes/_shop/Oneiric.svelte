<script>
	import { setContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { activeVersion, assets, priceList } from '$lib/stores/app-store';
	import { oneiricBonus } from '$lib/data/pricelist.json';
	import { cookie } from '$lib/helpers/dataAPI/api-cookie';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import { localConfig } from '$lib/helpers/dataAPI/api-localstorage';

	import Icon from '$lib/components/Icon.svelte';
	import ShopGroupItem from './_shop-group-item.svelte';
	import ShopGroup from './_shop-group.svelte';
	import OneiricPaymentModal from './_oneiric-payment-modal.svelte';

	let optionHeight;
	const checkCookie = cookie.get('initialTopup');
	let initialTopup = checkCookie === undefined ? true : checkCookie;
	$: cookie.set('initialTopup', initialTopup);

	// Listing Oneiric prices
	const { versionReset, topupBonus } = oneiricBonus;
	const localTopup = localConfig.get('topupBonus') || {};
	const filterVersion = (arr) => {
		return arr.filter((v) => v <= parseFloat($activeVersion)).sort((a, b) => b - a)[0] || 0;
	};
	const defaultVersionBase = filterVersion(versionReset);
	const localVersionBase = filterVersion(Object.keys(localTopup));
	const versionBase = defaultVersionBase > localVersionBase ? defaultVersionBase : localVersionBase;

	const oneiricList = [];
	const oneiric = $priceList.oneiric;
	Object.keys(oneiric).forEach((key) => {
		const list = Array.isArray(localTopup[versionBase]) ? localTopup[versionBase] : [];
		const doubleBonus = !list.includes(parseFloat(key));
		const item = { qty: parseInt(key), price: oneiric[key], doubleBonus };
		oneiricList.push(item);
	});

	let showPayment = false;
	let data = {};
	const selectItem = ({ qty, isDoubleBonus, price }) => {
		playSfx('shop-item-select');
		showPayment = true;
		data = { qty, bonus: isDoubleBonus && initialTopup ? qty : topupBonus[qty] || 0, price };
	};

	const closePaymentModal = () => {
		playSfx('modal-close');
		showPayment = false;
	};
	setContext('closeModal', closePaymentModal);

	const confirmBuy = ({ qty, bonus }) => {
		showPayment = false;
		playSfx();

		if (qty === bonus) {
			localTopup[versionBase] = localTopup[versionBase] || [];
			if (!localTopup[versionBase].includes(qty)) localTopup[versionBase].push(qty);
			localConfig.set('topupBonus', localTopup);
			const i = oneiricList.findIndex((v) => v.qty === qty);
			oneiricList[i].doubleBonus = false;
		}
	};
	setContext('confirmBuy', confirmBuy);
</script>

{#if showPayment}
	<OneiricPaymentModal {data} />
{/if}

<div class="oneiric-section" in:fade={{ duration: 250 }}>
	<div class="content-group" style="--option-height:{optionHeight}px">
		<ShopGroup>
			{#each oneiricList as { qty, price, doubleBonus }, i}
				<ShopGroupItem>
					<button
						class="oneiric-item"
						in:fade={{ duration: 250, delay: Math.sqrt(i * 5000) }}
						on:click={() => selectItem({ qty, price, isDoubleBonus: doubleBonus })}
					>
						<div class="item-pic">
							<picture>
								<img src={$assets[`oneiric-${qty}.webp`]} alt="oneiric" />
							</picture>

							{#if initialTopup && doubleBonus}
								<div class="bonus initial">
									<Icon type="oneiric" />
									{$t('shop.bonus')} +{qty}
								</div>
							{:else if qty !== 60}
								<div class="bonus">
									<Icon type="oneiric" />
									{$t('shop.bonus')} +{topupBonus[qty]}
								</div>
							{/if}
							<span>{$t('item.oneiric')} ×{qty}</span>
						</div>
						<div class="price">
							<span> {price} </span>
						</div>
					</button>
				</ShopGroupItem>
			{/each}
		</ShopGroup>
	</div>
	<div class="initial-topup" bind:clientHeight={optionHeight}>
		<div class="checkbox">
			<input
				type="checkbox"
				name="keep"
				id="keepsetting"
				bind:checked={initialTopup}
				on:change={() => playSfx('click2')}
			/>
			<span
				on:mousedown={() => {
					playSfx('click2');
					initialTopup = !initialTopup;
				}}
			/>
		</div>
		<label for="keepsetting"> {$t('shop.initialTopup')} </label>
	</div>
</div>

<style>
	.oneiric-section {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
	}

	.content-group {
		height: calc(var(--screen-height) - var(--option-height) - 75px);
		width: 100%;
	}

	:global(.mobileLandscape) .content-group {
		height: calc(var(--screen-height) - var(--option-height) - 35px);
	}

	.oneiric-item {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		text-align: center;
	}
	img {
		width: 100%;
	}

	picture {
		display: block;
		width: 100%;
		aspect-ratio: 1/1;
		overflow: hidden;
		mask-image: linear-gradient(black 50%, transparent 85%);
		transform: translateY(7.5%);
	}

	.item-pic {
		height: 100%;
		border-top-right-radius: 1.5rem;
		width: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		background-image: linear-gradient(to top, #c9b6e6, #91b3e9);
	}

	.bonus {
		position: absolute;
		top: 5%;
		left: -5%;
		color: #000;
		padding: calc(0.02 * var(--item-width)) calc(0.05 * var(--item-width));
		padding-left: calc(0.2 * var(--item-width));
		font-size: calc(0.08 * var(--item-width));
		background-image: linear-gradient(to left, #f2dcfb, #cde1fe);
	}

	.bonus.initial {
		background-image: linear-gradient(to right, #f5d0b2, #fbe9b9);
	}

	.bonus :global(img) {
		position: absolute;
		left: 0;
		width: calc(0.2 * var(--item-width));
		top: 50%;
		transform: translateY(-50%);
	}

	.item-pic span {
		width: 100%;
		bottom: 2.5%;
		left: 0;
		position: absolute;
		color: #fff;
		-webkit-text-stroke: 1px solid #000;
		text-shadow: 0 0 0.1rem #000;
		display: block;
		font-size: calc(0.075 * var(--item-width));
	}

	.price {
		background-color: #fff;
		width: 100%;
		padding: 5% 3%;
		color: #000;
		font-size: calc(0.09 * var(--item-width));
		white-space: nowrap;
	}

	/* Checkbox */

	.initial-topup {
		padding: 1rem 2%;
		width: 100%;
		display: flex;
		font-size: 85%;
	}

	.checkbox {
		margin-right: 2%;
	}
	.checkbox input {
		display: none;
	}

	.checkbox span {
		display: block;
		width: 1.2rem;
		border-radius: 100%;
		line-height: 0;
		padding: 0;
		margin: 0;
		outline: 0;
		aspect-ratio: 1/1;
		border: 0.3rem transparent solid;
		outline: 0.2rem rgb(255, 183, 49) solid;
	}

	:global(.mobileLandscape) .checkbox span {
		border-width: 0.2rem;
		outline-width: 0.15rem;
		width: 1rem;
	}

	.checkbox input:checked + span {
		background-color: orange;
		outline-color: orange;
		border-color: #fff;
	}

	label {
		font-size: 125%;
		cursor: inherit;
	}
</style>
