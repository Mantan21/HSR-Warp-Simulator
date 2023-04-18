<script>
	import { fly } from '$lib/helpers/transition';
</script>

<div class="container">
	<svg
		class="banner-corner"
		xmlns="http://www.w3.org/2000/svg"
		xml:space="preserve"
		version="1.1"
		style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
		viewBox="0 0 68909.65 94154.68"
	>
		<g id="Layer_x0020_1">
			<metadata id="CorelCorpID_0Corel-Layer" />
			<path
				class="fil0"
				d="M68909.65 94154.68l0 -82480.77 0 -11673.91 -11673.85 0 -57235.8 0c0,6420.78 5253.57,11673.91 11673.91,11673.91l35926.8 0c5385.08,92.08 9635.09,2685.92 9635.09,7115.95l0 63690.91c0,6420.78 5253.07,11673.91 11673.85,11673.91z"
			/>
		</g>
	</svg>

	<div class="info">
		<div class="wrapper-info" />
	</div>
	<div class="featured">
		<div class="featured-bg" />
		<figure class="himeko" in:fly={{ x: -15, duration: 1500, delay: 250 }}>
			<img src="/images/banners/stellar/himeko.webp" alt="Himeko" />
		</figure>
		<figure class="gepard" in:fly={{ x: -15, duration: 1500, delay: 250 }}>
			<img src="/images/banners/stellar/gepard.webp" alt="Gepard" />
		</figure>
		<figure class="bronya" in:fly={{ x: -30, duration: 1500, delay: 250 }}>
			<img src="/images/banners/stellar/bronya.webp" alt="Bronya" />
		</figure>
	</div>
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		position: relative;
	}

	.info {
		width: 30%;
		height: 100%;
		position: relative;
	}

	.wrapper-info {
		height: 100%;
		width: 97.5%;
		background-image: linear-gradient(135deg, rgba(231, 232, 234, 1) 20%, rgba(231, 232, 234, 0.5));
		border-top-right-radius: calc(0.05 * var(--bw));
		padding: 4.5%;
	}

	.featured {
		position: relative;
		width: 70%;
	}

	.featured-bg {
		width: 100%;
		height: 100%;
		background-image: linear-gradient(#272d5f, #7fa5eb 80%);
		z-index: -1;
	}

	.info,
	.featured-bg {
		mask-image: linear-gradient(rgba(0, 0, 0, 1) 85%, transparent);
		position: relative;
	}

	figure,
	.banner-corner {
		position: absolute;
		z-index: +1;
	}

	img {
		width: 100%;
	}
	.banner-corner {
		width: 12.5%;
		right: 0;
		opacity: 0.65;
		z-index: 0;
	}

	.gepard {
		top: -28.5%;
		left: -34%;
		width: 112%;
		z-index: -1;
		mask-image: linear-gradient(transparent 10%, black 25%, black 60%, transparent 80%);
	}
	.bronya {
		top: -14.5%;
		left: -5.5%;
		width: 120%;
		z-index: +1;
		mask-image: linear-gradient(transparent 0, black 15%, black 70%, transparent 85%);
	}
	.himeko {
		top: -14.5%;
		left: 29%;
		width: 79%;
		z-index: -1;
		mask-image: linear-gradient(transparent 0, black 15%, black 70%, transparent 85%);
	}
</style>
