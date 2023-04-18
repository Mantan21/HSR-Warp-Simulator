<script>
	import { activeBanner, bannerList } from '$lib/stores/app-store';
	import BannerItem from './BannerItem.svelte';
	import BannerSelection from '$lib/components/banners/BannerSelection.svelte';
	import Footer from './_footer.svelte';
	import Header from './_header.svelte';
	import { fade, fly } from '$lib/helpers/transition';

	$: bannerType = $bannerList[$activeBanner].type;
</script>

<div class="banner">
	{#if bannerType === 'depature'}
		<img
			transition:fade|local={{ duration: 250 }}
			src="/images/background/depature-bg.webp"
			alt="Background"
			class="bg"
		/>
	{:else if bannerType === 'stellar'}
		<img
			transition:fade|local={{ duration: 250 }}
			src="/images/background/stellar-bg.webp"
			alt="Background"
			class="bg"
		/>
	{/if}

	<Header {bannerType} />
	<BannerSelection />
	{#each $bannerList as { type }}
		{#if type === bannerType}
			<div
				class="warp-banner"
				in:fly|local={{ y: -100, duration: 200, delay: 200 }}
				out:fly|local={{ y: 100, duration: 200 }}
			>
				<BannerItem banner={type} />
			</div>
		{/if}
	{/each}
	<Footer {bannerType} />
</div>

<style>
	.banner,
	.warp-banner {
		width: 100%;
		height: 100%;
		position: relative;
	}

	.banner {
		background-color: black;
	}
	.warp-banner {
		z-index: +1;
	}

	img.bg {
		width: 100vw;
		height: 100%;
		object-fit: cover;
		position: fixed;
		z-index: 0;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(1.1);
		filter: blur(10px);
		-webkit-filter: blur(10px);
	}
</style>
