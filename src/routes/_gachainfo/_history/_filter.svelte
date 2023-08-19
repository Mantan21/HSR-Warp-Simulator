<script>
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { playSfx } from '$lib/helpers/sounds/audiofx';

	export let filterBy;

	let showTableFilterOption = false;
	$: filterTxt = isNaN(filterBy)
		? $t('history.filterAll')
		: $t('history.filter', { values: { rarity: filterBy } });

	const filterFunc = getContext('tableFilter');
	const filter = (selected) => {
		showTableFilterOption = !showTableFilterOption;
		filterFunc(selected);
		playSfx('click2');
	};
</script>

<div class="table-filter">
	<button
		class="filter-selected"
		on:click={() => {
			showTableFilterOption = !showTableFilterOption;
			playSfx('click2');
		}}
	>
		{$t('history.filterTxt')} / {filterTxt}
		<i class="hsr-caret-{showTableFilterOption ? 'up' : 'down'}" />
	</button>
	{#if showTableFilterOption}
		<div class="options" transition:fade={{ duration: 200 }}>
			<button on:click={() => filter('all')} class:active={isNaN(filterBy)}>
				<span> {$t('history.filterAll')}</span>
			</button>
			<button on:click={() => filter(5)} class:active={filterBy === 5}>
				<span>
					{$t('history.filter', { values: { rarity: 5 } })}
				</span>
			</button>
			<button on:click={() => filter(4)} class:active={filterBy === 4}>
				<span>
					{$t('history.filter', { values: { rarity: 4 } })}
				</span>
			</button>
			<button on:click={() => filter(3)} class:active={filterBy === 3}>
				<span>
					{$t('history.filter', { values: { rarity: 3 } })}
				</span>
			</button>
		</div>
	{/if}
</div>

<style>
	.table-filter {
		position: relative;
		font-size: calc(0.012 * var(--width));
		margin-left: auto;
		margin-top: auto;
		margin-bottom: 0.5%;
		min-width: calc(0.1 * var(--width));
	}

	.filter-selected {
		text-align: left;
		width: 100%;
		padding: calc(0.0075 * var(--width)) calc(0.01 * var(--width));
		padding-right: calc(0.025 * var(--width));
		position: relative;
		border: 1px solid #aaa;
	}
	.filter-selected i {
		position: absolute;
		top: 50%;
		right: 0.5rem;
		line-height: 0;
		transform: translate(-50%, -50%) scale(1.3);
	}

	.options {
		background-color: #fff;
		width: 100%;
		top: 110%;
		position: absolute;
		box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		z-index: +2;
	}

	.options button {
		padding: 1% 3%;
		text-align: left;
		position: relative;
		transition: all 0.2s;
	}
	.options span {
		color: #dd7a00;
		padding: 0.8rem 1.5rem 0.8rem 0.5rem;
		display: block;
		width: 100%;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		transition: all 0.2s;
	}
	.options button:last-child span {
		border: none;
	}

	.options button:hover {
		box-shadow: 0 0 0.3rem #000;
	}
	.options button:hover span {
		border-color: transparent;
	}

	.options button::after {
		content: '';
		width: 1rem;
		aspect-ratio: 1/1;
		border-radius: 100%;
		position: absolute;
		top: 50%;
		right: 1rem;
		transform: translate(-50%, -50%);
		outline: 0.1rem solid #aaa;
		transition: all 0.2s;
	}

	.options button.active::after {
		width: 0.6rem;
		background-color: orange;
		border: 0.2rem solid white;
		outline: 0.2rem solid orange;
	}
</style>
