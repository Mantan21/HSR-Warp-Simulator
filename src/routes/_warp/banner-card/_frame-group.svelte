<script>
	import { t } from 'svelte-i18n';
	import { fade, fly } from 'svelte/transition';
	import {
		activeBanner,
		animatedLC,
		assets,
		bannerList,
		liteMode,
		probEdit
	} from '$lib/stores/app-store';
	import { setActiveWarp } from '$lib/helpers/banner-loader';
	import { data } from '$lib/data/characters.json';
	import { diagonalSlide } from '$lib/helpers/transition';
	import { bezier } from '$lib/helpers/easing';
	import { getLCDetails } from '$lib/helpers/gacha/gacha-base';
	import positionToStyle from '$lib/helpers/css-transformer';
	import ButtonBanner from '../button/_button-banner.svelte';
	import RateupLightcones from './__rateup-lightcones.svelte';
	import LightCones from '$lib/components/LightCones.svelte';
	import Path from '$lib/components/Path.svelte';

	export let item = {};
	let combat_type, featured, rateup, path;
	let active = item.content.findIndex((_, i) => i === 0);
	$: ({ combat_type, featured, rateup, path } = item.content[active]);
	$: bannertype = item.type.match('char') ? 'character' : 'lightcone';
	$: bannername = item.type.match('char') ? 'indelible-coterie' : 'coalesced-truths';

	const selectBanner = (i) => {
		if (active === i) return;
		active = i;
		setActiveWarp($bannerList, $activeBanner, active);
	};

	const characterOffset = (characterName, offset = 'bannerOffset') => {
		const item = data.find(({ name }) => name === characterName) || {};
		return positionToStyle(item[offset]);
	};
</script>

