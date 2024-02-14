<script>
	import { isMobile, isMobileLandscape, liteMode, viewportWidth } from '$lib/stores/app-store';

	export let blank = false;
	$: mobile = $isMobileLandscape || $isMobile || $viewportWidth < 700;
</script>

<div class="container" class:lite={$liteMode}>
	{#if blank}
		<slot />
	{:else}
		<div class="info-border" />
		<div class="info">
			<div class="wrapper-info" class:mobile />
		</div>
		<div class="featured">
			<slot />
		</div>
	{/if}

	<svg class="banner-corner" viewBox="0 0 68909.65 94154.68">
		<g id="Layer_x0020_1">
			<path
				d="M68909.65 94154.68l0 -82480.77 0 -11673.91 -11673.85 0 -57235.8 0c0,6420.78 5253.57,11673.91 11673.91,11673.91l35926.8 0c5385.08,92.08 9635.09,2685.92 9635.09,7115.95l0 63690.91c0,6420.78 5253.07,11673.91 11673.85,11673.91z"
			/>
		</g>
	</svg>
	<div class="corner-text">
		<span>MADE BY AGUZZTN </span>
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

	.info-border {
		width: calc(0.009 * var(--bw));
		height: 100%;
		position: absolute;
		z-index: -1;
		top: 0;
		left: calc(30% - calc(0.009 * var(--bw)));
		background-image: linear-gradient(black 80%, transparent);
	}

	.lite .info-border {
		background-image: unset;
		background-color: black;
	}

	.wrapper-info {
		height: 100%;
		width: 97.5%;
		background-image: linear-gradient(rgba(255, 255, 255, 0.9) 85%, transparent);
		border-top-right-radius: calc(0.05 * var(--bw));
		padding: 4.5%;
	}

	.wrapper-info:not(.mobile) {
		display: none;
	}

	.lite .wrapper-info {
		background-image: unset;
		background-color: rgb(240, 240, 240);
	}

	.featured {
		position: relative;
		width: 70%;
	}
	.corner-text {
		position: absolute;
		bottom: 88.5%;
		left: 91.4%;
		z-index: +2;
		transform: rotate(270deg);
		font-family: var(--hsr-neue);
		opacity: 0.4;
		font-size: calc(0.008 * var(--bw));
		letter-spacing: calc(0.003 * var(--bw));
		line-height: 0;
		width: 15%;
		white-space: normal;
		display: flex;
		align-items: center;
		pointer-events: none;
	}

	.banner-corner {
		width: 12.5%;
		right: 0;
		opacity: 0.65;
		position: absolute;
		z-index: +1;
		pointer-events: none;
	}
</style>
