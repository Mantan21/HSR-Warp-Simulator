<script>
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { fade } from 'svelte/transition';
	import ColorThief from '../../../node_modules/colorthief/dist/color-thief.mjs';
	import { data } from '$lib/data/characters.json';
	import { assetPath } from '$lib/helpers/assets.js';
	import { assets } from '$lib/stores/app-store.js';

	export let bannerList;
	export let bannerType;
	export let featured;

	const setColor = getContext('setColor');
	const colorthief = new ColorThief();

	// Check Manual Color
	const manualColorPick = (featured) => {
		const { colors } = data.find(({ name }) => name === featured);
		if (Array.isArray(colors) && colors?.length > 1) {
			const [cl1, cl2] = colors;
			const color1 = cl1.split(' ').join(',');
			const color2 = cl2.split(' ').join(',');
			setColor(color1, color2);
			return true;
		}
		return false;
	};

	const getColor = (list) => {
		try {
			const { featured } = list.find(({ type }) => {
				return type === 'character-event';
			}) || { featured: null };
			if (!featured) return;

			// autpic color if no color served
			const img = new Image();
			img.crossOrigin = 'anonymous';
			img.src = assetPath(`splash-art/5/${featured}`, 640);
			img.addEventListener('load', () => {
				if (manualColorPick(featured)) return;
				const [clr1, clr2] = colorthief.getPalette(img, 2);
				const color1 = clr2.join(',');
				const color2 = clr1.join(',');
				setColor(color1, color2);
			});
		} catch (e) {
			console.log(e);
		}
	};
	$: getColor(bannerList);
</script>

{#if bannerType === 'starter'}
	<div class="bg" transition:fade|local={{ duration: 250 }}>
		<img src={$assets['departure-bg.webp']} alt="Background" crossorigin="anonymous" />
	</div>
{:else if bannerType === 'regular'}
	<div class="bg" transition:fade|local={{ duration: 250 }}>
		<img src={$assets['stellar-bg.webp']} alt="Background" crossorigin="anonymous" />
	</div>
{:else if bannerType === 'character-event'}
	<div class="bg character" transition:fade|local={{ duration: 250 }}>
		<img
			src={assetPath(`splash-art/5/${featured}`, 640)}
			alt={$t(featured)}
			crossorigin="anonymous"
		/>
	</div>
{:else if bannerType === 'lightcone-event'}
	<div class="bg lightcone" transition:fade|local={{ duration: 250 }}>
		<img src={assetPath(`lc/5/${featured}`, 150)} alt={$t(featured)} crossorigin="anonymous" />
	</div>
{/if}

<style>
	.bg {
		width: 100vw;
		height: 100%;
		position: fixed;
		z-index: 0;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(1.1);
		filter: blur(10px);
	}

	img {
		width: 100%;
		height: 100%;
	}

	.bg.character {
		background-image: linear-gradient(
			170deg,
			rgb(0, 0, 0, 1),
			var(--bn-color1) 50%,
			var(--bn-color2)
		);
		background-size: 200%;
		background-position: top left;
		filter: blur(15px);
		background-color: #fff;
	}

	.bg.character img {
		position: absolute;
		transform: scale(1.9);
		top: -28%;
		left: -4.5%;
		mask-image: linear-gradient(45deg, rgba(0, 0, 0, 0.8) 20%, transparent 65%);
	}

	.bg.lightcone {
		filter: blur(15px);
		background-image: linear-gradient(
			170deg,
			rgb(0, 0, 0, 1),
			var(--bn-color1) 50%,
			var(--bn-color2)
		);
	}

	.bg.lightcone img {
		position: absolute;
		top: unset;
		left: unset;
		bottom: -2%;
		right: 0%;
		height: unset;
		width: unset;
		min-height: 100vh;
		min-width: 100vw;
		opacity: 0.8;
	}
</style>
