<script>
	import { t } from 'svelte-i18n';
	import { activeBanner, activePhase, activeVersion, bannerList } from '$lib/stores/app-store';
	import { identifyBanner } from '$lib/helpers/banner-loader';
	import {
		get3StarItem,
		get4StarItem,
		get5StarItem,
		getCharDetails,
		getLCDetails
	} from '$lib/helpers/gacha/gacha-base';

	import Description from './_description.svelte';
	import ItemCard from './_item-card.svelte';
	import Table from './_table.svelte';

	let { type, bannerName, bannerID, rateup = [] } = $bannerList[$activeBanner];
	const { featured } = identifyBanner(bannerID);
	$: nameOfbanner = $t(`banner.${bannerName}`);

	// Drop 3 Star
	const drop3star = get3StarItem();

	// Drop 4 star
	const list4star = (itemType) =>
		get4StarItem({
			phase: $activePhase,
			version: $activeVersion,
			banner: type,
			type: itemType,
			rateupNamelist: rateup
		});

	const rateupItem = (itemType) => {
		if (!type.match(itemType)) return [];
		return rateup
			.map((name) => (type.match('lightcone') ? getLCDetails(name) : getCharDetails(name)))
			.map((val) => ({ ...val, rateup: true }));
	};

	const drop4char = [...rateupItem('character'), ...list4star('character')];
	const drop4lc = [...rateupItem('lightcone'), ...list4star('lightcone')];

	// Drop 5star

	const { characters: stdList = [] } = $bannerList.find(({ type: t }) => {
		const usedList = type === 'starter' ? 'starter' : 'regular';
		return t === usedList;
	});

	const list5star = (itemType) => {
		return get5StarItem({
			phase: $activePhase,
			version: $activeVersion,
			stdList,
			type: itemType,
			banner: type,
			rateupItem: [featured]
		});
	};
	const drop5char = [{ ...getCharDetails(featured), rateup: true }, ...list5star('character')];
	const drop5lc = [{ ...getLCDetails(featured), rateup: true }, ...list5star('lightcone')];
</script>

<svelte:head>
	<title>{nameOfbanner} | {$t('title')}</title>
</svelte:head>

<div class="details">
	<h1>{nameOfbanner}</h1>

	{#if type.match('event')}
		{@const { combat_type, rateup, path, name } = type.match('char') ? drop5char[0] : drop5lc[0]}
		<h2>{$t('details.dropRateBoost')}</h2>
		<div class="rateInfo">
			<div class="rarity">
				{#each Array(5) as _}
					<i class="hsr-star" />
				{/each}
			</div>
			<span>
				{$t('details.droprate', {
					values: { rate: type === 'lightcone-event' ? '75%' : '50%', rarity: 5 }
				})}
			</span>
		</div>

		<div class="item-group">
			<div class="col">
				<ItemCard {name} {path} {combat_type} {rateup} rarity={5} />
			</div>
		</div>

		<div class="rateInfo">
			<div class="rarity">
				{#each Array(5) as _, i}
					<i class="hsr-star" class:hidden={i > 3} />
				{/each}
			</div>
			<span>
				{$t('details.droprate', {
					values: { rate: type === 'lightcone-event' ? '75%' : '50%', rarity: 4 }
				})}
			</span>
		</div>

		<div class="item-group">
			{#each type === 'character-event' ? drop4char : drop4lc as { name, path, combat_type }, i}
				{#if i < 3}
					<div class="col">
						<ItemCard rarity="4" {name} {path} {combat_type} />
					</div>
				{/if}
			{/each}
		</div>
	{/if}

	<h2>{$t('details.heading')}</h2>
	<Description
		bannerName={nameOfbanner}
		bannerType={type}
		data={{ drop5char, drop4char, drop5lc, drop4lc }}
	/>

	<h2>{$t('details.entityList')}</h2>
	<p>{$t('details.warpObtain')}</p>

	<div class="rateInfo">
		<div class="rarity">
			{#each Array(5) as _}
				<i class="hsr-star" />
			{/each}
		</div>
		<span>
			{$t('details.baseWarpRate', {
				values: {
					rate: type === 'lightcone-event' ? '0.800%' : '0.600%',
					avgRate: type === 'lightcone-event' ? '1.870%' : '1.600%',
					rarity: 5
				}
			})}
		</span>
	</div>
	{#if type !== 'lightcone-event'}
		<Table data={drop5char} type="character" />
	{/if}
	{#if ['lightcone-event', 'regular'].includes(type)}
		<Table data={drop5lc} type="lightcone" />
	{/if}

	<br />
	<div class="rateInfo">
		<div class="rarity">
			{#each Array(5) as _, i}
				<i class="hsr-star" class:hidden={i > 3} />
			{/each}
		</div>
		<span>
			{$t('details.baseWarpRate', {
				values: {
					rate: type === 'lightcone-event' ? '6.600%' : '5.100%',
					avgRate: type === 'lightcone-event' ? '14.800%' : '13.000%',
					rarity: 4
				}
			})}
		</span>
	</div>
	<Table data={drop4char} type="character" />
	<Table data={drop4lc} type="lightcone" />

	<small> {$t('details.warpNote')} </small>

	<div class="rateInfo">
		<div class="rarity">
			{#each Array(5) as _, i}
				<i class="hsr-star" class:hidden={i > 2} />
			{/each}
		</div>
		<span>
			{$t('details.baseWarpRate', {
				values: { rate: '94.300%', avgRate: '85.400%', rarity: 3 }
			})}
		</span>
	</div>
	<Table data={drop3star} type="lightcone" />

	<small> {$t('details.warpNote')} </small>
</div>

<style>
	h1 {
		padding: 0.8% 0;
		font-size: calc(0.02 * var(--width));
		border-bottom: 0.15rem solid #ddd;
	}

	h2 {
		font-size: calc(0.015 * var(--width));
		padding: 1% 3%;
		padding-left: 10%;
		transform: translateX(calc(-0.0925 * var(--width)));
		background-color: #515254;
		color: #fff;
		border-top-right-radius: calc(0.01 * var(--width));
		display: inline-block;
		position: relative;
		margin: 1.5% 0;
	}

	h2::before {
		content: '';
		position: absolute;
		top: 0;
		left: calc(0.075 * var(--width));
		height: 100%;
		width: 0.15rem;
		background-color: #dd7a00;
		transform: scale(1.2);
	}

	.rateInfo {
		background-color: #eae7e4;
		border: 0.15rem solid #e5dbc8;
		display: flex;
		align-items: center;
		padding: 0.5% 1rem;
		margin: 1% 0;
		font-size: calc(0.013 * var(--width));
	}

	.rarity {
		line-height: 0;
		padding-right: 2%;
	}
	.rarity i.hsr-star {
		color: #f1984a;
	}

	i.hidden {
		visibility: hidden;
	}

	.item-group {
		display: flex;
		flex-wrap: wrap;
	}

	.col {
		flex-basis: 50%;
		width: 50%;
	}

	small {
		display: block;
		font-size: 80%;
		margin-bottom: 2%;
	}

	@media screen and (max-width: 550px) {
		h2 {
			transform: translateX(calc(-0.037 * var(--width)));
		}
		h2::before {
			left: calc(0.03 * var(--width));
		}

		.col {
			width: 100%;
			flex-basis: 100%;
		}
		small {
			margin-bottom: 5%;
		}
	}
</style>
