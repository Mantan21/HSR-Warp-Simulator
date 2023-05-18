<script>
	import { getContext } from 'svelte';
	import NavLink from '$lib/components/NavLink.svelte';
	import NavLinkItem from '$lib/components/NavLinkItem.svelte';

	export let isOpen = false;
	export let activeShop;

	const selectShop = getContext('selectShop');
</script>

<NavLink dynamic {isOpen}>
	<!-- <NavLinkItem
		icon="recomended"
		active={activeShop === 'recomended'}
		on:click={() => selectShop('recomended')}
	>
		Recomended
	</NavLinkItem>

	<NavLinkItem
		icon="starlight"
		active={activeShop === 'starlight'}
		on:click={() => selectShop('starlight')}
	>
		Starlight Exchange
	</NavLinkItem>

	<NavLinkItem icon="embers" active={activeShop === 'embers'} on:click={() => selectShop('embers')}>
		Embers Exchange
	</NavLinkItem> -->

	<NavLinkItem icon="more" active={activeShop === 'oneiric'} on:click={() => selectShop('oneiric')}>
		Oneiric Pouch
	</NavLinkItem>

	<!-- <NavLinkItem
		icon="stellar-jade"
		active={activeShop === 'jade'}
		on:click={() => selectShop('jade')}
	>
		Stellar Trade
	</NavLinkItem> -->
</NavLink>
