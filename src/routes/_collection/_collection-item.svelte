<script>
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { assets } from '$lib/stores/app-store';
	import { lazyLoad } from '$lib/helpers/lazyload';
	import LightCones from '$lib/components/LightCones.svelte';

	export let rarity = 3;
	export let name = '';
	export let path = '';
	export let combatType = '';
	export let isOwned = false;
	export let qty = 0;

	const getQty = (qty) => {
		if (combatType) {
			return `E${qty > 7 ? `6 + ${qty - 7}` : qty - 1}`;
		}
		return `S${qty > 5 ? `5 + ${qty - 5}` : qty}`;
	};

	const openDetails = getContext('openDetails');
	const handleClik = () => {
		const detailData = {
			qty,
			name,
			type: combatType ? 'character' : 'lightcone'
		};
		openDetails(detailData);
	};
</script>

<div class="item-container star{rarity}" on:mousedown={handleClik}>
	{#if !combatType}
		<div class="lightcone">
			<LightCones item={name} size="small" />
		</div>
	{:else}
		<img use:lazyLoad={$assets[`closeup/${name}`]} alt={$t(name)} crossorigin="anonymous" />
	{/if}

	<div class="frame" class:notowned={!isOwned}>
		<div class="icon-info">
			{#if combatType}
				<span> <i class="hsr-{combatType} {combatType} icon-gradient" /> </span>
			{/if}
			<span><i class="hsr-{path}" /> </span>
		</div>
		{#if qty > 1}
			<span class="qty">{getQty(qty)}</span>
		{/if}

		<caption>
			<span class="name">{$t(name)}</span>
			<div class="rarity">
				{#each Array(rarity) as _}
					<i class="hsr-star" />
				{/each}
			</div>
		</caption>

		{#if !isOwned}
			<div class="not-owned">
				<span> {$t('collection.notOwned')} </span>
			</div>
		{/if}

		<div class="ornament" />
	</div>
</div>

<style>
	.item-container {
		width: 100%;
		aspect-ratio: 3/5;
		border-top-right-radius: calc(0.02 * var(--screen-width));
		position: relative;
		overflow: hidden;
		transition: border 0.25s;
		background-image: linear-gradient(rgba(255, 255, 255, 0.05), rgba(0, 0, 0, 0.05));
		border: calc(0.0015 * var(--screen-width)) solid transparent;
	}

	.item-container:hover {
		border-color: rgba(255, 255, 255, 0.4);
	}
	.not-owned {
		background-color: rgba(255, 255, 255, 0.9);
		width: 100%;
		height: 17.5%;
		color: #000;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 50%;
		left: 0;
		font-size: 120%;
		transform: translateY(-50%);
	}

	img,
	.lightcone {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 130%;
	}

	img {
		transform: translate(-50%, -50%);
	}
	.lightcone {
		width: 60%;
		transform: translate(-50%, -52.5%) rotate(13deg);
	}

	.frame {
		position: relative;
		z-index: +1;
		width: 100%;
		height: 100%;
	}
	.star3 .frame {
		background-image: linear-gradient(to top, rgba(94, 191, 255, 0.4), transparent 40%);
	}
	.star4 .frame {
		background-image: linear-gradient(to top, rgba(151, 80, 255, 0.4), transparent 40%);
	}
	.star5 .frame {
		background-image: linear-gradient(to top, rgba(255, 207, 112, 0.4), transparent 40%);
	}

	.star3 .frame.notowned {
		background-image: linear-gradient(to top, rgba(94, 191, 255, 0.4), rgba(0, 0, 0, 0.6) 40%);
	}
	.star4 .frame.notowned {
		background-image: linear-gradient(to top, rgba(151, 80, 255, 0.4), rgba(0, 0, 0, 0.6) 40%);
	}
	.star5 .frame.notowned {
		background-image: linear-gradient(to top, rgba(255, 207, 112, 0.4), rgba(0, 0, 0, 0.6) 40%);
	}
	.frame::after {
		content: '';
		bottom: 0;
		left: 0;
		height: 2.225%;
		width: 100%;
		position: absolute;
	}

	.star5 .frame::after {
		background-color: rgb(255, 207, 112);
	}
	.star4 .frame::after {
		background-color: rgb(175, 134, 254);
	}
	.star3 .frame::after {
		background-color: rgb(94, 191, 255);
	}

	.icon-info {
		font-size: 225%;
		display: flex;
		flex-direction: column;
		position: absolute;
		top: 0;
		left: 0;
		padding: 5%;
	}

	span.qty {
		display: block;
		background-color: rgba(163, 107, 94, 0.8);
		color: #f0c882;
		position: absolute;
		top: 0;
		right: 0;
		padding: 1% 12% 1%;
		font-size: 100%;
		border-bottom-left-radius: calc(0.02 * var(--screen-width));
	}

	caption {
		position: absolute;
		left: 0;
		bottom: 0;
		display: block;
		width: 100%;
		padding: 6%;
	}

	caption .name {
		font-size: 135%;
		display: block;
		padding-bottom: 5%;
	}
	:global(.mobileLandscape) caption .name,
	:global(.mobileLandscape) .not-owned {
		font-size: 100%;
	}

	.ornament {
		position: absolute;
		bottom: 0;
		right: -40%;
		border: calc(0.0011 * var(--screen-width)) solid rgba(255, 255, 255, 0.4);
		width: 100%;
		height: 3%;
		transform: rotate(-45deg);
	}

	.ornament::before {
		content: '';
		position: absolute;
		top: -180%;
		left: 0;
		width: 100%;
		border-top: calc(0.0011 * var(--screen-width)) solid rgba(255, 255, 255, 0.4);
	}
</style>
