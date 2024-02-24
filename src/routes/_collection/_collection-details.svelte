<script>
	import { getContext, setContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';

	import { animatedLC, assets, liteMode } from '$lib/stores/app-store';
	import { HistoryManager } from '$lib/helpers/dataAPI/api-indexeddb';
	import { lazyLoad } from '$lib/helpers/lazyload';
	import { getCharDetails, getLCDetails } from '$lib/helpers/gacha/gacha-base';
	import positionToStyle from '$lib/helpers/css-transformer';

	import ButtonIcon from '$lib/components/ButtonIcon.svelte';
	import LightCones from '$lib/components/LightCones.svelte';
	import ScreenshotShare from '../_index/ScreenshotShare.svelte';
	import SplashartInfo from '../_warp/warp-result/_splashart-info.svelte';
	import { playSfx } from '$lib/helpers/sounds/audiofx';

	export let name = '';
	export let qty = 0;
	export let type = 'character';

	let preview = false;
	setContext('preview', (val) => (preview = val));
	const close = getContext('closeDetail');

	const getQtyInfo = (type, qty) => {
		if (type === 'lightcone') {
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

	const loadItem = async () => {
		const data = getItemDetail(name);
		const idbData = await HistoryManager.getByID(data.itemID);
		const { time = 'UnTracked' } = idbData[0] || {};

		return { ...data, time };
	};

	$: playLC = $animatedLC && !$liteMode;
	const playPause = (v) => {
		playSfx('click2');
		playLC = v;
	};
</script>

<section>
	<div
		style="--bg:url('{$assets['warp-bg.webp']}')"
		class="warp-result collection-detail"
		class:preview
		transition:fade={{ duration: 200 }}
	>
		<div class="close">
			<ButtonIcon on:click={close} />
		</div>

		<!-- Show on Shareable screen -->
		<div class="tanda-air">
			<div class="via">WARPVIA</div>
			<div class="site">
				<span> HSR.WISHSIMULATOR.APP </span>
			</div>
		</div>
		<!-- End Show on Shareable screen -->

		<div class="container">
			{#await loadItem(name) then { path, rarity, combat_type, splashartOffset, time, animationID }}
				{#if qty < 1}
					<div class="not-indexed">
						<span>{$t('collection.notOwned')}</span>
					</div>
				{/if}

				<div class="wrapper" class:notowned={qty < 1}>
					{#if !combat_type}
						<div class="item-art lightcone">
							<div class="item-content">
								<div class="lightcone-item">
									<LightCones
										item={name}
										size="large"
										animationID={qty > 0 && playLC ? animationID : null}
									/>
								</div>
							</div>
						</div>
					{:else}
						<div class="item-art character">
							<picture class="item-content">
								<img
									use:lazyLoad={$assets[`splash-art/medium/${name}`]}
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

					<div class="right-bottom">
						<ScreenshotShare relative />
						{#if animationID}
							<div class="playButton">
								<button class="play" on:click={() => playPause(!playLC)}>
									<i class="hsr-{playLC ? 'pause' : 'play'}" />
								</button>
							</div>
						{/if}
					</div>
				{/if}
			{/await}
		</div>
	</div>
</section>

<style>
	section {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: +11;
	}

	.warp-result {
		width: 100%;
		height: 100%;
		position: relative;
		width: var(--screen-width);
		height: var(--screen-height);
		top: 0;
		left: 0;
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

	.close,
	.tanda-air {
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

	:global(.mobileLandscape) .tanda-air {
		font-size: 150%;
	}

	.tanda-air {
		top: unset;
		text-align: right;
		bottom: 0;
		font-size: 200%;
		z-index: +1;
		color: #fff;
		display: none;
	}
	.via {
		font-size: 90%;
		font-family: var(--hsr-neue);
	}
	.site {
		text-shadow: 0 0 0.15rem #000;
	}

	.preview .tanda-air {
		display: unset;
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

	:global(.mobileLandscape) .detail {
		font-size: 100%;
	}

	.right-bottom {
		position: absolute;
		bottom: 5%;
		right: 5%;
		z-index: +1;
		display: flex;
		align-items: center;
	}

	button.play {
		margin-left: 0.5rem;
		background-color: rgba(255, 255, 255, 0.9);
		width: 40px;
		aspect-ratio: 1/1;
		border-radius: 100%;
		font-size: 1.75rem;
		transition: all 0.25s;
		display: inline-flex;
		line-height: 0;
		justify-content: center;
		align-items: center;
	}
	button.play:disabled {
		filter: brightness(0.5);
	}
	button.play:active {
		transform: scale(0.95);
		filter: brightness(0.8);
	}
	:global(.mobileLandscape) button.play {
		font-size: 1.5rem;
		width: 2rem;
	}

	@media screen and (max-width: 600px) {
		.tanda-air {
			bottom: 7.5%;
		}

		.detail {
			font-size: 100%;
		}
	}
</style>
