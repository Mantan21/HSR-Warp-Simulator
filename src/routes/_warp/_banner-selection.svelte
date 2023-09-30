<script>
	import { activeBanner, bannerList } from '$lib/stores/app-store';
	import ButtonBanner from './_button-banner.svelte';

	const selectBanner = (bn) => activeBanner.set(bn);
</script>

<svg
	xmlns="http://www.w3.org/2000/svg"
	xml:space="preserve"
	width="0"
	height="0"
	style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd;position: absolute"
	viewBox="0 0 1594.82 607.45"
>
	<!-- 
    set svg under 1px 
    formula : 1/svg width and 1/svg height
  -->
	<clipPath
		id="buttonFrame"
		transform="scale(0.00062703 0.00164622602)"
		clipPathUnits="objectBoundingBox"
	>
		<path
			d="M-0 0l252.81 0c4.72,20.97 23.26,36.62 45.42,36.62 22.16,0 40.71,-15.65 45.42,-36.62l1251.17 0 0 607.45 -1250.98 0c-4.4,-21.4 -23.14,-37.49 -45.61,-37.49 -22.47,0 -41.21,16.08 -45.61,37.49l-252.62 0 0 -607.45zm292.89 87.22l18.18 0 0 18.39 -18.18 0 0 -18.39zm0 31.73l18.18 0 0 18.39 -18.18 0 0 -18.39zm0 34.03l18.18 0 0 18.39 -18.18 0 0 -18.39zm0 30.8l18.18 0 0 18.39 -18.18 0 0 -18.39zm0 31.5l18.18 0 0 18.39 -18.18 0 0 -18.39zm0 30.11l18.18 0 0 18.39 -18.18 0 0 -18.39zm0 32.43l18.18 0 0 18.39 -18.18 0 0 -18.39zm0 33.35l18.18 0 0 18.39 -18.18 0 0 -18.39zm0 31.38l18.18 0 0 18.39 -18.18 0 0 -18.39zm0 31.38l18.18 0 0 18.39 -18.18 0 0 -18.39zm0 31.38l18.18 0 0 18.39 -18.18 0 0 -18.39zm0 31.38l18.18 0 0 18.38 -18.18 0 0 -18.38zm0 31.38l18.18 0 0 18.39 -18.18 0 0 -18.39zm0 31.38l18.18 0 0 18.38 -18.18 0 0 -18.38z"
		/>
	</clipPath>
</svg>

<div class="banner-selection">
	{#each $bannerList as banner, i}
		<div class="item">
			<ButtonBanner
				active={i === $activeBanner}
				bannerData={banner}
				on:select={() => selectBanner(i)}
			/>
		</div>
	{/each}
</div>

<style>
	.banner-selection {
		padding-top: 1%;
		position: absolute;
		left: 0;
		top: 13%;
		z-index: +3;
		display: flex;
		flex-direction: column;
		max-height: calc(62.5 / 100 * var(--screen-height));
		overflow-y: auto;
	}
	.item {
		padding-bottom: 1%;
	}

	.banner-selection::-webkit-scrollbar {
		display: none;
	}

	:global(.mobileLandscape) .banner-selection {
		left: 3%;
		top: 15%;
	}

	@media screen and (max-width: 750px) {
		:global(main):not(.mobileLandscape) .banner-selection {
			flex-direction: row;
			width: 90%;
			justify-content: center;
			top: 10%;
			left: 50%;
			transform: translateX(-50%);
		}
		.item {
			padding: 0 1%;
		}
	}

	@media screen and (max-width: 600px) {
		:global(main):not(.mobileLandscape) .banner-selection {
			flex-wrap: wrap;
			width: 60%;
		}
		.item {
			flex-basis: 30%;
		}
	}

	@media screen and (max-width: 400px) {
		:global(main):not(.mobileLandscape) .banner-selection {
			width: 100%;
			top: 12.5%;
		}
	}
</style>
