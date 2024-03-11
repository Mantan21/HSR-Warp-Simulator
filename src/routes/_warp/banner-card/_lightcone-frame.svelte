<script>
	import { t, locale } from 'svelte-i18n';
	import { fade } from '$lib/helpers/transition';
	import { animatedLC, liteMode, probEdit } from '$lib/stores/app-store';
	import { getLCDetails } from '$lib/helpers/gacha/gacha-base';

	import LightCones from '$lib/components/LightCones.svelte';
	import Path from '$lib/components/Path.svelte';
	import RateupLightones from './__rateup-lightcones.svelte';

	export let item = {};
	export let event2 = false;

	const lightcones = item.rateup.map((d) => ({ name: d, rarity: 4 }));
	const { animationID } = getLCDetails(item.featured) || null;
</script>

<div class="content">
	{#if $probEdit}
		<div class="banner-name">
			{$t('editor.bannerConfig', { values: { banner: $t('banner.lightcone-event') } })}
		</div>
	{:else}
		<div class="banner-name">
			{$t('banner.lightcone-event')}
			{event2 ? ($locale === 'ja-JP' ? '2' : '— 2') : ''}
		</div>
	{/if}

	{#if !$probEdit}
		<!-- Left Pane -->
		<div class="wrapper-info" out:fade|local>
			<div class="info-body" in:fade={{ delay: 250, duration: 1000 }}>
				<div class="short-detail">
					<h1>{$t(`banner.${item.bannerName}`)}</h1>
					<div class="time">
						<i class="hsr-time" />
						<caption> {$t('warp.duration')}</caption>
					</div>
					<div class="description">
						<p>{@html $t('warp.warpDescription')}</p>
						<p>{$t('warp.itemRateBoost', { values: { itemtype: $t('lightcone') } })}</p>
					</div>
				</div>
				<RateupLightones {lightcones} />
			</div>
		</div>

		<!-- Right Pane -->
		<div class="item-name" transition:fade|local>
			<div class="row" in:fade={{ delay: 250, duration: 1000 }}>
				<div class="path">
					<Path path={item.path} dark />
				</div>
				<div class="name">{$t(item.featured)}</div>
				<span class="stars">
					{#each Array(5) as _}
						<i class="hsr-star" />
					{/each}
				</span>
			</div>
		</div>
		<div class="featured-lighcone" transition:fade|local>
			<LightCones
				item={item.featured}
				animationID={$animatedLC && !$liteMode ? animationID : null}
			/>
		</div>
	{/if}
</div>

<style>
	.content {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
	}

	.banner-name {
		position: absolute;
		top: 2%;
		left: -1.1%;
		font-size: calc(0.015 * var(--bw));
		padding: 0.45% 1.5%;
		border-top-right-radius: 2rem;
		border-bottom-right-radius: 2rem;
		background-color: #3d81ce;
		z-index: +2;
	}

	.wrapper-info {
		width: 30%;
		height: 100%;
		color: #333;
		padding: 1.3%;
		position: relative;
		z-index: +1;
	}

	.info-body {
		height: 100%;
		border-left: 1px solid #aaa;
		padding: 5%;
		display: flex;
		flex-direction: column;
	}

	:global(.mobileLandscape) .info-body {
		padding: 5% 5% 5% 7%;
	}

	.description,
	.time {
		display: flex;
		align-items: center;
	}

	.time i {
		line-height: 0;
		margin-right: 2%;
		font-size: calc(0.024 * var(--bw));
	}

	.time {
		font-size: calc(0.018 * var(--bw));
		margin-bottom: 2%;
	}

	.description {
		padding: 6% 0 0 1%;
		align-items: flex-start;
		flex-direction: column;
		height: calc(0.09 * var(--bw));
		overflow: auto;
		mask-image: linear-gradient(black 80%, transparent);
	}

	.description::-webkit-scrollbar {
		display: none;
	}

	.description p,
	.time {
		line-height: 130%;
	}

	.description p {
		font-size: calc(0.017 * var(--bw));
		margin-bottom: 5%;
	}

	:global(.mobileLandscape) .description p {
		font-size: calc(0.016 * var(--bw));
	}

	.description :global(span),
	.time {
		color: #e6993d;
	}

	h1 {
		margin-top: 5%;
		font-size: calc(0.03 * var(--bw));
		height: calc(0.16 * var(--bw));
		display: flex;
		align-items: center;
	}

	:global(.ja-JP) h1 {
		font-size: calc(0.035 * var(--bw));
	}

	:global(.zh-CN) h1,
	:global(.zh-TW) h1 {
		font-size: calc(0.05 * var(--bw));
	}

	:global(.mobileLandscape) h1 {
		margin-top: 13%;
		font-size: calc(0.022 * var(--bw));
		height: calc(0.07 * var(--bw));
		line-height: 100%;
	}

	/* Right Pane */
	.featured-lighcone {
		position: absolute;
		width: 24%;
		right: 24%;
		top: 22%;
		transform: rotate(7deg);
	}

	:global(.mobileLandscape) .featured-lighcone {
		width: 21.5%;
		right: 27%;
	}

	.item-name {
		position: absolute;
		bottom: 34.5%;
		left: 34.5%;
		width: 20%;
		display: flex;
		flex-direction: column;
	}

	.path {
		width: 45%;
		padding-bottom: 5%;
	}

	.item-name .name {
		font-size: calc(0.02 * var(--bw));
		color: #333;
		width: 80%;
	}

	.stars {
		padding: 0 4%;
		height: calc(0.02 * var(--bw));
		width: 100%;
		display: flex;
		align-items: center;
		font-size: calc(0.012 * var(--bw));
		margin-top: 3%;
		background-image: linear-gradient(to right, rgba(0, 0, 0, 0.65) 70%, rgba(0, 0, 0, 0));
		line-height: 0;
	}
</style>
