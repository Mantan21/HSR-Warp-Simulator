<script>
	import { getContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { saveAs } from 'file-saver';

	import { APP_TITLE } from '$lib/data/site-setup.json';
	import { initialAmount } from '$lib/data/warp-setup.json';
	import { isMobile } from '$lib/stores/app-store';
	import { scale, fly } from '$lib/helpers/transition';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import { copy } from '$lib/helpers/text-proccesor';
	import Icon from '$lib/components/Icon.svelte';
	import ButtonIcon from '$lib/components/ButtonIcon.svelte';

	export let blob;
	export let isFirstTIme = false;
	export let shareURL = '';

	$: shareLink = shareURL || window.location.origin;
	let shareText = $t('warp.sharingTxt');
	let showToast = false;

	const closeShot = getContext('closeShot');
	const firstTime = getContext('firsTimeShare');

	const addFunds = () => {
		if (!isFirstTIme || !shareURL) return;
		firstTime();
	};

	const DOMURL = window.URL || window.webkitURL;
	$: screenshotURL = DOMURL.createObjectURL(blob);

	const copyHandle = async () => {
		playSfx('click2');
		copy(shareLink);
		showToast = true;
		const t = setTimeout(() => {
			showToast = false;
			clearTimeout(t);
		}, 2000);
		addFunds();
	};

	const saveHandler = () => {
		playSfx('click2');
		saveAs(blob, `HSR.WishSimulator.App - ${new Date().toLocaleString()}.png`);
		addFunds();
	};

	const facebookHandle = () => {
		playSfx('click2');
		const url = `https://www.facebook.com/sharer/sharer.php?u=${shareLink}&quote=${shareText}`;
		window.open(url, '_blank');
		addFunds();
	};

	const twitterHandle = () => {
		playSfx('click2');
		const url = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareLink}`;
		window.open(url, '_blank');
		addFunds();
	};

	// const pinterestHandle = () => {
	// 	const url = `https://www.pinterest.com/pin/create/button?url=${shareLink}&description=${shareText}&media=${screenshotURL}`;
	// 	window.open(url, '_blank');
	// 	addFunds();
	// };

	const webShareHandle = async () => {
		try {
			playSfx('click2');
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
			const dataToShare = attachPic && $isMobile ? dataWithPic : generalDataToShare;

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

		{#if shareURL}
			<button class="shareableLink" title="Copy Link" on:click={copyHandle}>
				<span class="link"> {shareLink} </span>
				<span class="icon">
					<i class="hsr-clone" />
				</span>
			</button>
		{/if}

		<div class="social-button" transition:fade>
			{#if shareURL}
				<button on:click={facebookHandle}> <i class="hsr-facebook" /> </button>
				<button on:click={twitterHandle}> <i class="hsr-twitter" /> </button>
				<!-- <button on:click={pinterestHandle}> <i class="hsr-pinterest" /> </button> -->
				{#if navigator.share}
					<button on:click={webShareHandle}> <i class="hsr-dot-3" /> </button>
				{/if}
			{/if}
			<button on:click={saveHandler}> <i class="hsr-save" /> </button>
		</div>

		{#if isFirstTIme && shareURL}
			<div class="first-time">
				<span>
					{$t('warp.firstShareObtain', { values: { reward: initialAmount.shareReward } })}
					<Icon type="stellarJade" />
				</span>
			</div>
		{/if}
	</div>

	{#if showToast}
		<div class="toast" in:fly={{ y: 10 }} out:fade>Copied to Clipboard</div>
	{/if}
</div>

<style>
	.close {
		position: fixed;
		top: 3.7vh;
		right: 2%;
		z-index: +25;
	}

	.toast {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: inline-block;
		padding: 0.5rem 1rem;
		border-radius: 0.5rem;
		background-color: rgba(173, 128, 65, 0.8);
		color: #fff;
		font-size: 0.75rem;
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
		padding: 1.5%;
		padding-bottom: 4%;
		box-shadow: 0 1rem 1.5rem rgba(0, 0, 0, 0.75);
	}

	.shot-result img {
		max-height: calc(0.5 * var(--screen-height));
		max-width: 70vw;
	}

	/* Shareable Link */
	.shareableLink {
		display: inline-flex;
		align-items: center;
		width: 75%;
		padding: 0 1rem;
	}

	.shareableLink span {
		color: #fff;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		display: block;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding: 0.5rem;
		margin-top: 1%;
	}

	.shareableLink .icon {
		color: #fff;
		font-size: 120%;
		width: 35px;
		aspect-ratio: 1/1;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		line-height: 0;
		border: 0.1rem solid transparent;
		transition: all 0.25s;
		border-radius: 100%;
	}

	.shareableLink:hover .link {
		text-decoration: underline;
	}
	.shareableLink:hover .icon {
		border-color: #fff;
	}
	.icon:hover {
		background-color: rgba(255, 255, 255, 0.9);
		color: #000;
	}
	.shareableLink:active .icon,
	.icon:active {
		transform: scale(0.9);
	}

	/* First Time Bonus */
	.first-time {
		position: relative;
		width: 100%;
	}
	.first-time span {
		width: 100%;
		text-align: center;
		display: block;
	}
	.first-time :global(img) {
		transform: translateY(30%);
	}
	:global(.mobileLandscape) .first-time :global(img) {
		width: 20px;
	}

	.social-button {
		width: 75%;
		min-width: fit-content;
		background-color: rgba(0, 0, 0, 0.35);
		border-radius: 5rem;
		text-align: center;
		padding: 2% 5%;
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
		padding: 1%;
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
		.social-button {
			padding: 1rem;
		}
	}

	@media screen and (max-width: 400px) {
		.shot-wrapper {
			width: 100%;
			height: 100%;
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
