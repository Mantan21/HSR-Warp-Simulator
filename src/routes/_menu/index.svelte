<script>
	import { browser } from '$app/environment';
	import { setContext } from 'svelte';
	import { fade } from '$lib/helpers/transition';
	import { viewportHeight } from '$lib/stores/app-store';
	import { cookie } from '$lib/stores/cookies';
	import { playSfx } from '$lib/helpers/audio';
	import MainMenu from './Menu.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { storageReset } from '$lib/helpers/storage-reset';
	import { t } from 'svelte-i18n';
	import { writable } from 'svelte/store';
	import { localConfig } from '$lib/stores/localstorage';

	const localToggle = cookie.get('menuToggle');
	let showToggle = localToggle === undefined ? true : localToggle;

	const toggleMenuList = () => {
		playSfx();
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

	// Toggle Show Menu
	let showMenu = false;
	const toggleShowMenu = () => {
		playSfx(showMenu ? 'close' : 'setting-open');
		showMenu = !showMenu;
	};
	setContext('toggleMenu', toggleShowMenu);

	// Modal
	let isModalOpen = false;
	let modalTitle = '';
	let keepSetting = false;

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
	const autoskip = writable(localConfig.get('autoskip') || false);
	setContext('autoskip', autoskip);
	const muted = writable(localConfig.get('muted') || false);
	setContext('muted', muted);

	const clearStorage = async () => {
		playSfx();
		await storageReset({ keepSetting });
		isModalOpen = false;

		if (keepSetting) return;
		autoskip.set(false);
		muted.set(false);
	};
</script>

{#if isModalOpen}
	<Modal title={modalTitle} on:cancel={closeModal} on:confirm={clearStorage}>
		<div class="modal-content">
			<div class="caption">{$t('menu.resetPrompt')}</div>
			<div class="keep-setting">
				<div class="checkbox">
					<input type="checkbox" name="keep" id="keepsetting" bind:checked={keepSetting} />
					<span on:mousedown={() => (keepSetting = !keepSetting)} />
				</div>
				<label for="keepsetting">
					<span> Keep Settings? </span>
					<small> Current Pity, Balance and Settings will not be deleted. </small>
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
	}
	.menu.hide {
		transform: translateX(calc(-100% + 1.2rem));
	}

	@media screen and (max-width: 750px) {
		.menu {
			bottom: 13%;
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

	.keep-setting {
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

	label span {
		display: block;
	}
</style>
