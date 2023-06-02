<script>
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { saveAs } from 'file-saver';
	import { APP_TITLE } from '$lib/data/site-setup.json';
	import { scale, fly } from '$lib/helpers/transition';
	import ButtonIcon from '$lib/components/ButtonIcon.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import { playSfx } from '$lib/helpers/sounds/audiofx';

	export let blob;
	export let isFirstTIme;

	let shareLink = window.location.host;
	let shareText = 'Come and try this Honkai: Star Rail Warp Simulator!';

	const closeShot = getContext('closeShot');
	const firstTime = getContext('firsTimeShare');

	const addFunds = () => {
		if (!isFirstTIme) return;
		firstTime();
	};

	const DOMURL = window.URL || window.webkitURL;
	$: screenshotURL = DOMURL.createObjectURL(blob);

	const saveHandler = () => {
		playSfx();
		saveAs(blob, `HSR.WishSimulator.App - ${new Date().toLocaleString()}.png`);
		addFunds();
	};

	const facebookHandle = () => {
		playSfx();
		const url = `https://www.facebook.com/sharer/sharer.php?u=${shareLink}&quote=${shareText}`;
		window.open(url, '_blank');
		addFunds();
	};

	const twitterHandle = () => {
		playSfx();
		const url = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareLink}`;
		window.open(url, '_blank');
		addFunds();
	};

	const pinterestHandle = () => {
		const url = `https://www.pinterest.com/pin/create/button?url=${shareLink}&description=${shareText}&media=${screenshotURL}`;
		window.open(url, '_blank');
		addFunds();
	};

	const webShareHandle = async () => {
		try {
			const generalDataToShare = {
				title: APP_TITLE,
				text: shareText,
				url: shareLink
			};

			const files = new File([blob], `HSR.WishSimulator.App - ${new Date().toLocaleString()}.png`, {
				type: blob.type,
				lastModified: new Date().getTime()
			});
			const dataWithPic = { ...generalDataToShare, files: [files] };
			const attachPic = navigator?.canShare(dataWithPic);
			const dataToShare = attachPic ? dataWithPic : generalDataToShare;

			await navigator.share(dataToShare);
			addFunds();
		} catch (e) {
			console.error('Abort Sharing', e);
		}
	};
</script>

<div class="shot-result" out:fade>
	<div class="close">
		<ButtonIcon on:click={closeShot} />
	</div>

	<div class="shot-wrapper">
		<picture in:scale={{ duration: 250, delay: 100, start: 1.4 }} out:fly={{ y: 50 }}>
			<img src={screenshotURL} alt="screenshot" on:contextmenu|stopPropagation />
		</picture>
		<div class="social-button" transition:fade>
			<button on:click={facebookHandle}> <i class="hsr-facebook" /> </button>
			<button on:click={twitterHandle}> <i class="hsr-twitter" /> </button>
			<button on:click={pinterestHandle}> <i class="hsr-pinterest" /> </button>
			{#if navigator.share}
				<button on:click={webShareHandle}> <i class="hsr-dot-3" /> </button>
			{/if}
			<button on:click={saveHandler}> <i class="hsr-save" /> </button>
		</div>

		{#if isFirstTIme}
			<div class="first-time">
				<span>
					First-time Sharing will Obtain 50
					<Icon type="stellarJade" />
				</span>
			</div>
		{/if}
	</div>
</div>

<style>
	.close {
		position: fixed;
		top: 3.7vh;
		right: 2%;
		z-index: +25;
	}

	/* Shot Wrapper */
	.shot-result {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(10px);
		z-index: +15;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.shot-result::after {
		content: '';
		display: block;
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: #fff;
		pointer-events: none;
		animation: flash forwards 0.5s;
	}
	.shot-wrapper {
		width: 60%;
		max-height: 80%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	picture {
		display: block;
		background-color: #fff;
		padding: 1%;
		padding-bottom: 2%;
		box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.75);
	}

	.shot-result img {
		max-height: 50vh;
		max-width: 70vw;
	}

	.first-time {
		position: relative;
		width: 100%;
	}
	.first-time span {
		width: 100%;
		text-align: center;
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 120%);
		display: block;
	}
	.first-time :global(img) {
		transform: translateY(30%);
	}

	.social-button {
		width: 75%;
		min-width: fit-content;
		background-color: rgba(0, 0, 0, 0.35);
		border-radius: 5rem;
		text-align: center;
		padding: 2% 5%;
		margin-top: 1%;
	}

	.social-button button {
		background-color: rgba(255, 255, 255, 0.9);
		width: 40px;
		aspect-ratio: 1/1;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		font-size: 150%;
		line-height: 0;
		border-radius: 100%;
		margin: 0 1%;
		position: relative;
		transform: scale(1.0001);
		transition: all 0.25s;
	}
	.social-button button::after {
		content: '';
		width: 80%;
		height: 80%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: inherit;
		border: 0.1rem solid #bbb;
	}

	.social-button button:hover {
		background-color: #fff;
	}
	.social-button button:active {
		transform: scale(0.9);
	}

	:global(.mobileLandscape) .social-button {
		padding: 2%;
	}
	:global(.mobileLandscape) .social-button button {
		width: 25px;
	}

	@media screen and (max-width: 900px) {
		.social-button button {
			width: 30px;
		}
		.shot-wrapper {
			width: 80%;
			height: 80%;
		}
		.shot-result img {
			max-height: 70vh;
		}
		picture {
			max-width: 90vw;
			max-height: 90vh;
		}
		.social-button {
			padding: 1rem;
		}
	}

	@media screen and (max-width: 400px) {
		.shot-wrapper {
			width: 100%;
			height: 100%;
		}
		picture {
			max-width: 90vw;
			max-height: 90vh;
		}
		.social-button {
			padding: 4%;
		}
		.social-button button {
			width: 25px;
		}
	}

	@keyframes flash {
		0% {
			opacity: 0.8;
		}
		100% {
			opacity: 0;
		}
	}
</style>
