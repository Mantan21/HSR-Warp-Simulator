<script>
	import { getContext, onMount, setContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import { isMobileLandscape } from '$lib/stores/app-store';
	import ButtonIcon from '$lib/components/ButtonIcon.svelte';

	import Header from '$lib/components/Header.svelte';
	import Navbar from './_navbar.svelte';
	import UpdateLog from './UpdateLog.svelte';
	import Settings from './Settings.svelte';
	import ProUser from './ProUser.svelte';

	const closeMenu = getContext('toggleMenu');
	let activeMenu = 'settings';
	const selectMenu = (menu) => (activeMenu = menu);
	setContext('selectMenu', selectMenu);

	let activeOption = '';
	const openOption = (option) => (activeOption = option);
	setContext('openOption', openOption);
	onMount(() => playSfx('setting-loaded'));
</script>

<section aria-label="" transition:fade={{ duration: 200 }} on:mousedown={() => openOption('')}>
	<Header h1={$t('menu.heading')} h2={$t(`menu.${activeMenu}`)} icon="menu" relative>
		{#if !$isMobileLandscape}
			<Navbar horizontal {activeMenu} />
		{/if}
		<div class="close" class:right={$isMobileLandscape}>
			<ButtonIcon on:click={closeMenu} />
		</div>
	</Header>

	<div class="container">
		{#if $isMobileLandscape}
			<Navbar {activeMenu} />
		{/if}

		{#if activeMenu === 'settings'}
			<Settings {activeOption} />
		{/if}

		{#if activeMenu === 'updatelog'}
			<UpdateLog />
		{/if}

		{#if activeMenu === 'prouser'}
			<ProUser />
		{/if}
	</div>
</section>

<style>
	section {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 100;
		background-color: rgba(0, 0, 0, 0.2);
		backdrop-filter: blur(15px);
	}

	.container {
		padding: 1rem 5%;
		width: 100%;
		height: 88%;
		display: flex;
	}
	.right {
		margin-left: auto;
	}
	.close {
		position: relative;
		z-index: +1;
	}
</style>
