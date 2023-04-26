<script>
	import { regularPass, specialPass, stellarJade } from '$lib/stores/app-store';
	import ButtonClose from '$lib/components/ButtonClose.svelte';
	import MyFund from '$lib/components/MyFund.svelte';

	export let bannerType = '';
	$: event = ['lightcone', 'character'].includes(bannerType);
	$: balance = event ? $specialPass : $regularPass;
</script>

<header>
	<div class="warp">
		<h1>Warp</h1>
		<h2>Depature Warp</h2>
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

	.warp h1 {
		color: var(--color-second);
		font-size: 110%;
	}

	.warp h2 {
		margin-top: 2%;
		font-size: 130%;
		white-space: nowrap;
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
