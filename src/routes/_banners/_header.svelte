<script>
	import { regularPass, specialPass, stellarJade } from '$lib/stores/app-store';
	import ButtonClose from '$lib/components/ButtonClose.svelte';
	import MyFund from '$lib/components/MyFund.svelte';
	import HeaderTitle from '$lib/components/HeaderTitle.svelte';
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

<header>
	<div class="row">
		<HeaderTitle icon="warp" h1="Warp" h2={nameOfBanner(bannerType)} />
	</div>
	<div class="budget">
		<MyFund type={event ? 'specialpass' : 'regularpass'}>{balance}</MyFund>
		<MyFund type="stellarjade">{$stellarJade}</MyFund>
	</div>
	<div class="close">
		<ButtonClose />
	</div>
</header>

<style>
	header {
		width: 100%;
		padding: 3.7vh 2% 0;
		position: absolute;
		top: 0;
		left: 0;
		z-index: +2;
		display: flex;
		align-items: center;
	}

	.budget {
		margin-left: auto;
		text-align: right;
		width: fit-content;
	}

	:global(.mobileLandscape) header {
		padding: 1.5vh 5%;
	}
</style>
