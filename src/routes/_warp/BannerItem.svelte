<script>
	import { getContext, setContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { fade, fly } from '$lib/helpers/transition';
	import {
		activeBanner,
		isMobile,
		isMobileLandscape,
		probEdit,
		showStarterBanner,
		viewportHeight,
		viewportWidth
	} from '$lib/stores/app-store';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import { localrate } from '$lib/helpers/dataAPI/api-localstorage';

	import Modal from '$lib/components/Modal.svelte';
	import BnCharacter from './banner-card/_bn-character.svelte';
	import BnStarter from './banner-card/_bn-starter.svelte';
	import BnLightcone from './banner-card/_bn-lightcone.svelte';
	import BnRegular from './banner-card/_bn-regular.svelte';
	import CharacterFrame from './banner-card/_character-frame.svelte';
	import LightconeFrame from './banner-card/_lightcone-frame.svelte';
	import RegularFrame from './banner-card/_regular-frame.svelte';
	import StarterFrame from './banner-card/_starter-frame.svelte';
	import ProbabilityEditor from './probability-editor.svelte';

	export let banner = 'starter';
	export let bannerIndex;
	export let item = {};

	let bannerWidth;
	$: fit = $viewportHeight * ($isMobileLandscape ? 1.9 : 1.7) > $viewportWidth;
	$: fullscreen = $isMobileLandscape || $isMobile || $viewportWidth < 700;

	let showModalReset = false;
	setContext('showModalReset', () => {
		showModalReset = true;
	});

	const confirmModal = () => {
		playSfx();
		localrate.reset(banner);
		probEdit.set(false);
		showModalReset = false;
	};

	const cancelModal = () => {
		showModalReset = false;
		playSfx('modal-close');
	};
	setContext('closeModal', cancelModal);

	const beforeMoving = getContext('beforeMoving');
	const slideOut = (node) => {
		beforeMoving.set(bannerIndex);
		const animate = bannerIndex < $activeBanner;
		const y = animate ? -300 : 300;
		return fly(node, { y, duration: 500 });
	};

	const slideIn = (node, args) => {
		if (args.fade) return fade(node, {});
		const animate = bannerIndex < $beforeMoving;
		const y = animate ? -300 : 300;
		return fly(node, { y, duration: 500 });
	};
</script>

<section class={banner}>
	<div
		class="wrap"
		class:fit
		class:inEdit={$probEdit}
		style="--bw:{bannerWidth}px;"
		class:shadow={banner !== 'starter'}
		bind:clientWidth={bannerWidth}
		in:slideIn|local={{ fade: banner === 'starter' }}
		out:slideOut|local
	>
		{#if banner === 'starter'}
			<BnStarter />
			<div class="frame">
				<StarterFrame />
			</div>

			<!-- Regular -->
		{:else if banner === 'regular'}
			<BnRegular />
			<div class="frame">
				<RegularFrame />
			</div>

			<!-- Character -->
		{:else if banner === 'character-event'}
			<BnCharacter {item} />
			<div class="frame">
				<CharacterFrame
					event2={bannerIndex > 1 || (!$showStarterBanner && bannerIndex > 0)}
					{item}
				/>
			</div>

			<!-- Lightcone -->
		{:else if banner === 'lightcone-event'}
			<BnLightcone {item} />
			<div class="frame">
				<LightconeFrame
					{item}
					event2={bannerIndex > 3 || (!$showStarterBanner && bannerIndex > 2)}
				/>
			</div>
		{/if}

		<!-- Probability Controller -->
		{#if !fullscreen}
			<div class="prob-manager {banner}" class:inEdit={$probEdit}>
				{#if $probEdit && banner !== 'starter'}
					<ProbabilityEditor {banner} />
				{/if}
			</div>
		{/if}
	</div>
</section>

<!-- Probability Controller  Fullscreen -->
{#if fullscreen}
	<div class="prob-manager fullscreen {banner}" class:inEdit={$probEdit}>
		{#if $probEdit && banner !== 'starter'}
			<ProbabilityEditor fullscreen {banner} />
		{/if}
	</div>
{/if}

{#if showModalReset}
	<Modal title="Back to Default" on:cancel={cancelModal} on:confirm={confirmModal}>
		<div class="modal-content">
			<p>
				{@html $t('editor.resetPrompt', { values: { banner: $t(`banner.${banner}`) } })}
			</p>
		</div>
	</Modal>
{/if}

<style>
	section {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1;
	}

	.frame {
		position: absolute;
		top: 0;
		left: 0;
		color: #fff;
		width: 100%;
		height: 100%;
	}

	.wrap {
		width: 100%;
		max-width: 130vh;
		aspect-ratio: 1.7/1;
		transform: translate(6.3%, 3.4%);
		position: relative;
		z-index: -1;
	}
	.shadow {
		box-shadow: 0.2rem -0.2rem 0.2rem rgba(0, 0, 0, 0.2), -0.2rem -0.2rem 0.2rem rgba(0, 0, 0, 0.2);
	}

	:global(.mobileLandscape) .wrap {
		aspect-ratio: 1670/825;
		max-width: 155vh;
		transform: translate(6.3%, 4.2%);
	}

	.wrap.fit {
		width: 75%;
		transform: translate(10%, 3.4%);
	}

	.transition-wrapper {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	.detail-btn {
		position: absolute;
		left: 15%;
		bottom: 8%;
		transform: translateX(-50%);
	}

	@media screen and (max-width: 750px) {
		.wrap.fit {
			transform: unset;
			width: 85%;
		}
	}

	/* prob Manager */
	.prob-manager {
		height: 100%;
		width: 29.3%;
		top: 0;
		left: 0;
		position: absolute;
		background-color: transparent;
		background-image: linear-gradient(rgba(255, 255, 255, 0.9) 85%, transparent);
		border-top-right-radius: calc(0.05 * var(--bw));
		transition: all 0.5s;
	}

	.prob-manager.inEdit {
		border-radius: 0;
		width: 100%;
		background-color: #fff;
	}

	.prob-manager.starter {
		display: none;
	}

	.prob-manager.lightcone-event:not(.inEdit) {
		opacity: 0;
	}

	.prob-manager.fullscreen {
		position: fixed;
		width: var(--screen-width);
		height: var(--screen-height);
		opacity: 0;
		z-index: +10;
		pointer-events: none;
		transition: opacity 0.5s;
	}
	.prob-manager.fullscreen.inEdit {
		pointer-events: unset;
		opacity: 1;
	}
</style>
