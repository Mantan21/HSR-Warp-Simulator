<script>
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { playSfx } from '$lib/helpers/sounds/audiofx';

	import Icon from '$lib/components/Icon.svelte';
	import ShopGroupItem from './_shop-group-item.svelte';
	import ShopGroup from './_shop-group.svelte';

	export let item = 'embers';

	const pricelist = {
		embers: 90,
		starlight: 20,
		stellarJade: 160
	};

	const openExchangeModal = getContext('openExchangeModal');
	const selectItem = (itemToExchange) => {
		playSfx('shop-item-select');
		const data = { itemToExchange, price: pricelist[item], currency: item };
		openExchangeModal(data);
	};
</script>

<ShopGroup>
	{#each ['specialPass', 'regularPass'] as pass}
		<ShopGroupItem>
			<button class="oneiric-item" in:fade={{ duration: 250 }} on:click={() => selectItem(pass)}>
				<div class="item-pic">
					<picture>
						<Icon type={pass} />
					</picture>

					<div class="info">
						<span class="name">{$t(`item.${pass}`)}</span>
						<span class="rarity">
							{#each Array(5) as _}
								<i class="hsr-star" />
							{/each}
						</span>
					</div>
				</div>
				<div class="price">
					<Icon type={item} /> <span> {pricelist[item]} </span>
				</div>
			</button>
		</ShopGroupItem>
	{/each}
</ShopGroup>

<style>
	.oneiric-item {
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: column;
		text-align: center;
	}
	picture :global(img) {
		width: 70%;
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
		background-image: linear-gradient(#a7785e, #cda46e);
	}

	.item-pic .info {
		width: 100%;
		bottom: 0;
		left: 0;
		position: absolute;
		color: #fff;
		-webkit-text-stroke: 1px solid #000;
		text-shadow: 0 0 0.1rem #000;
		display: block;
		font-size: calc(0.075 * var(--item-width));
	}

	.info .name {
		padding-bottom: 2%;
		display: block;
		opacity: 0.75;
	}

	.info .rarity {
		border: 0;
		box-shadow: none;
		font-size: calc(0.09 * var(--item-width));
		letter-spacing: calc(-0.01 * var(--item-width));
	}

	.price {
		background-color: #fff;
		width: 100%;
		padding: 3%;
		color: #000;
		font-size: calc(0.09 * var(--item-width));
		white-space: nowrap;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.price :global(img) {
		width: 20%;
	}

	.price span {
		margin-left: 5%;
		opacity: 0.7;
	}
</style>
