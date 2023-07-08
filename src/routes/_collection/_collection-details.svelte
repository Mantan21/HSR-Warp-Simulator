<script>
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { HistoryManager } from '$lib/stores/idbManager';
	import { assets, viewportWidth } from '$lib/stores/app-store';
	import { assetPath } from '$lib/helpers/assets';
	import { lazyLoad } from '$lib/helpers/lazyload';
	import { getCharDetails, getLCDetails } from '$lib/helpers/gacha/gacha-base';
	import positionToStyle from '$lib/helpers/css-transformer';

	import ButtonIcon from '$lib/components/ButtonIcon.svelte';
	import LightCones from '$lib/components/LightCones.svelte';
	import ScreenshotShare from '../_index/ScreenshotShare.svelte';
	import SplashartInfo from '../_warp/warp-result/_splashart-info.svelte';

	export let name = '';
	export let type = 'character';

	const getQtyInfo = (type, qty) => {
		if (type === 'weapon') {
			const refineExtra = $t(`collection.extra`, { values: { count: `5 + ${qty - 5}` } });
			const info = $t(`collection.superimpose`, {
				values: { count: qty > 5 ? refineExtra : qty }
			});
			return info;
		}

		const refineExtra = $t(`collection.extra`, { values: { count: `6 + ${qty - 7}` } });
		const info = $t(`collection.eidolon`, {
			values: { count: qty > 7 ? refineExtra : qty - 1 }
		});
		return info;
	};

	const getItemDetail = (name) => {
		if (type === 'lightcone') return getLCDetails(name);
		return getCharDetails(name);
	};

	const close = getContext('closeDetail');
	const loadItem = async () => {
		if (!name) return;
		const dt = await HistoryManager.getByName(name);
		const result = dt[0] ? dt[0] : getItemDetail(name);
		result.qty = dt.length;
		return result;
	};
</script>

<div
	class="warp-result"
	transition:fade={{ duration: 200 }}
	style="--bg:url('{$assets['warp-bg.webp']}')"
>
	<div class="close">
		<ButtonIcon on:click={close} />
	</div>

	<div class="container">
		{#await loadItem(name) then { path, rarity, combat_type, splashartOffset, qty, type, time }}
			{#if qty < 1}
				<div class="not-indexed">
					<span>NOT INDEXED</span>
				</div>
			{/if}

			<div class="wrapper" class:notowned={qty < 1}>
				{#if !combat_type}
					<div class="item-art lightcone">
						<div class="item-content">
							<div class="lightcone-item">
								<LightCones item={name} {rarity} />
							</div>
						</div>
					</div>
				{:else}
					<div class="item-art character">
						<picture class="item-content">
							<img
								use:lazyLoad={assetPath(
									`splash-art/${rarity}/${name}`,
									$viewportWidth > 840 ? 1280 : 640
								)}
								style={positionToStyle(splashartOffset)}
								crossorigin="anonymous"
								alt={$t(name)}
							/>
						</picture>
					</div>
				{/if}

				<SplashartInfo combatType={combat_type} {path} {rarity} {name} />
			</div>

			{#if qty > 0}
				<div class="detail">
					<span class="qty"> {getQtyInfo(type, qty)} </span>
					<small> {$t('collection.firstSummon', { values: { date: time } })} </small>
				</div>
			{/if}

			{#if qty > 0}
				<ScreenshotShare />
			{/if}
		{/await}
	</div>
</div>

<style>
	.warp-result {
		width: 100%;
		height: 100%;
		position: fixed;
		width: var(--screen-width);
		height: var(--screen-height);
		top: 0;
		left: 0;
		z-index: +11;
		background-image: var(--bg);
		background-size: cover;
	}

	img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	.close {
		position: absolute;
		top: 0;
		right: 0;
		padding: 3.7vh 2%;
		z-index: +12;
	}

	:global(.mobileLandscape) .close {
		padding: 1.5vh 5%;
	}

	.container,
	.wrapper,
	.item-art,
	.item-content,
	.not-indexed {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.item-content {
		height: 60vw;
	}

	.not-indexed {
		position: absolute;
		max-width: var(--screen-height);
		text-align: center;
		z-index: +10;
		font-size: calc(0.14 * var(--screen-height));
		opacity: 0.5;
		transform: rotate(-30deg);
	}

	.notowned .item-art :global(img) {
		filter: brightness(40%);
	}

	.item-art.character img {
		top: 50%;
		left: 50%;
		width: 85%;
		height: auto;
		transform: translate(-50%, -50%);
	}
	.item-art.character {
		max-width: 170vh;
	}

	.item-art .lightcone-item {
		width: 35vh;
		max-width: 35%;
		transform: rotate(8deg);
	}

	.detail {
		position: absolute;
		left: 0;
		bottom: 0;
		padding: 2% 2% 2% 5%;
		display: block;
		color: #fff;
		font-size: large;
		background-color: rgba(0, 0, 0, 0.3);
		border-top-right-radius: 1.5rem;
		backdrop-filter: blur(10px);
	}
	.detail span,
	.detail small {
		display: block;
		white-space: nowrap;
	}

	.detail .qty {
		font-size: larger;
	}
</style>
