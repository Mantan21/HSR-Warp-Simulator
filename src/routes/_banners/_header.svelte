<script>
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { playSfx } from '$lib/helpers/audio';
	import { regularPass, specialPass, stellarJade, warpAmount } from '$lib/stores/app-store';

	import Header from '$lib/components/Header.svelte';
	import MyFund from '$lib/components/MyFund.svelte';
	import ButtonIcon from '$lib/components/ButtonIcon.svelte';
	import { removeDash } from '$lib/helpers/text-proccesor';

	export let bannerType = '';
	export let bannerName = '';
	export let beta = false;

	$: event = bannerType.match('event');
	$: balance = event ? $specialPass : $regularPass;
	$: unlimitedWarp = $warpAmount === 'unlimited';
	$: bannerTitle = beta ? removeDash(bannerName) : $t(`banner.${bannerName}`);

	const navigate = getContext('navigate');
	const openAllBanners = () => {
		playSfx();
		navigate('allbanner');
	};
</script>

<Header icon="warp" h1={$t('warp.heading')} h2={bannerTitle} hideDesktopIcon>
	<div class="budget">
		<MyFund type={event ? 'specialPass' : 'regularPass'}>
			{unlimitedWarp ? '∞' : balance}
		</MyFund>
		<MyFund type="stellarJade" plusbutton>
			{unlimitedWarp ? '∞' : $stellarJade}
		</MyFund>
	</div>
	<div class="close">
		<ButtonIcon on:click={openAllBanners} />
	</div>
</Header>
