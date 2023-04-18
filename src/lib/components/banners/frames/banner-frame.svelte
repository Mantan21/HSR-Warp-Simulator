<script>
	import DepatureFrame from './_depature-frame.svelte';
	import StellarFrame from './_stellar-frame.svelte';

	export let banner = '';
</script>

<div class="frame">
	{#if banner === 'depature'}
		<DepatureFrame />
	{:else if banner === 'stellar'}
		<StellarFrame />
	{/if}
</div>

<style>
	.frame {
		position: absolute;
		top: 0;
		left: 0;
		color: #fff;
		width: 100%;
		height: 100%;
	}
</style>
