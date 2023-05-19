<script>
	import { t } from 'svelte-i18n';
	import { regularPass, specialPass, stellarJade, warpAmount } from '$lib/stores/app-store';
	import { getBannerName } from '$lib/helpers/text-proccesor';

	import ButtonIcon from '$lib/components/ButtonIcon.svelte';
	import MyFund from '$lib/components/MyFund.svelte';
	import Header from '$lib/components/Header.svelte';
	import { getContext } from 'svelte';
	import { playSfx } from '$lib/helpers/audio';

	export let bannerType = '';
	export let bannerName = '';

	$: event = ['lightcone', 'character'].includes(bannerType);
	$: balance = event ? $specialPass : $regularPass;
	$: unlimitedWarp = $warpAmount === 'unlimited';

	const nameOfBanner = (type) => {
		if (event) return $t(`banner.${getBannerName(bannerName).name}`);
		if (type === 'starter') return $t('banner.departure');
		return $t('banner.stellar');
	};

	const navigate = getContext('navigate');
	const openAllBanners = () => {
		playSfx();
		navigate('allbanner');
	};
</script>

<Header icon="warp" h1={$t('warp.heading')} h2={nameOfBanner(bannerType)} hideDesktopIcon>
	<div class="budget">
		<MyFund type={event ? 'specialpass' : 'regularpass'}>
			{unlimitedWarp ? '∞' : balance}
		</MyFund>
		<MyFund type="stellarjade" plusbutton>
			{unlimitedWarp ? '∞' : $stellarJade}
		</MyFund>
	</div>
	<div class="close">
		<ButtonIcon on:click={openAllBanners} />
	</div>
</Header>
