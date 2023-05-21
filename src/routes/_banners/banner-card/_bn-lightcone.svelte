<script>
	import { t } from 'svelte-i18n';
	import { scaleOrigin } from '$lib/helpers/transition';
	import { assets } from '$lib/stores/app-store';
	import BannerTpl from './__banner-tpl.svelte';
	import { assetPath } from '$lib/helpers/assets';
	import { bezier } from '$lib/helpers/easing';

	export let item = {};
</script>

<BannerTpl blank>
	<div class="wrapper">
		<picture class="layer-bg">
			<source srcset={assetPath(`lc/5/${item.featured}`, 450)} media="(max-width: 640px)" />
			<img
				src={assetPath(`lc/5/${item.featured}`, 890)}
				alt={$t(item.featured)}
				crossorigin="anonymous"
				in:scaleOrigin={{
					start: 1.2,
					duration: 3500,
					delay: 250,
					origin: '100% 80%',
					easing: bezier(0.13, 0.14, 0, 1)
				}}
			/>
		</picture>
		<div class="layer-white">
			<img src={$assets['circle-ornament1.svg']} alt="Circle" class="ornament ornament1" />
			<img src={$assets['circle-ornament2.svg']} alt="Circle" class="ornament ornament2" />
			<div class="ornament ornament3" />
		</div>
	</div>
</BannerTpl>

<style>
	.wrapper {
		mask-image: linear-gradient(black 85%, transparent 98%);
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		right: 0;
		background-image: linear-gradient(170deg, rgb(255, 255, 255, 0.5), rgb(255, 255, 255, 0));
	}

	.layer-bg {
		display: block;
		width: 100%;
		height: 100%;
		position: relative;
		mask-image: linear-gradient(105deg, transparent 40%, black 70%);
	}

	.layer-bg img {
		width: 100%;
		position: absolute;
		bottom: 0;
		right: -2%;
		mask-image: linear-gradient(black 80%, transparent 98%);
	}

	.layer-white {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-image: linear-gradient(
			90deg,
			rgba(255, 255, 255, 0.9) 10%,
			rgba(255, 255, 255, 0.3)
		);
		mask-image: radial-gradient(circle farthest-side at right, transparent 31%, white 31%);
		mask-position: 74%;
		mask-size: 200% 100%;
	}

	/* ornament */
	.ornament {
		position: absolute;
	}

	.ornament1 {
		width: 125%;
		aspect-ratio: 1/1;
		object-fit: contain;
		top: 50%;
		left: 28%;
		transform: translateY(-50%);
		animation: rotate linear infinite 210s;
	}
	.ornament2 {
		width: 23%;
		aspect-ratio: 1/1;
		top: 50%;
		left: 47.5%;
		transform: translateY(-50%);
		animation: rotate linear infinite 60s;
		opacity: 0.3;
	}
	.ornament3 {
		width: 40%;
		aspect-ratio: 1/1;
		top: 50%;
		left: 40%;
		border: 0.1rem dashed rgba(0, 0, 0, 0.3);
		border-radius: 100%;
		transform: translateY(-50%);
		animation: rotate linear reverse infinite 120s;
		opacity: 0.5;
	}

	@keyframes rotate {
		0% {
			transform: translateY(-50%) rotate(0deg);
		}
		100% {
			transform: translateY(-50%) rotate(-360deg);
		}
	}
</style>
