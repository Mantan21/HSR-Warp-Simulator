<script>
	import { getContext } from 'svelte';
	import { fade, fly } from '$lib/helpers/transition';
	import {
		activeBanner,
		isMobileLandscape,
		viewportHeight,
		viewportWidth
	} from '$lib/stores/app-store';

	import BnCharacter from './banner-card/_bn-character.svelte';
	import BnStarter from './banner-card/_bn-starter.svelte';
	import BnLightcone from './banner-card/_bn-lightcone.svelte';
	import BnRegular from './banner-card/_bn-regular.svelte';
	import CharacterFrame from './banner-card/_character-frame.svelte';
	import LightconeFrame from './banner-card/_lightcone-frame.svelte';
	import RegularFrame from './banner-card/_regular-frame.svelte';
	import StarterFrame from './banner-card/_starter-frame.svelte';

	export let banner = 'starter';
	export let bannerIndex;
	export let item = {};

	let bannerWidth;
	$: fit = $viewportHeight * ($isMobileLandscape ? 1.9 : 1.7) > $viewportWidth;
	const beforeMoving = getContext('beforeMoving');

	const slideOut = (node) => {
		beforeMoving.set(bannerIndex);
		const animate = bannerIndex < $activeBanner;
		const y = animate ? -500 : 500;
		return fly(node, { y, duration: 500 });
	};

	const slideIn = (node, args) => {
		if (args.fade) return fade(node, {});
		const animate = bannerIndex < $beforeMoving;
		const y = animate ? -500 : 500;
		return fly(node, { y, duration: 500 });
	};
</script>

<section class={banner}>
	<div
		class="wrap"
		class:fit
		style="--bw:{bannerWidth}px"
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
		{:else if banner === 'regular'}
			<BnRegular />
			<div class="frame">
				<RegularFrame />
			</div>
		{:else if banner === 'character-event'}
			<BnCharacter {item} />
			<div class="frame">
				<CharacterFrame {item} />
			</div>
		{:else if banner === 'lightcone-event'}
			<BnLightcone {item} />
			<div class="frame">
				<LightconeFrame {item} />
			</div>
		{/if}
	</div>
</section>

<style>
	section {
		width: 100%;
		height: 100%;
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: -1;
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
</style>
