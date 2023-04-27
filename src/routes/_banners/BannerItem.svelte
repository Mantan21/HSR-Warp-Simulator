<script>
	import { isMobileLandscape, viewportHeight, viewportWidth } from '$lib/stores/app-store';
	import CharacterFrame from '$lib/components/banners/frames/_character-frame.svelte';
	import StarterFrame from '$lib/components/banners/frames/_starter-frame.svelte';
	import LightconeFrame from '$lib/components/banners/frames/_lightcone-frame.svelte';
	import RegularFrame from '$lib/components/banners/frames/_regular-frame.svelte';
	import BnCharacter from './_bn-character.svelte';
	import BnStarter from './_bn-starter.svelte';
	import BnLightcone from './_bn-lightcone.svelte';
	import BnRegular from './_bn-regular.svelte';

	export let banner = 'starter';
	export let item = {};

	let bannerWidth;

	$: fit = $viewportHeight * ($isMobileLandscape ? 1.9 : 1.7) > $viewportWidth;
</script>

<section class={banner}>
	<div
		class="wrap"
		class:shadow={banner !== 'starter'}
		class:fit
		bind:clientWidth={bannerWidth}
		style="--bw:{bannerWidth}px"
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
		{:else if banner === 'character'}
			<BnCharacter {item} />
			<div class="frame">
				<CharacterFrame {item} />
			</div>
		{:else if banner === 'lightcone'}
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
	.wrap.shadow {
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
