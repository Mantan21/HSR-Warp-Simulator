<script>
	import NavLink from '$lib/components/NavLink.svelte';
	import NavLinkItem from '$lib/components/NavLinkItem.svelte';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import { getContext } from 'svelte';

	export let horizontal = false;
	export let activeMenu;

	const selectMenu = getContext('selectMenu');
	const select = (selected) => {
		if (selected === activeMenu) return;
		playSfx('sidebar-click');
		selectMenu(selected);
	};
</script>

<div class="nav" class:horizontal>
	<NavLink {horizontal} notext>
		<NavLinkItem
			icon="cogs"
			active={activeMenu === 'settings'}
			on:click={() => select('settings')}
		/>
		<NavLinkItem
			icon="log"
			active={activeMenu === 'updatelog'}
			on:click={() => select('updatelog')}
		/>
		<NavLinkItem
			icon="honor"
			active={activeMenu === 'prouser'}
			on:click={() => select('prouser')}
		/>
	</NavLink>
</div>

<style>
	.nav.horizontal {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translateY(-25%);
	}
</style>
