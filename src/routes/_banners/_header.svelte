<script>
	import { regularPass, specialPass, stellarJade } from '$lib/stores/app-store';
	import ButtonIcon from '$lib/components/ButtonIcon.svelte';
	import MyFund from '$lib/components/MyFund.svelte';
	import Header from '$lib/components/Header.svelte';
	import { t } from 'svelte-i18n';
	import { getBannerName } from '$lib/helpers/text-proccesor';

	export let bannerType = '';
	export let bannerName = '';

	$: event = ['lightcone', 'character'].includes(bannerType);
	$: balance = event ? $specialPass : $regularPass;

	const nameOfBanner = (type) => {
		if (event) return $t(`banner.${getBannerName(bannerName).name}`);
		if (type === 'starter') return $t('banner.departure');
		return $t('banner.stellar');
	};
</script>

<Header icon="warp" h1="Warp" h2={nameOfBanner(bannerType)} hideDesktopIcon>
	<div class="budget">
		<MyFund type={event ? 'specialpass' : 'regularpass'}>{balance}</MyFund>
		<MyFund type="stellarjade">{$stellarJade}</MyFund>
	</div>
	<div class="close">
		<ButtonIcon />
	</div>
</Header>
