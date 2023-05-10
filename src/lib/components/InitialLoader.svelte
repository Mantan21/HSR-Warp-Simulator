<script>
	import { getContext, onMount } from 'svelte';
	import { assetPath, blobAssets, listingAssets } from '$lib/helpers/assets';
	import { assets } from '$lib/stores/app-store';

	let anyError = false;
	let current = 0;
	$: percentage = current > 99 ? 100 : current.toFixed();

	const handleLoaded = getContext('loaded');

	const assetInit = async () => {
		const arr = [];
		let i = 0;
		const raw = listingAssets();
		for await (const assetData of raw) {
			i++;
			const { path, asset } = assetData;
			const blob = await blobAssets(path);
			if (blob === 'error') anyError = true;
			arr.push({ url: blob, name: asset });
			current = (i / raw.length) * 100;
		}

		const loadedAssets = await Promise.all(arr);
		assets.update((pv) => {
			pv = {};
			loadedAssets.forEach(({ url, name }) => (pv[name] = url));
			return pv;
		});

		if (anyError === false) handleLoaded();
	};

	onMount(assetInit);
</script>

{#if anyError}
	<div class="modal">
		<div class="modal-content">
			<div class="msg">
				An error occurred while trying to load some assets, this may affect your wish experience.
				<br />
				<small>
					<small>
						If you think this is a mistake, please contact me on
						<a
							href="https://discord.com/users/523179264116523018"
							target="_blank"
							style="color: #7289da"
						>
							Discord
						</a>!
					</small>
				</small>
			</div>
			<div class="btn">
				<button class="reload" on:click={() => window.location.reload()}>Reload</button>
				<button class="open" on:click={handleLoaded}>Open Anyway</button>
			</div>
		</div>
	</div>
{/if}

<section>
	<div class="wrapper">
		<div class="ornament ornament1">
			<img
				src={assetPath('utils/loading-ornament.svg')}
				alt="Loader Circle"
				crossorigin="anonymous"
			/>
		</div>
		<div class="ornament ornament2" />
		<div class="ornament ornament3" />
		<div class="text">
			<div class="loading">{percentage < 1 ? 'WAITING' : 'LOADING'}</div>
			{#if percentage > 0}
				<div class="percentage">{percentage}</div>
				<div class="hsr-text">LOADING</div>
			{/if}
		</div>
	</div>
</section>

<style>
	/* Star Modal */
	.modal {
		position: fixed;
		z-index: 9999;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(8px);
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
	}

	.modal-content {
		background-color: #fff;
		border-radius: 0.4rem;
		width: 500px;
		max-width: 80%;
		padding: 2%;
		color: #0e0e0e;
		font-size: 150%;
	}

	.btn {
		padding-top: 5%;
		width: 100%;
	}
	button {
		color: #fff;
		padding: 2% 6%;
	}

	.reload {
		background-color: #94866e;
	}

	.open {
		background-color: #353533;
	}
	/* End Modal */

	section {
		width: 100%;
		height: 100%;
		background-image: linear-gradient(to bottom, #101010, #0e0e0e);
		background-size: cover;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 9980;
	}

	.wrapper {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		max-height: 55vw;
		max-width: 190vh;
		text-align: center;
		mask-image: linear-gradient(transparent, black 10%, black 80%, transparent);
	}
	.text {
		position: relative;
		width: 100%;
	}

	.percentage {
		font-family: 'Novecento', sans-serif !important;
		font-size: calc(0.37 * var(--screen-width));
		transform: translateY(-10%);
		background-clip: text;
		text-fill-color: transparent;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.08));
	}

	.loading {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(calc(-50% + (0.0125 * var(--screen-width))), -50%);
		color: #d1aa6f;
		font-weight: 900;
		font-size: calc(0.025 * var(--screen-width));
		letter-spacing: calc(0.025 * var(--screen-width));
	}

	.hsr-text {
		font-family: var(--hsr-neue);
		position: absolute;
		left: 50%;
		bottom: 83%;
		transform: translate(calc(-50% + (0.03 * var(--screen-width))), -50%);
		color: rgba(255, 255, 255, 0.5);
		font-size: calc(0.01 * var(--screen-width));
		letter-spacing: calc(0.06 * var(--screen-width));
	}

	img {
		width: 100%;
	}

	.ornament {
		position: absolute;
		transform: translate(-50%, -50%);
		left: 50%;
		aspect-ratio: 1/1;
	}
	.ornament1 {
		top: 80%;
		width: 82%;
	}
	.ornament1 img {
		animation: rotate 60s reverse linear infinite;
	}
	.ornament2 {
		width: 80%;
		bottom: 10%;
		border-radius: 100%;
		border: 2px solid rgba(255, 255, 255, 0.15);
	}
	.ornament3 {
		width: 75%;
		top: 78%;
		border-radius: 100%;
		border: 1px dashed rgba(255, 255, 255, 0.12);
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
