<script>
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import ColorThief from '../../../node_modules/colorthief/dist/color-thief.mjs';
	import { data } from '$lib/data/characters.json';
	import { activeBanner, assets, bannerList, liteMode } from '$lib/stores/app-store';
	import { morphIn, morphOut } from '$lib/helpers/transition';

	let featured, activeType;
	$: ({ featured, type: activeType } = $bannerList[$activeBanner]);

	// Fetch Colors
	let colorList = {};
	const setColor = getContext('setColor');
	const colorthief = new ColorThief();

	$: fetchAllColor($bannerList);
	$: changeColor(featured);

	const fetchAllColor = async (list) => {
		const charBanner = list.filter(({ type }) => type.match('character')) || [];
		if (charBanner.length < 1) return;
		for (let i = 0; i < charBanner.length; i++) {
			const { featured: charName } = charBanner[i];
			colorList[charName] = await getColor(charName);
		}

		const activeChar = featured || charBanner[0].featured;
		changeColor(activeChar);
	};

	const changeColor = (charName) => {
		if (!activeType.match('character')) return;
		const [color1, color2, color3 = null] = colorList[charName] || [];
		if (!color1) return;
		setColor(color1, color2, color3);
	};

	// Get Dominant Color
	const getColor = (charName) => {
		try {
			return new Promise((resolve) => {
				if (!charName) return;
				// autpic color if no color served
				const img = new Image();
				img.crossOrigin = 'anonymous';
				img.src = $assets[`splash-art/small/${charName}`];
				img.addEventListener('load', () => {
					const palette = manualColorPick(charName);
					if (palette) resolve(palette);
					const [clr1, clr2] = colorthief.getPalette(img, 2);
					const color1 = clr2.join(',');
					const color2 = clr1.join(',');
					resolve([color1, color2]);
				});
			});
		} catch (e) {
			console.log(e);
		}
	};

	// Check Manual Color
	const manualColorPick = (charName) => {
		const { colors } = data.find(({ name }) => name === charName);
		if (Array.isArray(colors) && colors?.length > 1) {
			const [cl1, cl2, cl3] = colors;
			const color1 = cl1.split(' ').join(',');
			const color2 = cl2.split(' ').join(',');
			const color3 = cl3?.split(' ').join(',');
			return [color1, color2, color3];
		}
		return null;
	};
</script>

{#each $bannerList as { type }, i}
	{#if i === $activeBanner}
		<!-- Character Event -->
		{#if type === 'character-event'}
			<div
				class="bg character"
				class:lite={$liteMode}
				in:morphIn={{ key: 'morph' }}
				out:morphOut={{ key: 'morph' }}
			>
				<img
					src={$assets[`splash-art/small/${featured}`]}
					alt={$t(featured)}
					crossorigin="anonymous"
				/>
			</div>

			<!-- LightCone Event -->
		{:else if type === 'lightcone-event'}
			<div
				class="bg lightcone"
				class:lite={$liteMode}
				in:morphIn={{ key: 'morph' }}
				out:morphOut={{ key: 'morph' }}
			>
				<img src={$assets[`lc/small/${featured}`]} alt={$t(featured)} crossorigin="anonymous" />
			</div>
		{:else}
			{@const bg = type === 'starter' ? 'departure-bg.webp' : 'stellar-bg.webp'}
			<div class="bg" in:morphIn={{ key: 'morph' }} out:morphOut={{ key: 'morph' }}>
				<img src={$assets[bg]} alt="Background" crossorigin="anonymous" />
			</div>
		{/if}
	{/if}
{/each}

<style>
	.bg {
		width: 100vw;
		height: 100%;
		position: fixed;
		z-index: 0;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		filter: blur(20px);
	}

	img {
		width: 100%;
		height: 100%;
		transform: scale(1.1);
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

	.lite img {
		mask-image: unset;
	}
	.bg.lite {
		background-image: unset;
		background-color: var(--bn-color1);
	}
</style>
