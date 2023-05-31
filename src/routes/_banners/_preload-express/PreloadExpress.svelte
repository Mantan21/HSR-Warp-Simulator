<script>
	import ButtonGeneral from '$lib/components/ButtonGeneral.svelte';
	import { check, loadAnimation, loadProggress } from '$lib/helpers/express-loader';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import { assets, autoskip } from '$lib/stores/app-store';
	import { localConfig } from '$lib/stores/localstorage';
	import { getContext, onMount } from 'svelte';
	import { t } from 'svelte-i18n';
	import { fade } from 'svelte/transition';

	let onProgress = false;
	let item = '';
	let progress = 0;
	let totalItem;
	let itemIndex;
	$: ({ item, progress, itemIndex, totalItem } = $loadProggress);
	$: percentage = ((itemIndex * 100 + progress) / (totalItem * 100)) * 100;
	$: warpType = item.includes('regular') ? 'Regular Warp' : 'Special Warp';

	const readyToPull = getContext('readyToPull');
	$: ready = $readyToPull;

	onMount(async () => {
		const isReady = localConfig.get('autoskip') || (await check());
		readyToPull.set(isReady);
	});

	const skipExpress = () => {
		playSfx();
		autoskip.set(true);
		readyToPull.set(true);
		localConfig.set('autoskip', true);
	};

	const preloadExpress = async () => {
		playSfx();
		onProgress = true;
		const data = await loadAnimation();
		assets.update((v) => {
			data.forEach(({ asset, url }) => (v[asset] = url));
			return v;
		});
		readyToPull.set(true);
		onProgress = false;
	};
</script>

{#if !ready}
	<div class="tooltip" transition:fade={{ duration: 250 }}>
		{#if onProgress}
			<div class="loader">
				<caption class="load-text" style="position: relative;">
					{@html $t('warp.loadExpressMsg', { values: { item: `<span> ${warpType} </span>` } })}
				</caption>
				<div class="progress-bar" style="--per:{percentage}%">
					<span />
				</div>
				<div class="percentage">
					{percentage.toFixed(0)}%
				</div>
			</div>
		{:else}
			<div class="prompt-text">
				{@html $t('warp.expressNotLoaded')}
				<small>
					{$t('warp.preloadFilesMsg')}
				</small>
			</div>
			<div class="options">
				<ButtonGeneral icon="refresh" on:click={preloadExpress}>
					{$t('warp.loadExpress')}
				</ButtonGeneral>
				<ButtonGeneral icon="skip" on:click={skipExpress}>
					{$t('warp.skipExpress')}
				</ButtonGeneral>
			</div>
		{/if}
	</div>
{/if}

<style>
	.tooltip {
		min-width: 300px;
		width: 30%;
		position: fixed;
		bottom: 15%;
		right: 5%;
		z-index: +100;
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(10px);
		padding: 2% 2% 1.5%;
		border-radius: 0.5rem;
		box-shadow: 0 0 1rem rgba(255, 255, 255, 1);
	}
	.prompt-text {
		font-size: 120%;
	}

	.prompt-text :global(span),
	.loader :global(span) {
		color: var(--color-second);
		position: relative;
	}

	small {
		display: block;
		padding: 2%;
		opacity: 0.8;
	}

	.loader {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.load-text::after {
		content: '.';
		position: absolute;
		right: 0;
		transform: translateX(100%);
		bottom: 0;
		animation: dot 3s infinite;
	}

	.progress-bar {
		width: 100%;
		height: 0.2rem;
		background-color: #ccc;
		margin: 3% 0;
		position: relative;
		border-radius: 1rem;
	}

	.progress-bar span {
		border-radius: inherit;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
		width: var(--per);
		height: 120%;
		background-image: linear-gradient(to left, #efd26c, #c59a62);
		box-shadow: 0 0 0.1rem #fff;
		transition: width 0.05s;
	}

	.options {
		padding: 2% 1% 0;
		text-align: center;
	}
	.tooltip :global(button) {
		font-size: 80%;
		margin: 1%;
		padding: 2% 5%;
	}

	@keyframes dot {
		0% {
			content: '.';
		}
		25% {
			content: '..';
		}
		50% {
			content: '...';
		}
		100% {
			content: '';
		}
	}
</style>
