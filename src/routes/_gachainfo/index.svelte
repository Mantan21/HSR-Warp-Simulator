<script>
	import { getContext, onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { assets } from '$lib/stores/app-store';
	import { cookie } from '$lib/helpers/dataAPI/api-cookie';
	import { playSfx } from '$lib/helpers/sounds/audiofx';

	import ButtonIcon from '$lib/components/ButtonIcon.svelte';
	import Scrollable from '$lib/components/Scrollable.svelte';
	import Details from './_details/Details.svelte';
	import History from './_history/History.svelte';

	let containerWidth;
	const navigate = getContext('navigate');
	const close = () => {
		navigate('index');
		playSfx('close');
	};

	onMount(() => playSfx('paper-flip'));
	let activeInfo = cookie.get('activeInfo') || 'details';
	const selectInfo = (info) => {
		playSfx();
		activeInfo = info;
		cookie.set('activeInfo', info);
	};
</script>

<section style="--bg:url('{$assets['gachainfo-bg.webp']}')" transition:fade={{ duration: 250 }}>
	<div
		class="container"
		style="--con-bg:url('{$assets['gachainfo-bg2.webp']}'); --wd:{containerWidth}px"
		bind:clientWidth={containerWidth}
		in:fly={{ y: 100, duration: 200, delay: 250 }}
	>
		<div class="header">
			<div class="nav">
				<button class:active={activeInfo === 'details'} on:click={() => selectInfo('details')}>
					{$t('details.heading')}
				</button>

				<div class="divider" />

				<button class:active={activeInfo === 'history'} on:click={() => selectInfo('history')}>
					{$t('history.heading')}
				</button>
			</div>

			<div class="close">
				<ButtonIcon on:click={close} />
			</div>
		</div>
		<div class="info-content">
			<Scrollable dark>
				<div class="content">
					{#if activeInfo === 'details'}
						<Details />
					{/if}

					{#if activeInfo === 'history'}
						<History />
					{/if}
				</div>
			</Scrollable>
		</div>
	</div>
</section>

<style>
	section {
		width: 100%;
		height: 100%;
		background-image: var(--bg);
		background-size: cover;
		background-position: center center;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.container {
		--width: var(--wd);
		aspect-ratio: 121/63;
		width: 90%;
		max-width: 1200px;
		padding: calc(0.008 * var(--width));
		background-image: var(--con-bg);
		background-size: contain;
		background-repeat: no-repeat;
	}

	:global(.mobileLandscape) .container {
		width: unset;
		height: calc(0.85 * var(--screen-height));
	}

	.nav,
	.header {
		display: flex;
		justify-content: center;
	}

	.header {
		width: 100%;
		position: relative;
		height: calc(0.052 * var(--width));
	}

	.nav {
		align-items: center;
	}

	.close {
		position: absolute;
		right: 2.5%;
		top: 50%;
		transform: translateY(-50%);
	}

	.divider {
		width: 0.08rem;
		background-color: #fff;
		opacity: 0.75;
		height: 50%;
		margin: 0 calc(0.05 * var(--width));
	}

	.header button {
		color: #fff;
		opacity: 0.5;
		font-size: calc(0.0175 * var(--width));
		border-bottom: calc(0.003 * var(--width)) solid transparent;
		padding: calc(0.0075 * var(--width)) calc(0.025 * var(--width));
		transition: all 0.25s;
	}

	.header button.active {
		color: #dbc291;
		opacity: 1;
		border-color: #dbc291;
	}
	.header button:hover {
		opacity: 1;
	}

	.info-content {
		height: calc(0.435 * var(--width));
		color: rgba(0, 0, 0, 0.8);
		padding-top: calc(0.01 * var(--width));
		padding-bottom: calc(0.005 * var(--width));
		padding-left: calc(0.007 * var(--width));
		padding-right: calc(0.025 * var(--width));
		position: relative;
	}

	.info-content::after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 6%;
		background-image: linear-gradient(to top, rgba(246, 246, 246, 1) 10%, transparent);
	}

	.content {
		padding: 0 3%;
		font-size: calc(0.014 * var(--width));
		line-height: 150%;
	}

	@media screen and (max-width: 550px) {
		.container {
			--width: var(--screen-height) * 1.05;
			background-size: cover;
			background-position: right;
			aspect-ratio: unset;
			height: 90%;
			width: 95%;
		}

		.header {
			height: calc(0.09 * var(--screen-height));
		}

		.info-content {
			width: calc(100% + 0.029 * var(--wd));
			height: calc(0.75 * var(--screen-height));
			transform: translateX(calc(-0.022 * var(--wd)));
			padding-top: calc(0.02 * var(--width));
		}
	}
</style>
