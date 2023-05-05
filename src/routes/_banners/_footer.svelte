<script>
	import { setContext } from 'svelte';
	import {
		activeVersion,
		activePhase,
		viewportHeight,
		isMobileLandscape,
		viewportWidth
	} from '$lib/stores/app-store';
	import WARP, { roll } from '$lib/helpers/gacha/Warp';
	import ButtonGeneral from '$lib/components/ButtonGeneral.svelte';
	import ButtonWarp from './_button-warp.svelte';
	import AstralExpress from './AstralExpress.svelte';
	import WarpResult from './_warp-result/WarpResult.svelte';
	import { playSfx } from '$lib/helpers/audio';

	export let bannerType = 'starter';
	$: isStarter = bannerType === 'starter';
	$: fit = $viewportHeight * ($isMobileLandscape ? 1.9 : 1.7) > $viewportWidth;

	let footerWidth;
	let rollCount;
	let wishResult;
	let WarpInstance;

	const initialWarp = async (version, phase) => {
		if (!version || !phase) return;
		WarpInstance = await WARP.init(version, phase);
	};
	$: initialWarp($activeVersion, $activePhase);

	const doRoll = async (count, bannerToRoll) => {
		playSfx();
		rollCount = count;
		const tmp = [];

		for (let i = 0; i < count; i++) {
			const result = await roll(bannerToRoll, WarpInstance);
			tmp.push(result);
		}

		wishResult = tmp;
		handleGachaAnimation();
	};

	// Astral Express
	let autoSkip = false;
	let showAstralExpress = false;
	let astralRarity = 3;
	let showWarpResult = false;

	const showSplashArt = () => {
		showWarpResult = true;
		showAstralExpress = false;
	};
	setContext('showSplashArt', showSplashArt);

	const closeResult = () => (showWarpResult = false);
	setContext('closeResult', closeResult);

	const handleGachaAnimation = () => {
		if (autoSkip) return showSplashArt();
		const star = wishResult.map(({ rarity }) => rarity);
		if (star.includes(5)) astralRarity = 5;
		else if (star.includes(4)) astralRarity = 4;
		else astralRarity = 3;
		showAstralExpress = true;
	};
</script>

<div
	class="button-container"
	class:fit
	style="--width:{footerWidth}px"
	bind:clientWidth={footerWidth}
>
	<div class="row">
		<div class="info-button">
			<div class="btn">
				<ButtonGeneral>Exchange</ButtonGeneral>
			</div>
			<div class="btn">
				<ButtonGeneral>Collection</ButtonGeneral>
			</div>
			<div class="btn">
				<ButtonGeneral>View Details</ButtonGeneral>
			</div>
		</div>
		<div class="warp-button">
			{#if !isStarter}
				<div class="btn">
					<ButtonWarp single {bannerType} on:click={() => doRoll(1, bannerType)} />
				</div>
			{/if}
			<div class="btn">
				<ButtonWarp {bannerType} on:click={() => doRoll(10, bannerType)} />
			</div>
		</div>
	</div>
</div>

<div class="warp-container" class:show={showAstralExpress || showWarpResult}>
	<AstralExpress show={showAstralExpress} rarity={astralRarity} banner={bannerType} />
	{#if showWarpResult}
		<WarpResult list={wishResult} />
	{/if}
</div>

<style>
	.warp-container {
		position: fixed;
		width: 100%;
		height: 100%;
		z-index: 10;
		top: 0;
		left: 0;
		pointer-events: none;
	}

	.warp-container.show {
		background-color: #000;
		pointer-events: unset;
	}

	.button-container {
		width: calc(83vw);
		position: fixed;
		bottom: 6%;
		right: 0;
		z-index: +1;
		padding-right: 7%;
	}

	@media screen and (min-width: 750px) {
		.button-container.fit {
			transform: translateX(3%);
		}
	}

	.row {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: flex-end;
	}

	.info-button,
	.warp-button {
		display: flex;
		width: 100%;
	}

	.warp-button {
		margin-left: 1rem;
		justify-content: flex-end;
	}

	.btn {
		padding: 0.5%;
	}

	/* Mobile Landscape */
	:global(.mobileLandscape) .button-container {
		bottom: 4.5%;
		padding-right: 6.5%;
	}
	:global(.mobileLandscape) .warp-button {
		transform: scale(0.95);
	}

	@media screen and (max-width: 999px) {
		:global(main):not(.mobileLandscape) .info-button {
			flex-wrap: wrap;
		}
	}

	@media screen and (max-width: 750px) {
		.button-container {
			width: 100vw;
			padding: 0 1rem;
			bottom: 4%;
		}
	}

	@media screen and (max-width: 640px) {
		.warp-button {
			flex-wrap: wrap;
			width: fit-content;
		}
	}
</style>
