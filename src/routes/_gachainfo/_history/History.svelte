<script>
	import { setContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { activeBanner, bannerList } from '$lib/stores/app-store';

	import Scrollable from '$lib/components/Scrollable.svelte';
	import Table from './_table.svelte';
	import Report from './_report.svelte';
	import Filter from './_filter.svelte';
	import Legends from './_legends.svelte';
	import Pagination from './_pagination.svelte';
	import SelectBanner from './_select-banner.svelte';

	let type;
	$: ({ type } = $bannerList[$activeBanner]);

	let dataLength = 0;
	let filteredDataLength = 0;
	let activepage = 1;
	let filterBy = 'all';
	const itemPerPage = 5;

	const selectBanner = (path) => {
		activepage = 1;
		type = path;
		filterBy = 'all';
	};
	setContext('selectBanner', selectBanner);

	const setDataLength = (allData, dataToShow) => {
		dataLength = allData;
		filteredDataLength = dataToShow;
	};
	setContext('setDataLength', setDataLength);

	const filter = (selected) => {
		filterBy = selected;
		activepage = 1;
	};
	setContext('tableFilter', filter);

	const navigation = (page) => (activepage = page);
	setContext('historyNavigation', navigation);

	const clearHistory = () => {
		filterBy = 'clear';
		activepage = 1;
	};
	setContext('clearHistory', clearHistory);
</script>

<svelte:head>
	<title>{$t('history.heading')} | {$t('title')}</title>
</svelte:head>

<div class="history">
	<SelectBanner banner={type} />
	<p>
		{$t('history.description')}
	</p>

	<div class="row">
		<Report {dataLength} banner={type} />
		<Filter {filterBy} />
	</div>

	<Scrollable dark>
		<Table banner={type} filter={filterBy} page={{ activepage, itemPerPage }} />
	</Scrollable>

	<Legends banner={type} />
	<Pagination dataLength={filteredDataLength} {itemPerPage} {activepage} />
</div>

<style>
	.history p :global(span) {
		color: #dd7a00;
	}
	p {
		margin: 1rem 0;
	}
	.row {
		display: flex;
	}
</style>
