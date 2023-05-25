<script>
	import { createEventDispatcher } from 'svelte';

	export let icon = '';
	export let disabled = false;
	export let colored = false;

	const dispatch = createEventDispatcher();
	const handleClick = () => {
		dispatch('click');
	};
</script>

<button on:click={handleClick} {disabled} class:colored>
	{#if !!icon}
		<i class="hsr-{icon}" />
	{/if}
	<span> <slot /> </span>
</button>

<style>
	button {
		white-space: nowrap;
		width: 200px;
		max-width: 40%;
		min-width: fit-content;
		background-color: rgba(255, 255, 255, 0.85);
		border-radius: 2rem;
		font-size: 100%;
		padding: 1.8% 5%;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		line-height: 100%;
		position: relative;
		transition: all 0.2s;
		transform: scale(1.000001);
		margin: 0 2%;
		border: 1px transparent solid;
	}

	button.colored {
		background-color: #f3b839;
		color: #000;
	}

	:global(.mobileLandscape) button {
		width: 125px;
	}

	button::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 80%;
		width: 96%;
		border: 1px solid #bbb;
		border-radius: 3rem;
	}

	button:disabled {
		background-color: transparent;
		color: #eee;
		border: 1px solid #eee;
		opacity: 0.6;
	}
	button:disabled::after {
		border: none;
	}

	button:not(:disabled):active {
		opacity: 0.5;
		transform: scale(0.95);
	}

	button i {
		transform: translateX(-50%);
		color: var(--color-second);
		aspect-ratio: 1/1;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		position: relative;
		font-size: 80%;
	}
	button i::after {
		content: '';
		width: 200%;
		aspect-ratio: 1/1;
		background-color: rgba(0, 0, 0, 0.85);
		border: 1px solid var(--color-second);
		border-radius: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: -1;
	}

	button span {
		display: inline-block;
		transform: translateX(6%);
	}
</style>
