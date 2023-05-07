<script>
	import { getContext, onDestroy, onMount } from 'svelte';
	import { scale } from '$lib/helpers/transition';
	import { cubicOut } from 'svelte/easing';
	import ButtonClose from '$lib/components/ButtonClose.svelte';
	import SplashLight from './_splash-light.svelte';
	import LightCones from '$lib/components/LightCones.svelte';
	import { playSfx, stopSfx } from '$lib/helpers/audio';
	import SsrScreen from './_ssr-screen.svelte';
	import positionToStyle from '$lib/helpers/cssPosition';
	import SplashartInfo from './_splashart-info.svelte';
	import BonusItem from './_bonus-item.svelte';
	import { assets } from '$lib/stores/app-store';
	import ResultList from './ResultList.svelte';

	export let list = [];
	let intro5star = false;
	let showResultList = false;

	let activeIndex = 0;
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

	onMount(() => {
		playSfx('warp-backsound');
		showItem('start');
	});

	onDestroy(() => stopSfx('warp-backsound'));
</script>

<div class="warp-result">
	<img
		src={$assets['warp-bg.webp']}
		alt="bg"
		in:scale={{ start: 1.3, opacity: 1, duration: 1000, easing: cubicOut }}
	/>

	<div class="close">
		<ButtonClose on:click={close} />
	</div>

	{#if showResultList}
		<ResultList {list} />
	{:else}
		<div class="container">
			{#each list as { name, path, rarity, combat_type, type, splashartOffset, eidolon, undyingType, undyingQty, isNew }, i}
				{#if activeIndex === i}
					{#if intro5star}
						<SsrScreen {path} />
					{:else}
						<div class="wrapper" on:mousedown={showItem}>
							<SplashLight {rarity} />
							{#if type === 'lightcone'}
								<div class="item-art lightcone" in:scale={{ start: 2, duration: 500, opacity: 1 }}>
									<div class="item-content" in:scale={{ start: 1.05, duration: 2500, opacity: 1 }}>
										<div class="lightcone-item">
											<LightCones item={name} {rarity} animate />
										</div>
									</div>
								</div>
							{:else}
								<div
									class="item-art character"
									in:scale={{ start: 1.3, duration: 500, opacity: 1 }}
								>
									<div class="item-content" in:scale={{ start: 1.05, duration: 2500, opacity: 1 }}>
										<img
											src="/images/characters/{rarity}star/{name}.webp"
											style={positionToStyle(splashartOffset)}
											alt={name}
										/>
									</div>
								</div>
							{/if}

							<SplashartInfo {name} combatType={combat_type} {path} {rarity} {isNew} />
							<BonusItem {rarity} type={undyingType} qty={undyingQty} {eidolon} />
						</div>
					{/if}
				{/if}
			{/each}
		</div>
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
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}

	.close {
		position: absolute;
		top: 0;
		right: 0;
		padding: 3.7vh 2%;
		z-index: +12;
	}

	:global(.mobileLandscape) .close {
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
</style>
