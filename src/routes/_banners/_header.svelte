<script>
	import ButtonClose from '$lib/components/ButtonClose.svelte';
	import MyFund from '$lib/components/MyFund.svelte';
	import { regularPass, stellarJade } from '$lib/stores/app-store';
</script>

<header>
	<div class="warp">
		<h1>Warp</h1>
		<h2>Depature Warp</h2>
	</div>
	<div class="budget">
		<MyFund type="regularpass">{$regularPass}</MyFund>
		<MyFund type="stellarjade">{$stellarJade}</MyFund>
	</div>
	<div class="close">
		<ButtonClose />
	</div>
</header>

<style>
	header {
		width: 100%;
		padding: 0 2%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: +1;
		display: flex;
		align-items: center;
		padding-top: 3vh;
	}

	.warp h1 {
		color: var(--color-second);
		font-size: 115%;
	}

	.warp h2 {
		font-size: 135%;
		white-space: nowrap;
	}

	.budget {
		margin-left: auto;
		text-align: right;
		width: fit-content;
	}
</style>
