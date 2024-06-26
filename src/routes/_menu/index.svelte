<script>
	import { browser } from '$app/environment';
	import { getContext, onMount, setContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';

	import { liteMode, viewportHeight } from '$lib/stores/app-store';
	import { cookie } from '$lib/helpers/dataAPI/api-cookie';
	import { storageReset } from '$lib/helpers/dataAPI/storage-reset';
	import { localConfig } from '$lib/helpers/dataAPI/api-localstorage';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import { initTrack, isPlaying } from '$lib/helpers/sounds/phonograph';
	import { activeBacksound, muted } from '$lib/stores/phonograph-store';
	import { check as checkExpress } from '$lib/helpers/express-loader';

	import Modal from '$lib/components/Modal.svelte';
	import MainMenu from './Menu.svelte';

	const localToggle = cookie.get('menuToggle');
	let showToggle = !!localToggle;

	const toggleMenuList = () => {
		playSfx('click2');
		showToggle = !showToggle;
		cookie.set('menuToggle', showToggle);
	};

	$: fullscreen = browser ? $viewportHeight === window.screen.height : false;
	const handleFullscreen = () => {
		if (!fullscreen) {
			const body = document.body;
			if (body.requestFullscreen) return body.requestFullscreen();
			if (body.webkitRequestFullscreen) return body.webkitRequestFullscreen();
			if (body.msRequestFullscreen) return body?.msRequestFullscreen();
		} else {
			if (document.exitFullscreen) return document?.exitFullscreen();
			if (document.webkitExitFullscreen) return document?.webkitExitFullscreen();
			if (document.msExitFullscreen) return document?.msExitFullscreen();
		}
	};

	// toggle Chat
	const toggleChat = getContext('chatToggle');

	// Toggle Show Menu
	let showMenu = false;
	const toggleShowMenu = () => {
		playSfx(showMenu ? 'setting-close' : 'setting-click');
		showMenu = !showMenu;
	};
	setContext('toggleMenu', toggleShowMenu);

	// Show Modal
	const navigate = getContext('navigate');
	const openPhonograph = () => {
		playSfx();
		navigate('phonograph');
	};

	// Modal
	let isModalOpen = false;
	let modalTitle = '';
	let keepSetting = false;
	let clearCache = false;
	let storageSize = '..B';

	const toggleResetOption = (opt) => {
		playSfx('click2');
		if (opt === 'cache') {
			clearCache = !clearCache;
			return;
		}
		keepSetting = !keepSetting;
	};

	const showModal = ({ title }) => {
		modalTitle = title;
		isModalOpen = true;
	};
	const closeModal = () => {
		isModalOpen = false;
		playSfx('close');
	};

	setContext('showModal', showModal);
	setContext('closeModal', closeModal);

	// Clear Storage
	const readyToPull = getContext('readyToPull');
	const clearStorage = async () => {
		playSfx();
		await storageReset({ clearCache, keepSetting });
		isModalOpen = false;

		if (keepSetting) return;

		const soundOn = isPlaying($activeBacksound.sourceID);
		if (!soundOn) initTrack();
		readyToPull.set(await checkExpress());
		localConfig.set('litemode', $liteMode);
	};

	// Storage Size
	const getSize = async () => {
		const { usage } = await navigator.storage.estimate();
		const size = (usage / 1000000).toFixed(2);
		storageSize = `${size}MB`;
	};
	onMount(getSize);
</script>

{#if isModalOpen}
	<Modal title={modalTitle} on:cancel={closeModal} on:confirm={clearStorage}>
		<div class="modal-content">
			<div class="caption">{$t('menu.resetPrompt')}</div>
			<div class="keep-setting">
				<div class="checkbox">
					<input type="checkbox" name="keep" id="keepsetting" bind:checked={keepSetting} />
					<span role="button" tabindex="-1" on:mousedown={toggleResetOption} />
				</div>
				<label role="" for="keepsetting" on:mousedown={() => playSfx('click2')}>
					<span> {@html $t('menu.keepSetting')} </span>
				</label>
			</div>

			<div class="clear-cache">
				<div class="checkbox">
					<input type="checkbox" name="cache" id="clearCache" bind:checked={clearCache} />
					<span role="button" tabindex="-1" on:mousedown={() => toggleResetOption('cache')} />
				</div>
				<label role="" for="clearCache" on:mousedown={() => playSfx('click2')}>
					<span>{@html $t('menu.clearCache', { values: { size: storageSize } })} </span>
				</label>
			</div>
		</div>
	</Modal>
{/if}

<div class="menu" class:hide={!showToggle} transition:fade={{ duration: 250 }}>
	<div class="wrapper">
		<button title="Options" on:click={toggleShowMenu}>
			<i class="hsr-cog" />
		</button>

		{#if !$muted.bgm}
			<button title="PhonoGraph" on:click={openPhonograph}>
				<i class="hsr-phonograph" />
			</button>
		{/if}

		<button title="Feedback" on:click={toggleChat}>
			<i class="hsr-chat" />
		</button>

		<button on:click={handleFullscreen} title="Fullscreen">
			<i class="hsr-{!fullscreen ? 'fullscreen' : 'shrink'}" />
		</button>

		<button class="toggle" on:click={toggleMenuList} title="Show Menu">
			<i class="hsr-chevron-right" />
		</button>
	</div>
</div>

{#if showMenu}
	<MainMenu />
{/if}

<style>
	.menu {
		position: fixed;
		z-index: +1;
		left: 0;
		bottom: 5%;
		background-color: rgba(0, 0, 0, 0.4);
		border-top-right-radius: 1rem;
		border-bottom-right-radius: 0.2rem;
		padding: 0.5% calc(1% + 1.2rem) 0.5% 1%;
		overflow: hidden;
		transition: all 0.2s;
		backdrop-filter: blur(8px);
	}
	.menu.hide {
		transform: translateX(calc(-100% + 1.2rem));
	}

	@media screen and (max-width: 750px) {
		.menu {
			bottom: 20%;
		}
	}

	button {
		width: 2.5rem;
		aspect-ratio: 1/1;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		line-height: 0;
		font-size: 150%;
		color: #fff;
		opacity: 0.6;
		transition: all 0.25s;
	}

	button:hover {
		opacity: 1;
	}

	button:not(.toggle):active {
		transform: scale(0.9);
	}

	.toggle {
		position: absolute;
		font-size: 100%;
		width: 1.2rem;
		height: 100%;
		top: 0;
		right: 0;
		opacity: 0.8;
		background-color: var(--color-second);
	}

	/* Modal */
	.modal-content {
		font-size: 130%;
		width: 100%;
	}

	.keep-setting,
	.clear-cache {
		padding-top: 2%;
		display: flex;
		align-items: center;
		width: 100%;
		font-size: 85%;
	}

	.checkbox {
		margin-right: 2.5%;
	}
	.checkbox input {
		display: none;
	}

	.checkbox span {
		display: block;
		width: 1.2rem;
		border-radius: 100%;
		line-height: 0;
		padding: 0;
		margin: 0;
		outline: 0;
		aspect-ratio: 1/1;
		border: 0.3rem transparent solid;
		outline: 0.2rem rgb(255, 183, 49) solid;
	}

	.checkbox input:checked + span {
		background-color: orange;
		outline-color: orange;
		border-color: #fff;
	}

	label span :global(small) {
		display: block;
	}
</style>
