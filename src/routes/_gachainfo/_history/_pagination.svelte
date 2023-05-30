<script>
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import { getContext } from 'svelte';

	export let dataLength;
	export let activepage;
	export let itemPerPage;

	const navigate = getContext('historyNavigation');
	const previous = () => {
		playSfx('click2');
		if (activepage > 1) navigate(activepage - 1);
	};

	const next = () => {
		playSfx('click2');
		if (dataLength > activepage * itemPerPage) navigate(activepage + 1);
	};
</script>

<div class="pagination">
	<button class="prev" disabled={activepage === 1} on:click={previous}>
		<i class="hsr-left-arrow" />
	</button>
	<span class="active">{activepage}</span>
	<button class="next" disabled={!(dataLength > activepage * itemPerPage)} on:click={next}>
		<i class="hsr-right-arrow" />
	</button>
</div>

<style>
	.pagination {
		display: flex;
		width: 100%;
		text-align: center;
		justify-content: center;
		margin: 2% 0;
		font-size: calc(0.02 * var(--width));
		color: #8e8e8e;
	}

	.pagination button,
	.pagination span {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		aspect-ratio: 1/1;
		width: calc(0.028 * var(--width));
		margin: 0 2%;
		font-size: calc(0.02 * var(--width));
		transition: all 0.2s;
	}
	span {
		color: #8e8e8e !important;
	}

	button {
		opacity: 0.8;
	}
	button:hover {
		opacity: 1;
	}
	button:disabled {
		opacity: 0.3;
	}
</style>
