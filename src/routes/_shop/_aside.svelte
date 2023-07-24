<script>
	import { getContext } from 'svelte';
	import NavLink from '$lib/components/NavLink.svelte';
	import NavLinkItem from '$lib/components/NavLinkItem.svelte';
	import { t } from 'svelte-i18n';

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
		{$t('shop.recomended')}
	</NavLinkItem> -->

	<NavLinkItem
		icon="starlight"
		active={activeShop === 'starlight'}
		on:click={() => selectShop('starlight')}
	>
		{$t('shop.starlight')}
	</NavLinkItem>

	<NavLinkItem icon="embers" active={activeShop === 'embers'} on:click={() => selectShop('embers')}>
		{$t('shop.embers')}
	</NavLinkItem>

	<NavLinkItem
		icon="more"
		active={activeShop === 'oneiricPouch'}
		on:click={() => selectShop('oneiricPouch')}
	>
		{$t('shop.oneiricPouch')}
	</NavLinkItem>

	<NavLinkItem
		icon="stellar-jade"
		active={activeShop === 'stellarTrade'}
		on:click={() => selectShop('stellarTrade')}
	>
		{$t('shop.stellarTrade')}
	</NavLinkItem>

	<NavLinkItem icon="honor" active={activeShop === 'donate'} on:click={() => selectShop('donate')}>
		{$t('shop.donate')}
	</NavLinkItem>
</NavLink>
