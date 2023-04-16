<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	const handleClose = () => {
		return dispatch('click');
	};
</script>

<button on:click|preventDefault|stopPropagation={handleClose}>
	<i class="hsr-close" />
</button>

<style>
	button {
		width: 2.3rem;
		line-height: 0;
		aspect-ratio: 1/1;
		color: var(--color-text);
		font-size: 190%;
		margin-left: 2rem;
		transition: all 0.2s;
	}

	button:active {
		transform: scale(0.9);
	}

	@media screen and (max-width: 600px) {
		button {
			margin-left: 0.5rem;
			font-size: 150%;
		}
	}
</style>
