<script>
	import CharacterFrame from '$lib/components/banners/frames/_character-frame.svelte';
	import DepatureFrame from '$lib/components/banners/frames/_depature-frame.svelte';
	import LightconeFrame from '$lib/components/banners/frames/_lightcone-frame.svelte';
	import StellarFrame from '$lib/components/banners/frames/_stellar-frame.svelte';
	import { viewportHeight, viewportWidth } from '$lib/stores/app-store';
	import BnCharacter from './_bn-character.svelte';
	import BnDepature from './_bn-depature.svelte';
	import BnLightcone from './_bn-lightcone.svelte';
	import BnStellar from './_bn-stellar.svelte';

	export let banner = 'depature';
	let bannerWidth;

	$: fit = $viewportHeight * 1.7 > $viewportWidth;
</script>

<section>
	<div
		class="wrap"
		class:shadow={banner !== 'depature'}
		class:fit
		bind:clientWidth={bannerWidth}
		style="--bw:{bannerWidth}px"
	>
		{#if banner === 'depature'}
			<BnDepature />
			<div class="frame">
				<DepatureFrame />
			</div>
		{:else if banner === 'stellar'}
			<BnStellar />
			<div class="frame">
				<StellarFrame />
			</div>
		{:else if banner === 'character'}
			<BnCharacter />
			<div class="frame">
				<CharacterFrame />
			</div>
		{:else if banner === 'lightcone'}
			<BnLightcone />
			<div class="frame">
				<LightconeFrame />
			</div>
		{/if}
	</div>
</section>

<style>
	section {
		width: 100%;
		height: 100%;
		/* background-image: url('/images/background/standard.jpg'); */
		/* background-image: url('/images/background/cones.jpg'); */
		background-size: cover;
		background-position: center;
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
		transform: translate(6.3%, 2%);
	}

	.wrap.fit {
		width: 75%;
		transform: translate(10%, 3.4%);
	}

	@media screen and (max-width: 750px) {
		.wrap.fit {
			transform: unset;
			width: 85%;
		}
	}
</style>
