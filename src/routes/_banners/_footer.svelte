<script>
	import { phase, version } from '$lib/stores/app-store';
	import WARP, { roll } from '$lib/helpers/gacha/Warp';
	import ButtonGeneral from '$lib/components/ButtonGeneral.svelte';
	import ButtonWarp from '$lib/components/banners/ButtonWarp.svelte';

	export let bannerType = 'starter';
	$: isStarter = bannerType === 'starter';

	let footerWidth;
	let rollCount;
	let WarpInstance;

	const initialWarp = async (version, phase) => (WarpInstance = await WARP.init(version, phase));
	$: initialWarp($version.toFixed(1).toString(), $phase);

	const doRoll = async (count, bannerToRoll) => {
		rollCount = count;
		const tmp = [];

		for (let i = 0; i < count; i++) {
			const result = await roll(bannerToRoll, WarpInstance);
			tmp.push(result);
			console.log(result.rarity, result);
		}
	};
</script>

<div class="button-container" style="--width:{footerWidth}px" bind:clientWidth={footerWidth}>
	<div class="row">
		<div class="info-button">
			<div class="btn">
				<ButtonGeneral>Exchange</ButtonGeneral>
			</div>
			<div class="btn">
				<ButtonGeneral>Collection</ButtonGeneral>
			</div>
			<div class="btn">
				<ButtonGeneral>View Details</ButtonGeneral>
			</div>
		</div>
		<div class="warp-button">
			{#if !isStarter}
				<div class="btn">
					<ButtonWarp single {bannerType} on:click={() => doRoll(1, bannerType)} />
				</div>
			{/if}
			<div class="btn">
				<ButtonWarp {bannerType} on:click={() => doRoll(10, bannerType)} />
			</div>
		</div>
	</div>
</div>

<style>
	.button-container {
		width: calc(83vw);
		position: fixed;
		bottom: 6%;
		right: 0;
		z-index: +1;
		padding-right: 7%;
	}

	.row {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: flex-end;
	}

	.info-button,
	.warp-button {
		display: flex;
		width: 100%;
	}

	.warp-button {
		margin-left: 1rem;
		justify-content: flex-end;
	}

	.btn {
		padding: 0.5%;
	}

	/* Mobile Landscape */
	:global(.mobileLandscape) .button-container {
		bottom: 4.5%;
		padding-right: 6.5%;
	}
	:global(.mobileLandscape) .warp-button {
		transform: scale(0.95);
	}

	@media screen and (max-width: 999px) {
		:global(main):not(.mobileLandscape) .info-button {
			flex-wrap: wrap;
		}
	}

	@media screen and (max-width: 750px) {
		.button-container {
			width: 100vw;
			padding: 0 1rem;
			bottom: 4%;
		}
	}

	@media screen and (max-width: 640px) {
		.warp-button {
			flex-wrap: wrap;
			width: fit-content;
		}
	}
</style>
