<script>
	import { viewportHeight, viewportWidth } from '$lib/stores/app-store';
	import BannerFrame from '../../lib/components/banners/frames/banner-frame.svelte';
	import BnDepature from './_bn-depature.svelte';
	import BnStellar from './_bn-stellar.svelte';

	export let banner = 'depature';
	$: fit = $viewportHeight * 1.7 > $viewportWidth;
	let bannerWidth;
</script>

<section>
	<div
		class="wrap"
		class:shadow={banner !== 'depature'}
		class:fit
		bind:clientWidth={bannerWidth}
		style="--bw:{bannerWidth}px"
	>
		{#if banner === 'depature'}
			<BnDepature />
		{:else if banner === 'stellar'}
			<BnStellar />
		{/if}
		<BannerFrame {banner} />
	</div>
</section>

<style>
	section {
		width: 100%;
		height: 100%;
		/* background-image: url('/images/background/standard.jpg'); */
		/* background-image: url('/images/background/beginner.jpg'); */
		background-size: cover;
		background-position: center;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: -1;
	}

	.wrap {
		width: 100%;
		max-width: 130vh;
		/* border: 1px solid #00aaff; */
		aspect-ratio: 1.7/1;
		transform: translate(6.3%, 3.4%);
		position: relative;
		z-index: -1;
	}
	.wrap.shadow {
		box-shadow: 0.2rem -0.2rem 0.2rem rgba(0, 0, 0, 0.2), -0.2rem -0.2rem 0.2rem rgba(0, 0, 0, 0.2);
	}

	:global(.mobileLandscape) .wrap {
		transform: translate(6.3%, 2%);
	}

	.wrap.fit {
		width: 75%;
		transform: translate(10%, 3.4%);
	}

	@media screen and (max-width: 750px) {
		.wrap.fit {
			transform: unset;
			width: 85%;
		}
	}
</style>
