<script>
	import { getContext, onDestroy, onMount, setContext } from 'svelte';
	import { fade, scale } from 'svelte/transition';
	import { cubicOut } from 'svelte/easing';
	import { t } from 'svelte-i18n';
	import { animatedLC, assets, liteMode, viewportWidth } from '$lib/stores/app-store';
	import { playSfx, stopSfx } from '$lib/helpers/sounds/audiofx';
	import { lazyLoad } from '$lib/helpers/lazyload';
	import { createLink } from '$lib/helpers/shareable-link';
	import positionToStyle from '$lib/helpers/css-transformer';

	import ButtonIcon from '$lib/components/ButtonIcon.svelte';
	import LightCones from '$lib/components/LightCones.svelte';
	import ScreenshotShare from '../../_index/ScreenshotShare.svelte';
	import SplashLight from './_splash-light.svelte';
	import SsrScreen from './_ssr-screen.svelte';
	import SplashartInfo from './_splashart-info.svelte';
	import BonusItem from './_bonus-item.svelte';
	import ResultList from './ResultList.svelte';

	export let skip = false;
	export let list = [];
	export let standalone = false;

	let intro5star = false;
	let showResultList = false;
	let preview = standalone || false;
	setContext('preview', (val) => (preview = val));

	let activeIndex = 0;

	const createShareableLink = (activeIndex, showResultList) => {
		const isMulti = showResultList && list.length > 1;
		return isMulti ? createLink(list) : createLink([list[activeIndex]]);
	};

	const closeResult = getContext('closeResult');
	const close = () => {
		playSfx('warpresult-close');
		closeResult();
	};

	const playRevealAudio = () => {
		const star = list[activeIndex].rarity;
		if (star === 5) {
			intro5star = true;
			const x = setTimeout(() => {
				intro5star = false;
				clearTimeout(x);
			}, 700);
		}

		if (standalone) return;
		playSfx(`reveal-${star}star`);
	};

	const showItem = (startIndex) => {
		// Single Pull
		if (list.length === 1) {
			if (startIndex === 'start') playRevealAudio();
			return;
		}

		// Multi Pull
		if (activeIndex > list.length - 2) {
			showResultList = true;
			return;
		}
		if (startIndex !== 'start') {
			activeIndex = activeIndex + 1;
		}
		playRevealAudio();
	};

	const scaleIn = (node, args) => {
		if (!args.animate) return;
		return scale(node, args);
	};

	onMount(() => {
		showItem('start');
		if (!standalone) playSfx('warp-backsound');
		if (skip || standalone) return (showResultList = true);
	});

	onDestroy(() => {
		if (standalone) return;
		stopSfx('warp-backsound');
	});
</script>

