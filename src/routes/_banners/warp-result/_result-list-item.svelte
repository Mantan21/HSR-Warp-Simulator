<script>
	import { t } from 'svelte-i18n';
	import positionToStyle from '$lib/helpers/cssPosition';
	import { fade } from '$lib/helpers/transition';
	import { assetPath } from '$lib/helpers/assets';

	import Icon from '$lib/components/Icon.svelte';
	import LightCones from '$lib/components/LightCones.svelte';
	import Path from '$lib/components/Path.svelte';
	import { assets, viewportWidth } from '$lib/stores/app-store';

	export let isNew = false;
	export let rarity = 3;
	export let type = 'lightcone';
	export let combatType = '';
	export let itemName = '';
	export let path = '';
	export let cardOffset = {};

	export let undyingType = 'embers';
	export let undyingQty = 0;
	export let eidolon = false;
</script>

<div class="item star{rarity} {type}">
	{#if isNew}
		<div class="new">{$t('new')}</div>
	{/if}
	{#if type === 'lightcone'}
		<div class="content">
			<div class="col lc-left">
				<div class="path">
					<Path {path} />
				</div>
				<div class="rarity">
					{#each Array(parseInt(rarity)) as _}
						<i class="hsr-star" />
					{/each}
				</div>
				<div class="caption">
					<span>LIGHTCONE</span>
				</div>
			</div>
			<div class="col lc-right">
				<div class="lc-picture">
					<LightCones item={itemName} {rarity} small />
				</div>
			</div>
		</div>
	{:else}
		<span> TICKET </span>

		{#if undyingQty > 0}
			<div class="bonus" in:fade={{ delay: 700, duration: 200 }}>
				<div class="bonus-item undying star{undyingType === 'embers' ? 4 : 5}">
					<div class="icon">
						<Icon type={undyingType} style="width:70%" />
						<caption> ×{undyingQty}</caption>
					</div>
				</div>
				{#if eidolon}
					<div class="bonus-item eidolon star{rarity}">
						<div class="icon">
							<Icon type="eidolon{rarity}" style="width:70%" />
							<caption> ×1</caption>
						</div>
					</div>
				{/if}
			</div>
		{/if}

		<div class="content">
			{#if isNew}
				<div class="info">
					<div class="combat-type">
						<img src={$assets[`combat-${combatType}.webp`]} alt={combatType} />
						<!-- <i class="hsr-{combatType} icon-gradient {combatType}" /> -->
					</div>

					<div class="rarity">
						{#each Array(parseInt(rarity)) as _}
							<i class="hsr-star" />
						{/each}
					</div>
				</div>
			{/if}
			<picture>
				<img
					src={assetPath(`splash-art/${rarity}/${itemName}`, $viewportWidth > 840 ? 1280 : 640)}
					alt={$t(itemName)}
					style={positionToStyle(cardOffset)}
					crossorigin="anonymous"
				/>
			</picture>
		</div>
	{/if}
</div>

<style>
	.item {
		position: relative;
		width: 100%;
		aspect-ratio: 2/1.1;
		padding-bottom: calc(0.0035 * var(--item-width));
		overflow: hidden;
		transform: scale(1.001);
		transition: transform 0.5s, box-shadow 0.3s;
	}

	.item:hover {
		transform: scale(1.025);
		box-shadow: 0 0 calc(0.0025 * var(--item-width)) rgba(255, 255, 255, 1);
	}

	.star4.item::after,
	.star4.item::before,
	.star5.item::after,
	.star5.item::before {
		content: '';
		position: absolute;
		height: 100%;
		aspect-ratio: 1/1;
		transform: rotate(-45deg) translate(-50%, -50%) scale(2);
		z-index: +1;
	}

	.star5.item.character::after,
	.star5.item.character::before {
		background-image: repeating-linear-gradient(
				90deg,
				rgba(249, 170, 2, 0.5),
				rgba(249, 170, 2, 0) 10%
			),
			repeating-linear-gradient(0deg, rgba(249, 170, 2, 0.5), rgba(249, 170, 2, 0) 10%);
	}

	.star4.item.character::after,
	.star4.item.character::before {
		background-image: repeating-linear-gradient(
				90deg,
				rgba(254, 175, 254, 0.6),
				rgba(254, 175, 254, 0) 10%
			),
			repeating-linear-gradient(0deg, rgba(254, 175, 254, 0.6), rgba(254, 175, 254, 0) 10%);
	}

	/* left repeating gradient */
	.star5.item::before,
	.star4.item::before {
		left: 15%;
		top: -50%;
		mask-image: linear-gradient(165deg, black 50%, transparent 80%);
	}

	.lightcone.star5.item::before,
	.lightcone.star4.item::before {
		mask-image: linear-gradient(165deg, black 10%, transparent 80%);
	}

	/* right repeating gradient */
	.star5.item::after,
	.star4.item::after {
		left: 120%;
		bottom: -50%;
		mask-image: linear-gradient(170deg, transparent 15%, black 50%);
	}

	.star4.item {
		/* prettier-ignore */
		box-shadow: 0 0 calc(0.04 * var(--item-width)) rgba(255, 255, 255, 0.5),
      0 0 calc(0.005 * var(--item-width)) rgba(138, 3, 161, 1),
			0 0 calc(0.015 * var(--item-width)) rgba(217, 0, 255, 1),
      0 0 calc(0.01 * var(--item-width)) rgba(29, 4, 255, 1);
	}

	.star5.item {
		/* prettier-ignore */
		box-shadow: 0 0 calc(0.04 * var(--item-width)) rgba(255, 255, 255, 0.5),
      0 0 calc(0.008 * var(--item-width)) rgba(249, 170, 2, .7),
			0 0 calc(0.015 * var(--item-width)) rgba(249, 170, 2, 1),
      0 0 calc(0.01 * var(--item-width)) rgba(249, 121, 2, .7);
	}

	.star3.item {
		background-image: linear-gradient(to top, #619df5 9%, rgba(0, 0, 0, 0) 10%);
	}
	.star4.item.lightcone {
		background-image: linear-gradient(to top, #c18dfc 9%, rgba(0, 0, 0, 0) 10%);
	}
	.star4.item.character {
		background-color: #9c4adc;
	}
	.star5.item.lightcone {
		background-image: linear-gradient(to top, #fdd170 9%, rgba(0, 0, 0, 0) 10%);
	}
	.star5.item.character {
		background-color: #fdd170;
	}

	.content {
		width: 100%;
		height: 100%;
		display: flex;
		overflow: hidden;
		position: relative;
	}
	.content::before,
	.content::after {
		content: '';
		height: 100%;
		aspect-ratio: 1/1;
		position: absolute;
		bottom: 0;
	}
	.content::before {
		left: 0;
	}
	.content::after {
		right: 0;
	}

	.star4 .content::before {
		background-image: linear-gradient(30deg, rgba(217, 0, 255, 0.5), rgba(217, 0, 255, 0) 50%);
	}
	.star4 .content::after {
		background-image: linear-gradient(-30deg, rgba(217, 0, 255, 0.5), rgba(217, 0, 255, 0) 40%);
	}

	.star5 .content::before {
		background-image: linear-gradient(30deg, rgba(249, 170, 2, 0.5), rgba(249, 170, 2, 0) 50%);
	}
	.star5 .content::after {
		background-image: linear-gradient(-30deg, rgba(249, 170, 2, 0.5), rgba(249, 170, 2, 0) 40%);
	}

	/* Lightcone */
	.lightcone .content {
		background-image: linear-gradient(rgba(0, 0, 0, 0.75) 50%, #32588f);
	}
	.lc-right {
		flex-basis: 55%;
		width: 55%;
	}
	.lc-picture {
		width: 80%;
		transform: rotate(13deg) translate(-5%, 15%);
	}

	.lc-left {
		flex-basis: 45%;
		width: 45%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: center;
		position: relative;
		z-index: +2;
	}
	.path {
		width: 40%;
	}
	.rarity i {
		font-size: calc(0.01 * var(--item-width));
		margin-right: -2%;
	}
	.lc-left span {
		font-family: var(--hsr-neue);
		font-size: calc(0.006 * var(--item-width));
		display: block;
		line-height: 100%;
	}

	/* Character */
	.item.character {
		padding-right: calc(0.004 * var(--item-width));
		padding-top: calc(0.004 * var(--item-width));
		padding-left: calc(0.02 * var(--item-width));
	}

	.character .content {
		border-top-left-radius: calc(0.0125 * var(--item-width));
		border-bottom-right-radius: calc(0.0125 * var(--item-width));
		position: relative;
		background-color: #000;
	}

	.info {
		position: absolute;
		z-index: +3;
		bottom: 0;
		left: 0;
		padding: 2% 2%;
	}

	/* .info .icon-gradient {
		font-size: calc(0.027 * var(--item-width));
		line-height: 130%;
	} */

	.combat-type {
		width: calc(0.04 * var(--item-width));
		transform: translate(-15%, 15%);
	}
	.combat-type img {
		width: 100%;
	}

	picture {
		display: block;
		width: 100%;
		position: relative;
		height: 100%;
		mask-image: linear-gradient(60deg, rgba(0, 0, 0, 0.1), black 40%);
	}

	picture img {
		width: 400%;
		position: absolute;
		top: 185%;
		left: 50%;
		transform: translate(-50%, -50%) rotate(13deg);
	}

	.character span {
		position: absolute;
		bottom: 35%;
		left: 0;
		transform: rotate(-90deg) translateY(-50%);
		line-height: 0;
		font-family: var(--hsr-neue);
		font-size: calc(0.0055 * var(--item-width));
		z-index: +2;
	}

	.character span::before {
		content: '';
		position: absolute;
		width: 100%;
		left: -100%;
		top: 50%;
		transform: translate(-10%, -50%);
		height: calc(0.0002 * var(--item-width));
	}

	.character span::after {
		content: '';
		position: absolute;
		border-radius: 100%;
		top: 50%;
		left: -100%;
		transform: translate(-200%, -50%);
		width: 15%;
		aspect-ratio: 1/1;
	}

	.star5.character span {
		color: #9a722c;
	}

	.star4.character span {
		color: #604187;
	}

	.star5.character span::before {
		background-color: #9a722c;
	}
	.star5.character span::after {
		border: calc(0.0002 * var(--item-width)) solid #9a722c;
	}
	.star4.character span::before {
		background-color: #604187;
	}
	.star4.character span::after {
		border: calc(0.0002 * var(--item-width)) solid #604187;
	}

	/* Bonus Milestone */
	.bonus {
		position: absolute;
		bottom: 5%;
		left: 5%;
		z-index: +2;
		display: flex;
	}

	.bonus-item {
		padding: calc(0.003 * var(--item-width));
	}

	.bonus-item .icon {
		position: relative;
		width: calc(0.0475 * var(--item-width));
		border: calc(0.002 * var(--item-width)) solid #fff;
		aspect-ratio: 1/1;
		display: flex;
		justify-content: center;
		align-items: center;
		border-top-right-radius: calc(0.01 * var(--item-width));
		box-shadow: 0 0 1rem rgba(255, 255, 255, 0.8);
	}

	.bonus-item.star4 .icon {
		background-image: linear-gradient(#3e3b66, #8858cc 80%);
	}
	.bonus-item.star5 .icon {
		background-image: linear-gradient(#7a514f, #d0a050 80%);
	}

	caption {
		position: absolute;
		display: block;
		bottom: 0;
		left: 0;
		color: rgba(255, 255, 255, 0.8);
		width: 100%;
		background-color: rgba(0, 0, 0, 0.45);
		font-size: calc(0.01 * var(--item-width));
		padding: 1%;
	}

	.new {
		display: inline-block;
		z-index: +5;
		border-radius: 5rem;
		font-size: calc(0.01 * var(--item-width));
		position: absolute;
		top: 0;
		right: 0;
		transform: translate(-12%, 50%);
		background-color: #442818;
		color: #fee28b;
		text-shadow: 0 0 1rem rgb(253, 248, 176);
		box-shadow: 0 0 0.5rem rgb(255, 209, 81);
		border-top: calc(0.00125 * var(--item-width)) dotted #ffd34f;
		border-bottom: calc(0.0015 * var(--item-width)) solid #ffd34f;
		border-right: calc(0.00125 * var(--item-width)) dashed #ffd34f;
		border-left: calc(0.00125 * var(--item-width)) dashed #ffd34f;
		padding: calc(0.002 * var(--item-width)) calc(0.0085 * var(--item-width));
	}
</style>
