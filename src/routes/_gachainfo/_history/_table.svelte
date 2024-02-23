<script>
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { HistoryManager } from '$lib/helpers/dataAPI/api-indexeddb';
	import { identifyBanner } from '$lib/helpers/banner-loader';

	export let banner;
	export let filter = '';
	export let page = { itemPerPage: 0, activepage: 0 };
	let data = [];
	let dataToShow = [];

	const { getList } = HistoryManager;
	const setDataLength = getContext('setDataLength');

	const filterData = (filterBy) => data.filter(({ rarity }) => rarity === filterBy);
	const readData = async (banner, filter) => {
		const bannerList = await getList(banner);
		data = bannerList.map((d) => d).reverse();
		dataToShow = filter && filter !== 'all' ? filterData(filter) : data;
		setDataLength(data.length, dataToShow.length);
		return data;
	};

	$: readData(banner, filter);
</script>

<div class="table">
	<div style="min-width: max-content;">
		<div class="row head">
			<div class="cell cell0">{$t('history.pity')}</div>
			<div class="cell cell1">{$t('history.entityType')}</div>
			<div class="cell cell2">{$t('history.entityName')}</div>
			<div class="cell cell3">{$t('history.warpType')}</div>
			<div class="cell cell4">{$t('history.warpTime')}</div>
		</div>

		<div class="body">
			{#if dataToShow.length < 1}
				<div class="row" style="justify-content: center">
					<div class="cell">{$t('nodata')}</div>
				</div>
			{:else}
				{#each dataToShow as { name, type, rarity, time, pity, bannerID, status }, i}
					{#if i > (page.activepage - 1) * page.itemPerPage - 1 && i < page.itemPerPage * page.activepage}
						<div class="row">
							<div class="cell cell0 star{rarity}">
								{pity}
								{#if status}
									<span class="status"> <i class="hsr-{status}" /> </span>
								{/if}
							</div>
							<div class="cell cell1">{$t(type)}</div>
							<div class="cell cell2 star{rarity}">
								{$t(name)}
								{#if rarity > 3} ( {rarity}★ ) {/if}
							</div>
							<div class="cell cell3">
								{#if bannerID}
									{@const { bannerName } = identifyBanner(bannerID)}
									<span class={banner}>
										{$t(`banner.${bannerName}`)}
										{#if bannerName?.match('brilliant')}
											& {$t(`banner.bygone-reminiscence`)}
										{/if}
									</span>
								{:else}
									{$t('history.untracked')}
								{/if}
							</div>
							<div class="cell cell4">{time}</div>
						</div>
					{/if}
				{/each}
			{/if}
		</div>
	</div>
</div>

<style>
	.cell span {
		margin: 5px;
		color: unset;
	}
	span.character-event {
		color: #077f71;
	}
	span.lightcone-event {
		color: #3d81ce;
	}

	span.status {
		font-size: 80%;
		margin-left: 5%;
	}
	.table {
		width: 100%;
		font-size: calc(0.015 * var(--width));
		color: #8e8e8e;
	}
	.row {
		display: flex;
		justify-content: stretch;
		align-items: center;
		width: 100%;
		border-left: solid #b4b6b6 0.1rem;
		height: calc(0.045 * var(--width));
		line-height: 120%;
	}
	.row.head {
		font-weight: bold;
		border-top: 0.1rem solid #b4b6b6;
		background-color: rgba(209, 209, 209, 0.4);
		color: #9d8563;
	}
	.body .row {
		border-top: 0;
		font-size: calc(0.013 * var(--width));
	}

	.cell {
		width: 100%;
		border: solid #b4b6b6;
		border-width: 0 0.1rem 0.1rem 0;
	}

	.cell0 {
		width: calc(1 / 12 * 100%);
	}
	.cell1 {
		width: calc(2 / 12 * 100%);
	}
	.cell2 {
		width: calc(3.5 / 12 * 100%);
	}
	.cell3 {
		width: calc(3 / 12 * 100%);
	}
	.cell4 {
		width: calc(2.5 / 12 * 100%);
	}
	.cell {
		display: inline-flex;
		justify-content: center;
		align-items: center;
		padding: 1rem 0.5rem;
		height: 100%;
		text-align: center;
		line-height: 1rem;
	}

	.gi-star {
		font-size: 0.8em;
	}

	.star4 {
		color: #a256e1;
	}
	.star5 {
		color: #bd6932;
	}
</style>
