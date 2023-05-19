<script>
	import { OverlayScrollbars } from 'overlayscrollbars';
	import { onMount } from 'svelte';

	export let dark = false;
	export let visibility = 'auto';
	let content;

	onMount(() => {
		OverlayScrollbars(content, {
			scrollbars: { theme: `os-theme-${dark ? 'dark' : 'light'}`, visibility }
		});
	});
</script>

<div class="scroll" bind:this={content}>
	<slot />
</div>

<style>
	.scroll {
		width: 100%;
		height: 100%;
	}
</style>
