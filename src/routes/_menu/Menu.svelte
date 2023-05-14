<script>
	import { getContext, setContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import ButtonIcon from '$lib/components/ButtonIcon.svelte';
	import Header from '$lib/components/Header.svelte';
	import Settings from './_settings.svelte';

	const closeMenu = getContext('toggleMenu');
	let activeMenu = 'setting';

	let activeOption = '';
	const openOption = (option) => (activeOption = option);
	setContext('openOption', openOption);
</script>

<section transition:fade={{ duration: 200 }} on:mousedown={() => openOption('')}>
	<Header h1="Menu" h2={activeMenu} icon="menu" relative>
		<div class="close">
			<ButtonIcon on:click={closeMenu} />
		</div>
	</Header>

	<div class="container">
		<Settings {activeOption} />
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
	}
</style>
