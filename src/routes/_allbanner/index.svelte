<script>
	import { getContext, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';

	import { allPatch } from '$lib/data/warp-setup.json';
	import unknownBanner from '$lib/data/banners/events/1000000.0.json';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import { assets } from '$lib/stores/app-store';
	import { cookie } from '$lib/helpers/dataAPI/api-cookie';

	import Scrollable from '$lib/components/Scrollable.svelte';
	import ButtonIcon from '$lib/components/ButtonIcon.svelte';
	import Header from '$lib/components/Header.svelte';
	import VersionItem from './_version-item.svelte';

	let showAll = cookie.get('showHiddenBanner');
	$: cookie.set('showHiddenBanner', showAll);

	const navigate = getContext('navigate');
	const closeBannerList = () => {
		playSfx('close');
		navigate('index');
	};

	const filterBanner = (bannerData, showAll) => {
		if (showAll) return bannerData;

		const filterPro = bannerData.map(({ data, patch }) => {
			const hidePro = data.filter(({ pro }) => !pro);
			return { patch, data: hidePro };
		});
		const filterLength = filterPro.filter(({ data }) => data.length > 0);
		return filterLength;
	};

	const loadAllBanner = async () => {
		const patchList = [];
		allPatch.forEach((ver) => {
			const data = import(`../../lib/data/banners/events/${ver.toFixed(1)}.json`);
			patchList.push(data);
		});
		if (unknownBanner.data.length > 0) {
			patchList.push(unknownBanner);
		}

		const list = await Promise.all(patchList);
		return list.reverse();
	};

	onMount(() => playSfx('allbanner'));
</script>

<svelte:head>
	<title>{$t('banner.all')} | {$t('title')}</title>
</svelte:head>

<section transition:fade={{ duration: 250 }} style="--bg: url({$assets['allbanner-bg.webp']})">
	<Header relative h1={$t('version')} h2={$t('banner.all')} icon="warp">
		<div class="showAll">
			<input
				type="checkbox"
				name="showAll"
				id="showAll"
				bind:checked={showAll}
				on:change={() => playSfx()}
			/>
			<label for="showAll">
				<i>✔</i>
				{$t('banner.showHidden')}
			</label>
		</div>
		<div class="close">
			<ButtonIcon on:click={closeBannerList} />
		</div>
	</Header>
	<div class="container">
		<Scrollable>
			<div class="wrapper">
				{#await loadAllBanner()}
					<div class="wait" out:fade={{ duration: 250 }}>
						<span> {$t('waiting')}...</span>
					</div>
				{:then data}
					{@const allBanners = filterBanner(data, showAll)}
					{#each allBanners as { patch, data }, i}
						<div class="group" in:fade={{ duration: 300, delay: Math.sqrt(i * 10000) }}>
							{#if patch === 1000000}
								<h3>{$t('banner.stc')}</h3>
							{:else}
								<h3>{$t('version')} {patch.toFixed(1)}</h3>
							{/if}
							<div class="banner">
								{#each data as { phase, banners, pro }}
									<VersionItem {phase} version={patch.toFixed(1)} data={banners} {pro} />
								{/each}
							</div>
						</div>
					{/each}
				{/await}
			</div>
		</Scrollable>
	</div>
</section>

<style>
	section {
		width: 100%;
		height: var(--screen-height);
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
		height: 40vw;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
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
		z-index: +2;
		font-weight: normal;
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

	/*  */

	.showAll {
		font-size: 130%;
		text-transform: capitalize;
	}
	label {
		cursor: inherit;
	}
	.showAll input + label i {
		color: white;
		display: inline-block;
		padding: 0.1rem 0.2rem 0.1rem 0.1rem;
		line-height: 1rem;
		background-color: #fff;
		border: 1px solid transparent;
		transition: all 0.2s;
	}
	.showAll input:checked + label i {
		background-color: #06bbff;
	}

	.showAll:hover input + label i {
		border: 1px solid #06bbff;
		box-shadow: rgba(106, 168, 230, 0.6) 0px 0px 7px 5px;
	}

	.showAll input {
		display: none;
	}
</style>
