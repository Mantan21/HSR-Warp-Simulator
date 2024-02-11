<script>
	import { dev } from '$app/environment';
	import { getContext, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import { assets } from '$lib/stores/app-store';
	import accessKey from '$lib/helpers/access-key';
	import LoadingIcon from '$lib/components/LoadingIcon.svelte';

	let input = '';
	let showForm = false;
	let isError = false;
	let onProcess = false;
	let message = '';

	let showPreview = false;
	const handlePreview = () => {
		playSfx(showPreview ? 'modal-close' : 'click2');
		showPreview = !showPreview;
	};

	const login = getContext('login');
	const handleSubmit = async () => {
		if (input.trim().length < 1) return;

		onProcess = true;
		playSfx();

		const { msg, validity } = await accessKey.verify(input);
		if (validity) return login();
		isError = true;
		onProcess = false;
		message = msg;
	};

	onMount(async () => {
		if (dev) return login();
		const { validity } = await accessKey.initialLoad();
		if (validity) return login();
		showForm = true;
	});
</script>

{#if showPreview}
	<div class="preview" on:mousedown|self={handlePreview} transition:fade={{ duration: 250 }}>
		<iframe
			src="https://www.youtube.com/embed/vaUGgsqe2c4"
			title="Pulling at Honkai: Star Rail Warp Simulator"
			frameborder="0"
			allowfullscreen
		/>
	</div>
{/if}

<div class="too-early" out:fade>
	<img
		src={$assets['background/Honkai.Star.Rail.webp']}
		alt="BG"
		class="bg"
		crossorigin="anonymous"
	/>

	<div class="container">
		{#if showForm}
			<form class="wrapper" in:fade|local>
				<div class="header">
					<h1>Honkai: Star Rail Warp Simulator</h1>
					<p>
						<b> This Site will be public at Version 1.1 Update! </b> <br />
						Early Access for
						<a
							href="https://ko-fi.com/post/AdFree-Wish-Simulator-Enjoy-Simulator-Without-Ads-G2G2DQ57O"
						>
							Members
						</a>
						only, because it's still <br />
						UNDER DEVELOPMENT
					</p>
					<a
						href="https://youtu.be/vaUGgsqe2c4"
						class="button-watch"
						on:click|preventDefault={handlePreview}
					>
						<span> ▶ </span> Watch Preview
					</a>
				</div>

				<div class="input">
					<input type="text" bind:value={input} placeholder="Input Access Key" />
					{#if isError && !onProcess}
						<div class="error" in:fade={{ duration: 200 }}>{$t(message)}</div>
					{/if}
				</div>
				<div class="footer">
					<button on:click={handleSubmit} disabled={input.trim().length < 1}>
						<i class="hsr-bulb" />
						{#if onProcess}
							<span class="verify"> Verifying... </span>
						{:else}
							<span> Load Simulator </span>
						{/if}
					</button>
				</div>
			</form>
		{:else}
			<div class="wrapper">
				<div class="checking-local">
					<div class="loader">
						<LoadingIcon />
					</div>
					<span class="verify">Checking Stored Key</span>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	.too-early {
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	a {
		text-decoration: underline;
		transition: all 0.25s;
	}
	a:hover {
		color: orange;
	}

	a.button-watch {
		color: rgb(237, 156, 6);
		border: 0.2rem solid rgb(237, 156, 6);
		padding: 0.35rem 1.5rem;
		display: inline-block;
		border-radius: 2rem;
		text-decoration: none;
		margin-top: 1rem;
		margin-bottom: -1rem;
	}

	a.button-watch:hover {
		background-color: rgb(237, 156, 6);
		color: #fff;
	}

	.preview {
		position: fixed;
		z-index: +100;
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.25);
		backdrop-filter: blur(8px);
	}

	iframe {
		width: 90%;
		max-width: 900px;
		aspect-ratio: 16/9;
	}

	img {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		min-width: 100vw;
		min-height: 100vh;
		filter: blur(10px);
	}

	.header {
		padding: 3% 5%;
	}

	.container {
		max-width: 90%;
		width: 600px;
		position: relative;
	}
	:global(.mobileLandscape) .container {
		min-width: 400px;
		width: 50%;
	}

	.wrapper {
		color: #000;
		background-color: rgba(255, 255, 255, 0.8);
		text-align: center;
		backdrop-filter: blur(10px);
		border-top-right-radius: 5vh;
		position: relative;
		z-index: 2;
	}

	.checking-local {
		padding: 5% 2%;
		font-size: 120%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}

	.container::before {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		border: 2px solid var(--color-second);
		mask-image: linear-gradient(45deg, black 50%, transparent 80%);
		transform: translate(-1.5%, 3%);
		opacity: 0.35;
	}

	h1 {
		font-size: 200%;
		color: orange;
		padding: 0 2% 3%;
		border-bottom: 1px solid #ccc;
	}

	p {
		font-size: 120%;
		padding: 5% 2% 0;
	}

	.input {
		padding: 2% 0 7%;
		position: relative;
	}

	.error {
		color: #ee6c4c;
		padding-bottom: 3%;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
	}

	input {
		font-family: var(--hsr-neue);
		padding: 2% 5%;
		border-radius: 2rem;
		outline: unset;
		border-color: rgba(0, 0, 0, 0.8);
		border-style: dotted dashed solid;
		border-width: 2px;
		font-size: 200%;
		width: 80%;
		text-align: center;
		text-transform: uppercase;
		font-weight: bolder;
		background-color: transparent;
		transition: all 0.25s;
		letter-spacing: 0.5vw;
	}
	input:focus {
		background-color: rgba(255, 255, 255, 0.5);
		border-color: orange;
	}

	input::placeholder {
		font-family: var(--hsr-font);
		transform: scale(0.75);
		text-transform: capitalize;
		letter-spacing: 0;
	}

	.footer {
		background-color: rgba(0, 0, 0, 0.85);
		padding: 3%;
	}
	button {
		white-space: nowrap;
		background-color: rgba(255, 255, 255, 0.85);
		border-radius: 2rem;
		padding: 2.5% 10%;
		text-transform: uppercase;
		display: inline-block;
		line-height: 100%;
		position: relative;
		transition: all 0.2s;
	}
	button::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 80%;
		width: 96%;
		border: 1px solid #bbb;
		border-radius: 3rem;
	}

	button:not(:disabled):active {
		opacity: 0.5;
		transform: scale(0.95);
	}

	button i {
		transform: translateX(-50%);
		color: var(--color-second);
		aspect-ratio: 1/1;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		position: relative;
		font-size: 85%;
	}
	button i::after {
		content: '';
		width: 200%;
		aspect-ratio: 1/1;
		background-color: rgba(0, 0, 0, 0.85);
		border: 1px solid var(--color-second);
		border-radius: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: -1;
	}

	button span {
		display: inline-block;
		transform: translateX(6%);
	}

	.verify {
		position: relative;
	}
	.verify::after {
		position: absolute;
		bottom: 0;
		right: 0;
		transform: translateX(100%);
		content: '';
		font-size: 120%;
		animation: dot 2s linear infinite;
	}

	@keyframes dot {
		0% {
			content: '.';
		}
		25% {
			content: '..';
		}
		50% {
			content: '...';
		}
		100% {
			content: '';
		}
	}
</style>
