<script>
	import { getContext, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';

	import { allPatch } from '$lib/data/warp-setup.json';
	import { playSfx } from '$lib/helpers/audio';
	import { assets } from '$lib/stores/app-store';

	import Scrollable from '$lib/components/Scrollable.svelte';
	import ButtonIcon from '$lib/components/ButtonIcon.svelte';
	import Header from '$lib/components/Header.svelte';
	import VersionItem from './_version-item.svelte';

	const navigate = getContext('navigate');
	const closeBannerList = () => {
		playSfx('close');
		navigate('index');
	};

	let allBanners = [];

	const loadAllBanner = async () => {
		const patchList = [];
		allPatch.forEach((patch) => {
			const json = import(`../../lib/data/banners/events/${patch.toFixed(1)}.json`);
			patchList.push(json);
		});

		const promise = await Promise.all(patchList);
		const data = promise.map(({ data, patch }) => {
			patch = patch.toFixed(1);
			return [patch.toString(), data];
		});

		allBanners = data.reverse();
		return data;
	};

	onMount(() => {
		playSfx('allbanner');
		loadAllBanner();
	});
</script>

<section transition:fade={{ duration: 250 }} style="--bg: url({$assets['allbanner-bg.webp']})">
	<Header relative h1={$t('version')} h2={$t('banner.all')} icon="warp">
		<div class="close">
			<ButtonIcon on:click={closeBannerList} />
		</div>
	</Header>
	<div class="container">
		<Scrollable>
			<div class="wrapper">
				{#if allBanners < 1}
					<div class="wait" out:fade={{ duration: 250 }}>
						<span> {$t('waiting')}...</span>
					</div>
				{/if}
				{#each allBanners as [version, data], i}
					<div class="group" in:fade={{ duration: 300, delay: Math.sqrt(i * 10000) }}>
						<h3>{$t('version')} {version}</h3>
						<div class="banner">
							{#each data as { phase, banners }}
								<VersionItem {phase} {version} data={banners} />
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</Scrollable>
	</div>
</section>

<style>
	section {
		width: 100%;
		height: 100%;
		background-image: var(--bg);
		background-size: cover;
		background-position: center center;
	}

	.container {
		width: 100%;
		height: 88%;
	}

	.wrapper {
		padding: 1rem 5%;
		overflow-x: hidden;
		position: relative;
	}

	.wait {
		width: 100%;
		height: 20vw;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
	}

	.group {
		margin: 2vh 0;
	}

	h3 {
		color: #000;
		padding: 0.6% 0;
		display: inline-block;
		position: relative;
	}

	h3::before {
		content: '';
		position: absolute;
		top: 0;
		right: -30%;
		width: 300px;
		height: 100%;
		border-top-right-radius: 1.2rem;
		background-color: rgba(255, 255, 255, 0.9);
		z-index: -1;
	}

	h3::after {
		content: '';
		position: absolute;
		left: 160%;
		top: 50%;
		width: 100vw;
		transform: translateY(-50%);
		height: 0.1rem;
		background-image: linear-gradient(to right, rgba(255, 255, 255, 0.4), transparent 80%);
	}

	.banner {
		display: flex;
		padding: 1% 0;
	}
</style>
