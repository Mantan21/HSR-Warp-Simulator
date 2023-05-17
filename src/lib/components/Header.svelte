<script>
	export let hideDesktopIcon = false;
	export let icon = '';
	export let h1 = '';
	export let h2 = '';
	export let relative = false;
</script>

<header class:relative>
	<div class="head-title">
		<div class="logo" class:showLogo={!hideDesktopIcon}>
			<i class="hsr-{icon}" />
		</div>
		<div class="heading">
			<h1>{h1}</h1>
			<h2>{h2}</h2>
		</div>
	</div>

	<div class="row">
		<slot />
	</div>
</header>

<style>
	header {
		width: 100%;
		padding: 3.7vh 2% 0;
		z-index: +2;
		display: flex;
		align-items: center;
		position: absolute;
		top: 0;
		left: 0;
	}

	header.relative {
		position: relative;
	}

	.row {
		margin-left: auto;
		text-align: right;
		width: fit-content;
		display: flex;
		align-items: center;
	}

	:global(.mobileLandscape) header {
		padding: 1.5vh 5%;
	}

	.head-title {
		display: flex;
		align-items: center;
	}

	.logo {
		color: var(--color-second);
		line-height: 0;
		padding-right: calc(0.005 * var(--screen-width));
		display: none;
		font-size: 250%;
	}

	.showLogo.logo,
	:global(.mobileLandscape) .logo {
		display: unset;
	}
	:global(.mobileLandscape) .logo {
		font-size: 1.4rem;
	}

	.heading h1 {
		color: var(--color-second);
		font-size: 110%;
	}

	:global(.mobileLandscape) .heading h1 {
		font-size: 85%;
	}

	.heading h2 {
		margin-top: calc(0.001 * var(--screen-width));
		white-space: nowrap;
		font-size: 140%;
	}
	:global(.mobileLandscape) .heading h2 {
		font-size: 110%;
	}
</style>
