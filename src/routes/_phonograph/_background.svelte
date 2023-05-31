<script>
	import { bezier } from '$lib/helpers/easing';
	import { assets, liteMode, viewportHeight, viewportWidth } from '$lib/stores/app-store';
	import { scale } from '$lib/helpers/transition';

	$: portrait = $viewportHeight > (9 / 16) * $viewportWidth;
</script>

<div
	class:portrait
	class="background"
	style="--bg:url('{$assets['phonograph-bg.webp']}');"
	in:scale={{ start: 1.2, opacity: 1, duration: 1500, easing: bezier(0.2, 0.5, 0, 1) }}
>
	{#if !$liteMode}
		<div class="video-wrapper">
			<video class="phonograph-top" autoplay loop muted>
				<source src={$assets['phonograph1.mp4']} />
				<track kind="captions" />
			</video>

			<video class="phonograph-bottom" autoplay loop muted>
				<source src={$assets['phonograph2.mp4']} />
				<track kind="captions" />
			</video>
		</div>
	{/if}
</div>

<style>
	.background {
		width: var(--screen-width);
		height: calc(9 / 16 * var(--screen-width));
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-image: var(--bg);
		background-size: contain;
		background-position: center;
		background-repeat: no-repeat;
	}

	.background.portrait {
		width: calc(16 / 9 * var(--screen-height));
		height: var(--screen-height);
	}

	.video-wrapper {
		width: 100%;
		height: 100%;
		position: relative;
	}

	video.phonograph-top {
		position: absolute;
		top: 0;
		left: 20.2%;
		width: 45.6%;
	}
	video.phonograph-bottom {
		position: absolute;
		bottom: 0;
		left: 40.1%;
		width: 17.6%;
	}
</style>