<div class="content">
	{#if $probEdit}
		<div class="banner-name">
			{$t('editor.bannerConfig', { values: { banner: $t(`banner.${bannertype}-event`) } })}
		</div>
	{:else}
		<div class="banner-name">
			{$t(`banner.${bannertype}-event`)}
		</div>
	{/if}

	{#if !$probEdit}
		<div class="wrapper-info" out:fade|local style="--bg:url({$assets['menu-side-title-bg.webp']})">
			<div class="info-body" in:fade={{ duration: 250, delay: 250 }}>
				<div class="short-detail">
					<h1>
						<span> {$t(`banner.${bannername}`)} </span>
					</h1>
					<div class="time">
						<i class="hsr-time"></i>
						<span class="caption">{$t('warp.duration')}</span>
					</div>
				</div>

				<div class="banner-select-container">
					<div class="banner-content">
						{#each item.content as content, i (content)}
							<ButtonBanner
								mode={2}
								bannerData={content}
								active={active === i}
								on:select={() => selectBanner(i)}
							/>
						{/each}
					</div>
				</div>
			</div>
		</div>

		<!-- Right Content -->
		<div class="container-right" transition:fade|local>
			<div
				class="item-row"
				class:cone={bannertype === 'lightcone'}
				style={characterOffset(featured, 'textOffset')}
			>
				<div class="name">
					{#if bannertype === 'character'}
						<i class="hsr-{combat_type} icon-gradient {combat_type}"></i>
					{/if}
					<span>{$t(featured)}</span>
				</div>
				<div class="stars">
					{#each Array(5) as _, i (i)}
						<i class="hsr-star"></i>{/each}
				</div>

				{#if bannertype === 'lightcone'}
					<div class="path">
						<Path {path} dark />
					</div>
				{/if}
			</div>

			{#if bannertype === 'lightcone'}
				{#key featured}
					<div class="featured-lightcone" in:fly|local={{ x: -30, duration: 500 }}>
						<LightCones
							item={featured}
							animationID={$animatedLC && !$liteMode ? getLCDetails(featured)?.animationID : null}
						/>
					</div>
				{/key}
			{/if}

			<div class="rateup-items">
				{#if bannertype === 'lightcone'}
					<div class="cones">
						<RateupLightcones lightcones={rateup.map((d) => ({ name: d, rarity: 4 }))} />
					</div>
				{:else}
					<div class="rateup-row" in:diagonalSlide={{ delay: 400, duration: 400 }}>
						{#each rateup as name, i (name)}
							<div class="rateup-item">
								<div class="rateup-content">
									<picture
										in:fly={{
											x: -30,
											duration: 2000,
											easing: bezier(0.13, 0.14, 0, 1),
											delay: 500 + 150 * i
										}}
									>
										<img
											src={$assets[`closeup-bg/${name}`]}
											alt={$t(name)}
											crossorigin="anonymous"
										/>
									</picture>
								</div>
							</div>
						{/each}
					</div>
				{/if}
				<div class="description">
					<p>{@html $t('warp.warpDescription')}</p>
				</div>
			</div>
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
		padding: 0.45% 1.5% 0.5%;
		border-top-right-radius: 2rem;
		border-bottom-right-radius: 2rem;
		background-color: #bba57a;
		color: #2f281b;
		z-index: +2;
	}

	.wrapper-info {
		width: 25%;
		height: 100%;
		color: #333;
		padding: 1%;
		position: relative;
		z-index: +1;
		overflow: hidden;
		border-top-right-radius: calc(0.025 * var(--bw));
		/* background-image: linear-gradient(rgba(51, 48, 38, 0.9), rgba(26, 26, 26, 0.9) 40%); */
	}

	.wrapper-info::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		aspect-ratio: 16/8;
		background-size: cover;
		background-position: 80%;
		background-image: var(--bg);
		mask-image: linear-gradient(black 50%, transparent);
	}

	.info-body {
		height: 100%;
		border: 1px solid #635946;
		border-top-right-radius: calc(0.035 * var(--bw));
		padding: 0 5%;
		display: flex;
		flex-direction: column;
	}

	:global(.mobileLandscape) .info-body {
		padding: 5% 5% 5% 7%;
	}

	.time i {
		line-height: 0;
		margin-right: 2%;
		font-size: calc(0.024 * var(--bw));
	}

	.time {
		display: flex;
		align-items: center;
		font-size: calc(0.018 * var(--bw));
		margin-bottom: 2%;
		line-height: 130%;
		color: #e6993d;
	}

	/* Heading */
	h1 {
		margin-top: 15%;
		font-size: calc(0.025 * var(--bw));
		height: calc(0.1 * var(--bw));
		display: flex;
		align-items: center;
		color: #fff;
		font-weight: 400;
	}

	:global(.ja-JP) h1,
	:global(.zh-CN) h1,
	:global(.zh-TW) h1 {
		font-size: calc(0.04 * var(--bw));
	}

	:global(.ru-RU) h1 {
		line-height: 110%;
		text-shadow: 0 0 calc(0.0012 * var(--bw)) #000;
	}

	:global(.mobileLandscape) h1 {
		margin-top: 13%;
		font-size: calc(0.022 * var(--bw));
		height: calc(0.07 * var(--bw));
		line-height: 100%;
	}

	h1 span {
		display: block;
		position: relative;
	}

	/* Banner Selector */
	.banner-select-container {
		position: absolute;
		overflow: auto;
		left: 0;
		bottom: 0;
		height: 58%;
		width: 100%;
		mask-image: linear-gradient(black 85%, transparent);
		padding: 5% 0;
		padding-left: 15%;
	}

	/* right-container */
	.container-right {
		width: 75%;
		height: 100%;
		position: relative;
	}
	.item-row {
		position: absolute;
		z-index: +3;
		top: 49%;
		left: 67%;
	}
	.name {
		background-color: rgba(0, 0, 0, 0.65);
		height: calc(0.0235 * var(--bw));
		display: flex;
		align-items: center;
	}
	.name i {
		padding: 0 calc(0.01 * var(--bw));
		font-size: calc(0.025 * var(--bw));
	}
	.name span {
		display: block;
		padding-right: calc(0.01 * var(--bw));
		font-size: calc(0.016 * var(--bw));
	}

	.stars {
		padding: 0 10%;
		text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
		height: calc(0.02 * var(--bw));
		width: fit-content;
		display: flex;
		align-items: center;
		font-size: calc(0.014 * var(--bw));
		margin-top: 4%;
		line-height: 0;
		background-color: rgba(0, 0, 0, 0.65);
	}

	/* Rateup items */
	.rateup-items {
		position: absolute;
		bottom: 8%;
		left: 6%;
	}

	.description {
		background-color: rgba(0, 0, 0, 0.5);
		width: calc(0.25 * var(--bw));
		padding: 1%;
		margin-top: 2%;
		position: relative;
		z-index: +1;
		font-size: calc(0.0167 * var(--bw));
	}
	.description :global(span) {
		color: #e6993d;
	}

	/* Cones */
	.cones {
		height: calc(0.25 * var(--bw));
		transform: translateY(calc(0.08 * var(--bw))) translateX(calc(-0.05 * var(--bw))) scale(0.65)
			rotate(-10deg);
	}
	.item-row.cone {
		top: 11%;
		left: 5.5%;
	}
	.cone .name {
		background-color: unset;
		width: calc(20 / 100 * var(--bw));
		color: #000;
		margin-bottom: 13%;
	}
	.cone .name span {
		font-size: calc(0.02 * var(--bw));
	}

	.featured-lightcone {
		position: absolute;
		width: calc(24 / 100 * var(--bw));
		right: calc(20 / 100 * var(--bw));
		top: 22%;
		transform: rotate(7deg);
	}

	:global(.mobileLandscape) .featured-lightcone {
		width: 21.5%;
		right: 27%;
	}
	.path {
		width: calc(0.1 * var(--bw));
		padding-bottom: 5%;
		margin-top: 10%;
		margin-left: 5%;
	}

	/* Chars */
	.rateup-row {
		display: flex;
		width: calc(0.2 * var(--bw));
		gap: 5%;
	}
	.rateup-item {
		width: 100%;
		aspect-ratio: 1/1;
		border-radius: 100%;
	}
	.rateup-content {
		width: 100%;
		aspect-ratio: 1/1;
		border-radius: 10rem;
		overflow: hidden;
		background-color: rgba(255, 255, 255, 0.9);
	}

	picture {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
	}

	picture img {
		position: absolute;
		width: 200%;
		top: -25%;
		transform: translateX(-50%);
		left: 50%;
		z-index: +1;
	}
</style>
