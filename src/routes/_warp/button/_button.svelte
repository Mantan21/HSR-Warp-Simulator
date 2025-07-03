<script>
	import { createEventDispatcher } from 'svelte';

	export let type = 'text';
	const dispatch = createEventDispatcher();
	const handleClick = () => {
		dispatch('click');
	};
</script>

<button on:click={handleClick} class:icon={type === 'icon'}>
	<slot />
</button>

<style>
	button {
		background-color: var(--color-text);
		color: #222;
		padding: 0.55rem 0;
		font-size: 120%;
		border-radius: 10rem;
		display: inline-block;
		position: relative;
		margin: 0 0.2rem;
		width: calc(0.138 * var(--width));
		min-width: 7.75rem;
		max-width: 15.5rem;
		transition: all 0.2s;
	}

	button.icon {
		width: auto;
		height: 100%;
		min-width: unset;
		aspect-ratio: 1/1;
		line-height: 0;
		letter-spacing: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
	}
	button.icon :global(i) {
		transform: scale(1.3);
		line-height: 0;
	}

	button:active {
		transform: scale(0.95);
		filter: brightness(85%);
	}

	button::after {
		content: '';
		width: 92.5%;
		height: 80%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border: 0.08rem solid #bbb;
		border-radius: 5rem;
	}

	button:hover {
		background-color: #ccc;
	}

	@media screen and (max-width: 750px) {
		button {
			font-size: 100%;
			margin: 0;
			padding: 0.45rem 0.7rem;
		}
	}

	:global(.mobileLandscape) button:not(.icon) {
		font-size: 100%;
		min-width: unset;
		width: calc(0.13 * var(--width));
		margin: 0 0.1rem;
		padding: 0.45rem 0;
	}
</style>
