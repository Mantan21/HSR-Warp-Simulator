<script>
	import { t } from 'svelte-i18n';
	import { regularPass, specialPass, stellarJade } from '$lib/stores/app-store';
	import { getBannerName } from '$lib/helpers/text-proccesor';

	import ButtonIcon from '$lib/components/ButtonIcon.svelte';
	import MyFund from '$lib/components/MyFund.svelte';
	import Header from '$lib/components/Header.svelte';

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

<Header icon="warp" h1={$t('warp.heading')} h2={nameOfBanner(bannerType)} hideDesktopIcon>
	<div class="budget">
		<MyFund type={event ? 'specialpass' : 'regularpass'}>∞</MyFund>
		<MyFund type="stellarjade">∞</MyFund>
	</div>
	<div class="close">
		<ButtonIcon />
	</div>
</Header>
