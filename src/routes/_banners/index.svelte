<script>
	import Depature from './Depature.svelte';
	import BannerSelection from './_banner-selection.svelte';
	import Header from './_header.svelte';
</script>

<div class="banner">
	<Header />
	<BannerSelection />
	<Depature />
</div>

<style>
	.banner {
		width: 100%;
		height: 100%;
		position: relative;
	}
</style>
