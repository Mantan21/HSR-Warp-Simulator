<script>
	import { getContext, setContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { toBlob } from 'html-to-image';
	import { initialAmount } from '$lib/data/warp-setup.json';
	import { liteMode, stellarJade } from '$lib/stores/app-store';
	import { localBalance, localConfig } from '$lib/helpers/dataAPI/api-localstorage';
	import { fade as customFade } from '$lib/helpers/transition';
	import { playSfx } from '$lib/helpers/sounds/audiofx';

	import Icon from '$lib/components/Icon.svelte';
	import ScreenshotResult from './_screenshot-result.svelte';

	export let animate = false;
	export let shareURL = '';
	export let relative = false;

	let blob;
	let showResult = false;
	let loading = false;

	let obtainScreen = false;
	let isFirstTimeShare = !localConfig.get('firstTimeShare');

	setContext('firsTimeShare', () => {
		isFirstTimeShare = false;
		obtainScreen = true;

		stellarJade.update((v) => {
			const newVal = v + initialAmount.shareReward;
			localBalance.set('stellarJade', newVal);
			return newVal;
		});
		localConfig.set('firstTimeShare', true);
	});

	const preview = getContext('preview');
	const filterShot = (node) => {
		const exclude = ['close', 'skip', 'share', 'logo', 'title', 'hideOnShot', 'playButton'];
		if (node.classList) return !exclude.some((cl) => node.classList.contains(cl));
		return true;
	};

	const takeShot = async () => {
		try {
			if (loading) return;
			playSfx();
			preview(true);
			loading = true;

			const node = document.querySelector('.warp-result');
			const videoEl = node.querySelector('video');
			videoEl?.remove();
			blob = await toBlob(node, { filter: filterShot });

			playSfx('camera');
			showResult = true;
			loading = false;
			preview(false);
		} catch (e) {
			loading = false;
			preview(false);
			console.error('failed to take screenshot', e);
		}
	};

	const openObtained = getContext('openObtained');
	setContext('closeShot', () => {
		showResult = false;
		playSfx('modal-close');

		if (!obtainScreen) return;
		openObtained({ qty: initialAmount.shareReward });
		obtainScreen = false;
	});

	let lid;
	const handleLid = (node) => {
		node.addEventListener('animationend', () => {
			lid.remove();
		});
	};

	const animateFade = (node, args) => {
		if (!args.animate) return;
		return customFade(node, args);
	};
</script>

{#if showResult}
	{#if !$liteMode}
		<div class="lid" bind:this={lid}>
			<div class="top-lid" use:handleLid />
			<div class="bottom-lid" />
		</div>
	{/if}

	<ScreenshotResult {blob} isFirstTIme={isFirstTimeShare} {shareURL} />
{/if}

{#if loading}
	<div class="loader" in:fade={{ duration: 200 }}>
		<i class="hsr-spinner" />
	</div>
{/if}

<div class="share" class:relative in:animateFade={{ animate, delay: 1000 }}>
	{#if isFirstTimeShare && shareURL}
		<div class="text">
			{$t('warp.firstTimeShare')}
			<Icon type="stellarJade" /> × {initialAmount.shareReward}
		</div>
	{/if}
	<button class="btn-berbagi" on:click={takeShot} disabled={loading}><i class="hsr-share" /></button
	>
</div>

<style>
	.share,
	.btn-berbagi {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.share {
		position: absolute;
		bottom: 5%;
		right: 5%;
		z-index: +1;
	}

	.share.relative {
		position: relative;
	}

	.text {
		background-color: #000;
		color: #fff;
		padding: 0.5rem 1rem;
		margin-right: 1rem;
	}
	.text :global(img) {
		margin-top: -50%;
		transform: translateY(30%);
	}

	.btn-berbagi {
		background-color: rgba(255, 255, 255, 0.9);
		width: 40px;
		aspect-ratio: 1/1;
		border-radius: 100%;
		font-size: 1.75rem;
		transition: all 0.25s;
	}
	i {
		line-height: 0;
	}

	.btn-berbagi:disabled {
		filter: brightness(0.5);
	}

	.btn-berbagi:active {
		transform: scale(0.95);
		filter: brightness(0.8);
	}

	:global(.mobileLandscape) .btn-berbagi {
		font-size: 1.5rem;
		width: 2rem;
	}
	:global(.mobileLandscape) .text {
		font-size: 0.65rem;
		padding: 0.25rem 0.75rem;
	}

	/* Lid */
	.lid {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: +20;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.lid > div {
		background-color: #000;
		width: 100%;
		height: 100%;
	}

	.top-lid {
		transform: translateY(-100%);
		animation: slideUp 0.25s forwards;
	}
	.bottom-lid {
		transform: translateY(100%);
		animation: slideDown 0.25s forwards;
	}

	/* Loader */
	.loader {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: rgba(0, 0, 0, 0.45);
		width: 200px;
		aspect-ratio: 1/1;
		display: flex;
		justify-content: center;
		align-items: center;
		backdrop-filter: blur(5px);
		box-shadow: 0 0 1rem rgba(255, 255, 255, 0.5);
		border-radius: 20px;
	}

	.loader i {
		line-height: 0;
		animation: spin 2s forwards infinite linear;
		font-size: 300%;
	}

	@media screen and (max-width: 640px) {
		.loader {
			width: 120px;
		}
	}

	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes slideUp {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(-100%);
		}
	}
	@keyframes slideDown {
		0% {
			transform: translateY(0);
		}
		100% {
			transform: translateY(100%);
		}
	}
</style>
