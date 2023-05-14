<script>
	import { createEventDispatcher } from 'svelte';

	export let icon = 'close';
	export let dark = false;

	const dispatch = createEventDispatcher();
	const handleClose = () => {
		return dispatch('click');
	};
</script>

<button on:click|preventDefault|stopPropagation={handleClose} class:dark>
	<i class="hsr-{icon}" />
</button>

<style>
	button {
		width: 2.3rem;
		line-height: 0;
		aspect-ratio: 1/1;
		color: var(--color-text);
		font-size: 190%;
		margin-left: 1.7rem;
		transition: all 0.2s;
	}

	button.dark {
		color: #000;
	}

	button:active {
		transform: scale(0.9);
	}

	:global(.mobileLandscape) button {
		margin-left: 0.7rem;
	}

	@media screen and (max-width: 600px) {
		button {
			margin-left: 0.5rem;
			font-size: 150%;
		}
	}
</style>
