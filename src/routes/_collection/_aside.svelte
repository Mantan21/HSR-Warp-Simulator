<script>
	import { getContext, setContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import NavLink from '$lib/components/NavLink.svelte';
	import NavLinkItem from '$lib/components/NavLinkItem.svelte';

	export let activePath = 'all';
	let isOpen = false;

	setContext('navlinkToggle', () => (isOpen = !isOpen));
	const selectPath = getContext('selectPath');
	const select = (path) => {
		isOpen = false;
		selectPath(path);
	};

	const nav = [
		'all',
		'destruction',
		'hunt',
		'erudition',
		'harmony',
		'nihility',
		'preservation',
		'abundance'
	];
</script>

<NavLink {isOpen} dynamic>
	{#each nav as item}
		<NavLinkItem icon={item} active={activePath === item} on:click={() => select(item)}>
			{$t(`path.${item}`)}
		</NavLinkItem>
	{/each}
</NavLink>
