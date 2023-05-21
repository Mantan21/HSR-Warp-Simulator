<script>
	import { json, t } from 'svelte-i18n';

	export let bannerName;
	export let bannerType;
	export let data = {};

	const isEventWarp = !['stellar', 'departure'].includes(bannerName);
	const isCharBanner = bannerType === 'character';
	const bannerWarp = isEventWarp ? `${bannerType}-event` : bannerName;

	const { drop5char, drop4char, drop5lc, drop4lc } = data;
	const {
		name: itemName,
		path,
		combat_type
	} = (drop5char || drop5lc).find(({ rateup }) => rateup) || {};
	const [item1, item2, item3] =
		(isCharBanner ? drop4char : drop4lc).filter(({ rateup }) => rateup) || {};

	const rateUpCharList = (key) => {
		return $t(`details.${key}`, {
			values: {
				featuredName: $t(itemName),
				featuredPath: $t(`path.${path}`),
				featuredCombatType: $t(combat_type),
				char1: $t(item1.name),
				path1: $t(`path.${item1.path}`),
				combatType1: $t(item1.combat_type),
				char2: $t(item2.name),
				path2: $t(`path.${item2.path}`),
				combatType2: $t(item2.combat_type),
				char3: $t(item3.name),
				path3: $t(`path.${item3.path}`),
				combatType3: $t(item3.combat_type)
			}
		});
	};

	const duplicateDetails = (star) => {
		return $t(`details.duplicate`, {
			values: {
				rarity: star,
				bonusQty: star === 5 ? 40 : 8,
				fullBonusQty: star === 5 ? 100 : 20,
				undyingType: $t('item.starlight')
			}
		});
	};

	const convertion = (star) => {
		const useEmbers = star === 3;
		const starlightQty = star === 5 ? 40 : 8;
		return $t(`details.convertion`, {
			values: {
				rarity: star,
				undyingType: $t(`item.${star === 3 ? 'embers' : 'starlight'}`),
				undyingBonus: useEmbers ? 20 : starlightQty
			}
		});
	};

	const rates = (isCharBanner) => {
		if (isCharBanner) {
			return {
				base5Rate: '0.600%',
				base4Rate: '5.100%',
				consolidated5Rate: '1.600%',
				consolidated4Rate: '13.000%',
				itemRate: '2.550%',
				guarantee4Rate: '99.400%',
				maxPity: 90,
				winRate: '50%'
			};
		}
		return {
			base5Rate: '0.800%',
			base4Rate: '6.600%',
			consolidated5Rate: '1.870%',
			consolidated4Rate: '14.800%',
			itemRate: '3.300%',
			guarantee4Rate: '99.200%',
			maxPity: 80,
			winRate: '75%'
		};
	};
</script>

<div class="description">
	{#if isEventWarp}
		<p>
			{@html $t('details.bannerStarted', { values: { banner: $t(`banner.${bannerName}`) } })}
		</p>
		<p>
			{#each $json('details.eventDetails') as txt}
				{@html $t(txt, {
					values: {
						banner: $t(`banner.${bannerName}`),
						rateupList: rateUpCharList(isCharBanner ? 'rateupCharList' : 'rateupLCList'),
						itemType: isCharBanner ? $t('character') : $t('lightcone')
					}
				})}
				<br />
			{/each}
		</p>

		<p>
			{$t('details.eventWarpNote', { values: { banner: $t(`banner.${bannerWarp}`) } })}
		</p>

		<p>
			{#each $json('details.eventWarpRate') as txt}
				{@html $t(txt, {
					values: {
						itemType: isCharBanner ? $t('character') : $t('lightcone'),
						banner: $t(`banner.${bannerWarp}`),
						...rates(isCharBanner)
					}
				})}
				<br />
			{/each}
		</p>

		<p>
			{#each $json('details.boostedRate') as txt}
				{@html $t(txt, {
					values: {
						rateupList: rateUpCharList(isCharBanner ? 'rateupCharList' : 'rateupLCList'),
						featuredName: $t(itemName),
						featuredPath: $t(`path.${path}`),
						featuredCombatType: $t(combat_type),
						itemType: isCharBanner ? $t('character') : $t('lightcone'),
						...rates(isCharBanner)
					}
				})}
				<br />
			{/each}
		</p>
	{:else}
		{#if bannerType == 'starter'}
			<p>{@html $t('details.starterDescription')}</p>
			<p>
				{#each $json('details.starterDetail') as txt}
					{@html $t(txt)} <br />
				{/each}
			</p>
		{:else}
			<p>{@html $t('details.regularDescription')}</p>
			<p>
				{#each $json('details.regular5starRate') as txt}
					{@html $t(txt)} <br />
				{/each}
			</p>
		{/if}

		<p>
			{#each $json('details.regular4starRate') as txt}
				{@html $t(txt)} <br />
			{/each}
		</p>
		<p>
			{$t('details.eventWarpNote', { values: { banner: $t(`banner.${bannerWarp}`) } })}
		</p>
	{/if}

	<p>
		{$t('details.special')}
		<br />
		● {#if ['regular', 'lightcone'].includes(bannerType)} {@html convertion(5)} {/if}
		{@html convertion(4)}
		{@html convertion(3)}
		<br />

		{#if bannerType !== 'lightcone'}
			{@html duplicateDetails(5)} <br />
		{/if}
		{@html duplicateDetails(4)}
		<br />
	</p>
</div>

<style>
	.description :global(span) {
		color: #dd7a00;
	}
	p {
		margin: 0 0 1rem;
	}
</style>
