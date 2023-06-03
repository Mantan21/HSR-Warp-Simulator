<script>
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { assetPath } from '$lib/helpers/assets';
	import { activeBanner, activePhase, activeVersion, proUser } from '$lib/stores/app-store';
	import { localConfig } from '$lib/stores/localstorage';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import { identifyBanner } from '$lib/helpers/banners';
	import { lazyLoad } from '$lib/helpers/lazyload';

	export let phase;
	export let version;
	export let data = {};
	export let pro = false;

	let character, lightcone, bannerID, featured, runNumber, bannerName;

	$: locked = pro && !$proUser;
	$: ({ character, lightcone } = data);
	$: ({ bannerID, featured } = character);
	$: ({ runNumber, bannerName } = identifyBanner(bannerID));

	const navigate = getContext('navigate');
	const selectBanner = () => {
		if (locked) return;
		playSfx();
		if ($activePhase === phase && $activeVersion === version) return navigate('index');

		activeVersion.set(version);
		activePhase.set(phase);
		activeBanner.set(0);
		localConfig.set('version', `${version}-${phase}`);
		navigate('index');
	};
</script>

{#key bannerName}
	<div class="col" class:locked in:fade={{ duration: 300 }}>
		<button on:click={selectBanner} disabled={locked}>
			<div class="banner-pic">
				<picture>
					<img
						use:lazyLoad={assetPath(`banners/events/${bannerName}-${runNumber}.webp`)}
						alt={$t(`banner.${bannerName}`)}
						crossorigin="anonymous"
					/>
				</picture>
				{#if pro}
					<span class="phase">
						<i class="hsr-star" />
						<i class="hsr-star" />
						<i class="hsr-star" />
					</span>
				{:else}
					<span class="phase"> {$t('phase')} {phase} </span>
				{/if}

				{#if locked}
					<div class="lock">
						<span>
							<i class="hsr-lock" style="transform:translateY(15%); display:inline-block" /> Locked
						</span>
					</div>
				{/if}
			</div>
			<caption>
				{$t(featured)} & {$t(lightcone.featured)}
			</caption>
		</button>
	</div>
{/key}

<style>
	.col {
		flex-basis: 25%;
		padding: 0 0.5%;
		max-width: 300px;
	}

	@media screen and (max-width: 900px) {
		.col {
			flex-basis: 33.333333%;
			max-width: 33.333333%;
		}
	}

	:global(.mobileLandscape) .col {
		flex-basis: 25%;
		max-width: 25%;
	}

	@media screen and (max-width: 570px) {
		.col {
			flex-basis: 50%;
			max-width: 50%;
		}
	}

	button {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		border-top-right-radius: 1.5rem;
		border: 0.15rem solid transparent;
		transition: all 0.25s;
		width: 100%;
	}

	img,
	picture {
		width: 100%;
	}

	.banner-pic {
		width: 100%;
		border-top-right-radius: 1.5rem;
		overflow: hidden;
		position: relative;
		aspect-ratio: 16/9;
		background-size: 400%;
		background-image: linear-gradient(90deg, #fbf6ee 30%, #ccc, #fbf6ee);
		animation: infinite alternate 2s skeleton;
	}

	.banner-pic .lock {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.9);
		color: var(--color-second);
		opacity: 0.7;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@keyframes skeleton {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: 300% 0;
		}
	}

	.banner-pic span.phase {
		background-color: rgba(163, 107, 94, 0.95);
		color: #f6d8a0;
		position: absolute;
		top: 0;
		right: 0;
		border-bottom-left-radius: 1.25rem;
		padding: 0.25rem 0.8rem;
	}

	caption {
		display: block;
		width: 100%;
		color: var(--color-second);
		opacity: 0.8;
		padding: 2% 2% 5%;
		transition: opacity 0.25s;
		font-size: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	button:hover caption {
		opacity: 1;
	}

	button:hover {
		border-color: rgba(255, 255, 255, 0.5);
	}
</style>
