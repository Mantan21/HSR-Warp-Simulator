<script>
	import { getContext } from 'svelte';
	import { fly } from 'svelte/transition';

	export let autoclose = true;
	export let duration = 3000;

	const closeToast = getContext('closeToast');
	if (autoclose) {
		const timer = setTimeout(() => {
			closeToast();
			clearTimeout(timer);
		}, duration);
	}
</script>

<div class="toast" transition:fly|local={{ y: -20 }} on:mousedown={closeToast}>
	<slot />
</div>

<style>
	.toast {
		padding: 0.5% 2%;
		text-align: center;
		border-radius: 0.3rem;
		min-width: 10rem;
		max-width: 20rem;
		color: #fff;
		background-color: #4a5265;
		position: fixed;
		z-index: 999;
		left: 50%;
		top: 20%;
		transform: translate(-50%, -50%);
		font-size: 0.9rem;
	}
</style>