<div class="warp-result" class:preview out:fade={{ duration: 200 }}>
	<img
		src={$assets['warp-bg.webp']}
		alt="bg"
		crossorigin="anonymous"
		in:scaleIn={{
			animate: !skip,
			start: 1.3,
			opacity: 1,
			duration: 1000,
			easing: cubicOut
		}}
	/>

	<!-- Show on Shareable screen -->
	<img class="starrail-logo" src={$assets['starrail-logo.webp']} alt="star rail logo" />
	<div class="tanda-air">
		{#if standalone}
			<div class="get-yours">Get Yours!!!</div>
		{:else}
			<div class="via">WARPVIA</div>
		{/if}
		<div class="site">
			<a href="/" title="Try Your Luck by this Simulator"> HSR.WISHSIMULATOR.APP </a>
		</div>
	</div>
	<!-- End Show on Shareable screen -->

	{#if !standalone}
		{#if list.length > 1 && !showResultList}
			<div class="skip">
				<ButtonIcon icon="skip" on:click={() => (showResultList = true)} />
			</div>
		{:else}
			<div class="close">
				<ButtonIcon on:click={close} />
			</div>
		{/if}
	{/if}

	{#if showResultList && list.length > 1}
		<ResultList {list} {standalone} />
	{:else}
		<div class="container">
			{#each list as { name, path, rarity, combat_type, splashartOffset, eidolon, undyingType, undyingQty, isNew, animationID }, i}
				{#if activeIndex === i}
					{#if intro5star && !$liteMode}
						<SsrScreen {path} />
					{:else}
						<div class="wrapper" on:mousedown={showItem}>
							{#if !$liteMode || !standalone}
								<SplashLight {rarity} />
							{/if}

							{#if !combat_type}
								<div class="item-art lightcone" in:scale={{ start: 2, duration: 500, opacity: 1 }}>
									<div class="item-content" in:scale={{ start: 1.05, duration: 2500, opacity: 1 }}>
										<div class="lightcone-item">
											<LightCones
												item={name}
												animate={!$liteMode}
												animationID={!$liteMode && $animatedLC ? animationID : null}
											/>
										</div>
									</div>
								</div>
							{:else}
								<div
									class="item-art character"
									in:scale={{ start: 1.3, duration: 500, opacity: 1 }}
								>
									<picture
										class="item-content"
										in:scale={{ start: 1.05, duration: 2500, opacity: 1 }}
									>
										<img
											use:lazyLoad={$assets[
												`splash-art/${$viewportWidth > 840 ? 'medium' : 'small'}/${name}`
											]}
											style={positionToStyle(splashartOffset)}
											crossorigin="anonymous"
											alt={$t(name)}
										/>
									</picture>
								</div>
							{/if}

							<SplashartInfo
								animate={!$liteMode}
								combatType={combat_type}
								{name}
								{path}
								{rarity}
								{isNew}
							/>
							<BonusItem {rarity} type={undyingType} qty={undyingQty} {eidolon} {name} />
						</div>
					{/if}
				{/if}
			{/each}
		</div>
	{/if}

	{#if !standalone}
		{#if list[activeIndex].rarity > 3 || (showResultList && list.length > 1)}
			<ScreenshotShare animate shareURL={createShareableLink(activeIndex, showResultList)} />
		{/if}
	{/if}
</div>

<style>
	.warp-result {
		width: 100%;
		height: 100%;
		position: relative;
		top: 0;
		left: 0;
		z-index: +11;
	}

	img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	.close,
	.skip,
	.tanda-air {
		position: absolute;
		top: 0;
		right: 0;
		padding: 3.7vh 2%;
		z-index: +12;
	}

	:global(.mobileLandscape) .close,
	:global(.mobileLandscape) .skip {
		padding: 1.5vh 5%;
	}

	.container,
	.wrapper,
	.item-art,
	.item-content {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
	}

	.item-content {
		height: 60vw;
	}

	.item-art.character img {
		top: 50%;
		left: 50%;
		width: 85%;
		height: auto;
		transform: translate(-50%, -50%);
	}
	.item-art.character {
		max-width: 170vh;
	}

	.item-art .lightcone-item {
		width: 35vh;
		max-width: 35%;
		transform: rotate(8deg);
	}

	/* Preview  */
	.starrail-logo {
		width: 400px;
		height: unset;
		max-width: 70%;
		z-index: +10;
		display: none;
		transform: translate(-5%, -20%);
	}

	:global(.mobileLandscape) .starrail-logo {
		width: 22.5%;
	}

	:global(.mobileLandscape) .tanda-air {
		font-size: 150%;
	}
	.tanda-air {
		top: unset;
		text-align: right;
		bottom: 0;
		font-size: 200%;
		z-index: +1;
		color: #fff;
		display: none;
	}
	.via {
		font-size: 90%;
		font-family: var(--hsr-neue);
	}
	.get-yours {
		font-size: 80%;
	}
	.site {
		text-shadow: 0 0 0.15rem #000;
	}
	.site a:hover {
		text-decoration: underline;
	}

	.preview .starrail-logo,
	.preview .tanda-air {
		display: unset;
	}
</style>
