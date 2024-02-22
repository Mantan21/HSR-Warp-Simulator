<script>
	import { getContext, onMount } from 'svelte';
	import { t } from 'svelte-i18n';
	import { fade, fly } from 'svelte/transition';

	import { logs } from '$lib/data/logs.json';
	import { isPWA, proUser } from '$lib/stores/app-store';
	import accessKey from '$lib/helpers/access-key';
	import { initTrack } from '$lib/helpers/sounds/phonograph';
	import { browserDetect } from '$lib/helpers/mobile-detect';
	import { playSfx } from '$lib/helpers/sounds/audiofx';

	let savedKey = '';
	let dateExpired = '';

	const retry = () => {
		console.log('reconecting...');
		const timer = setTimeout(() => {
			clearTimeout(timer);
			verifyKey();
		}, 10000);
	};

	const verifyKey = async () => {
		const { validity, status } = await accessKey.initialLoad();
		if (status === 'offline') return retry();

		proUser.set(!!validity);
		if ($isPWA) return showAd.set(false);
		showAd.set(!validity);
	};

	onMount(async () => {
		const { expiryDate, storedKey } = await accessKey.initialLoad();
		dateExpired = expiryDate;
		savedKey = storedKey;
	});

	const showAd = getContext('showAd');
	const closeWelcomeScreen = getContext('closeGreeting');
	const handleSubmit = () => {
		playSfx();
		initTrack();
		closeWelcomeScreen();
		verifyKey();
	};
</script>

<div class="welcome" out:fade>
	<div class="container">
		<div class="wrapper" out:fly={{ y: 25 }}>
			<div class="header">
				<h1>{$t('title')}</h1>
				<h2>{$t('welcomeMsg')}</h2>

				{#if !browserDetect().isSupported && $isPWA}
					<div class="updates adExpired">
						<strong>
							We highly recommend you to install
							<span style="display: inline; color:#5ab3ff"> Google Chrome </span>
							First, Maybe some features won't work properly for now!
						</strong>
					</div>
				{:else if dateExpired && dateExpired !== 'none'}
					<div class="updates adExpired">
						<div>
							{@html $t('menu.keyExpiredNotice', {
								values: { key: `<b>${savedKey}</b>`, date: `<b>${dateExpired}</b>` }
							})}
							<br />
							<a
								href="https://ko-fi.com/post/AdFree-Wish-Simulator-Enjoy-Simulator-Without-Ads-G2G2DQ57O"
								target="_blank"
							>
								{$t('menu.getNewKey')}
							</a>
							or
							<a
								style="color: #be1e2d;"
								target="_blank"
								href="https://trakteer.id/mantan21/showcase/access-key-untuk-membership-SJ9X6"
							>
								Here for Indonesian!
							</a>
						</div>
					</div>
				{:else}
					<div class="updates">
						{#each [...logs.filter(({ featured }) => featured)].reverse() as { date, changes }}
							<span>
								<i class="tgl"> {date} </i>
							</span>
							{#each changes as txt} <p>{@html txt}</p> {/each}
							<div style="height: .5rem" />
						{/each}
					</div>
				{/if}

				<h3 class="disclaimer">
					{$t('disclaimer')}
				</h3>
			</div>

			<div class="footer">
				<button on:click={handleSubmit}>
					<i class="hsr-bulb" />
					<span> {$t('loadSimulator')} </span>
				</button>
			</div>
		</div>
	</div>
</div>

<style>
	.welcome {
		position: fixed;
		z-index: +110;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(10px);
	}
	a {
		text-decoration: underline;
		transition: all 0.25s;
	}
	a:hover {
		color: orange;
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
		color: rgb(207, 137, 7);
		padding: 0 2% 3%;
		border-bottom: 1px solid #ccc;
	}
	h2 {
		font-size: 120%;
		padding: 2%;
		font-weight: normal;
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

	/* Logs Container  */
	.updates {
		text-align: left;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		background-color: #fff;
		font-size: 0.97rem;
		max-height: calc(0.15 * var(--screen-height));
		padding: 0 1rem;
		display: block;
		overflow: auto;
	}
	.updates span {
		font-weight: bold;
		color: #f7cf33;
		display: block;
		padding-top: 0.5rem;
	}
	.updates .tgl {
		color: #bd6932;
	}

	.updates p {
		padding-left: 1rem;
		position: relative;
		line-height: 1rem;
		margin: 0.5rem 0;
	}
	.updates p::before {
		content: '*';
		display: inline-block;
		width: 10px;
		line-height: 0;
		font-size: 1.3rem;
		padding-top: 0.5rem;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}

	.adExpired {
		text-align: center;
		font-size: 125%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 1rem;
	}

	.disclaimer {
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		font-size: 90%;
		font-weight: normal;
		padding-top: 2%;
		line-height: 100%;
	}
</style>
