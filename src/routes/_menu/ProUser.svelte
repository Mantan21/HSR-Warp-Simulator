<script>
	import { onMount, setContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { json, t } from 'svelte-i18n';
	import { proUser } from '$lib/stores/app-store';
	import accessKey from '$lib/helpers/access-key';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import { restartBannerVersion } from '$lib/helpers/dataAPI/storage-reader';

	import ButtonGeneral from '$lib/components/ButtonGeneral.svelte';
	import LoadingIcon from '$lib/components/LoadingIcon.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import Input from '$lib/components/Input.svelte';

	let value;
	let checkingLocal = false;
	let onProcess = false;
	let message = '';

	let showToast = false;
	let showModal = false;

	// Modal
	const confirmModal = () => {
		playSfx();
		accessKey.clear();
		checkLocal();
		proUser.set(false);
		restartBannerVersion();
		showModal = false;
		value = '';
	};
	const cancelModal = () => {
		showModal = false;
		playSfx('modal-close');
	};
	setContext('closeModal', cancelModal);
	setContext('closeToast', () => (showToast = false));

	let isOffline = false;
	let isUserKeyValid = false;
	let isError = false;
	let userKey = '';
	let dateExpired = '';

	const checkLocal = async () => {
		checkingLocal = true;
		const { validity, storedKey, status, expiryDate } = await accessKey.initialLoad();
		isOffline = status === 'offline';
		userKey = storedKey;
		isUserKeyValid = validity;
		dateExpired = expiryDate;
		if (userKey) value = userKey;
		checkingLocal = false;
	};

	const handleKey = () => {
		showModal = true;
		playSfx();
	};

	const getProAccount = async () => {
		playSfx();
		onProcess = true;
		const { msg, validity } = await accessKey.verify(value);
		isError = !validity;
		if (validity) return window.location.reload();
		message = msg;
		onProcess = false;
		showToast = true;
	};

	let showKey = false;
	const showKeyHandle = () => {
		playSfx('click2');
		showKey = !showKey;
	};

	onMount(checkLocal);
</script>

{#if showModal}
	<Modal title={$t('menu.removeKey')} on:cancel={cancelModal} on:confirm={confirmModal}>
		<div class="confirmation">
			<span>
				{$t('menu.removeKeyConfirm')}
			</span>
		</div>
	</Modal>
{/if}

{#if showToast}
	<Toast>{$t(message)}</Toast>
{/if}

<div class="pro-user">
	<div class="container">
		{#if checkingLocal}
			<div class="checking-local">
				<div class="loader">
					<LoadingIcon />
				</div>
				<span class="verify">{$t('menu.checkingKey')}</span>
			</div>
		{:else}
			<div class="form" in:fade>
				<h1 class="heading">{$t('menu.prouserHeading')}</h1>
				<div class="input-wrapper">
					<div class="input">
						<Input
							{value}
							hideValue={!showKey}
							placeholder={$t('menu.inputKeyPlaceholder')}
							error={isError || (!isUserKeyValid && userKey)}
							disabled={!!userKey}
							proInput
							on:input={(e) => ({ value } = e.detail.target)}
						/>
						{#if userKey}
							<button class="toggle-visible" on:click|preventDefault={showKeyHandle}>
								<i class="hsr-eye{!showKey ? '-slash' : ''}" />
							</button>
						{/if}
					</div>

					<div class="note">
						{#if isOffline}
							<span class="error"> {$t('menu.verifyFail')} </span>
						{:else if isUserKeyValid}
							<span class="keyValid"> {$t('menu.prouservalid')} </span>
						{:else}
							{#if dateExpired && dateExpired !== 'none'}
								<span class="error"> {$t('menu.keyExpired')}</span>
							{:else if !isUserKeyValid && userKey}
								<span class="error"> {$t('menu.invalidKey')} </span>
							{:else}
								<span> {$t('menu.noKey')} </span>
							{/if}
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
						{/if}
					</div>

					{#if userKey}
						<ButtonGeneral dark icon="trash" on:click={handleKey}>
							{$t('menu.removeKey')}
						</ButtonGeneral>
					{:else}
						<ButtonGeneral
							dark
							icon="honor"
							on:click={getProAccount}
							disabled={!value || onProcess}
						>
							{onProcess ? $t('waiting') : $t('menu.getProAccess')}
						</ButtonGeneral>
					{/if}
				</div>
			</div>
		{/if}

		<div class="benefits">
			<h2>{$t('menu.benefit')}</h2>
			<div class="row">
				<ol>
					{#each $json('menu.benefitList') as benefit}
						<li>
							{@html $t(benefit, {
								values: {
									GIWishSim:
										'<a href="https://wishsimulator.app" target="_blank"> Genshin Impact Wish Simulator </a>'
								}
							})}
						</li>
					{/each}
				</ol>
			</div>
		</div>
	</div>
</div>

<style>
	.pro-user {
		background-color: rgba(255, 255, 255, 0.85);
		width: 100%;
		height: 100%;
		border-top-right-radius: 2rem;
		color: #000;
		padding: 2%;
	}
	.container {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.heading {
		padding-top: 2%;
		font-size: 200%;
	}

	.form {
		max-width: 90%;
		width: 600px;
		position: relative;
		text-align: center;
		margin: auto;
	}

	.note {
		margin: 2% 0;
	}

	.keyValid {
		color: #4b8012;
	}
	.error {
		color: #c34b2d;
	}

	.checking-local {
		padding: 5% 2%;
		font-size: 120%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin: auto;
	}

	/* Input */
	.input-wrapper {
		padding: 3% 0;
	}
	.input {
		width: 80%;
		margin: auto;
		position: relative;
	}

	.toggle-visible {
		position: absolute;
		top: 50%;
		right: 3%;
		transform: translateY(-50%);
		padding: 0.5rem;
		aspect-ratio: 1/1;
		font-size: 150%;
		color: rgba(0, 0, 0, 0.5);
	}

	/* Benefit */
	.benefits {
		margin-top: auto;
		width: 600px;
		max-width: 100%;
		padding: 2% 5%;
	}

	@media screen and (max-width: 740px) {
		.benefits {
			margin-bottom: 8%;
		}
	}
	.benefits ol {
		transform: translateX(15px);
	}
	a,
	li :global(a) {
		color: #c58105;
	}
	a:hover,
	li :global(a):hover {
		text-decoration: underline;
	}
</style>
