<script>
	export let icon = '';
	export let h1 = '';
	export let h2 = '';
</script>

<div class="head-title">
	<div class="logo">
		<i class="hsr-{icon}" />
	</div>
	<div class="heading">
		<h1>{h1}</h1>
		<h2>{h2}</h2>
	</div>
</div>

<style>
	.head-title {
		display: flex;
		align-items: center;
	}

	.logo {
		font-size: 1.4rem;
		color: var(--color-second);
		line-height: 0;
		padding-right: 8%;
		display: none;
	}

	:global(.mobileLandscape) .logo {
		display: unset;
	}

	.heading h1 {
		color: var(--color-second);
		font-size: 110%;
	}

	.heading h2 {
		margin-top: 2%;
		font-size: 130%;
		white-space: nowrap;
	}
</style>
