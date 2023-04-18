<script>
	import ButtonGeneral from '$lib/components/ButtonGeneral.svelte';
	import ButtonWarp from '$lib/components/banners/ButtonWarp.svelte';

	export let bannerType = 'depature';

	let footerWidth;
	$: isDepature = bannerType === 'depature';
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
				<ButtonGeneral>Records</ButtonGeneral>
			</div>
		</div>
		<div class="warp-button">
			{#if !isDepature}
				<div class="btn">
					<ButtonWarp single {bannerType}>Warp x1</ButtonWarp>
				</div>
			{/if}
			<div class="btn">
				<ButtonWarp {bannerType}>Warp x10</ButtonWarp>
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
		bottom: 3%;
		padding-right: 1rem;
	}

	@media screen and (max-width: 999px) {
		.info-button {
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
