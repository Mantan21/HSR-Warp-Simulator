<script>
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';

	export let itemtype;
	const showItem = getContext('showItem');
</script>

<div class="row">
	<button class:active={itemtype === 'character'} on:click={() => showItem('character')}>
		<span class="icon">
			<i class="hsr-character" />
		</span>
		<span> {$t('character')}</span>
	</button>
	<button class:active={itemtype === 'lightcone'} on:click={() => showItem('lightcone')}>
		<span class="icon">
			<i class="hsr-lightcone" />
		</span>
		<span> {$t('lightcone')}</span>
	</button>
</div>

<style>
	.row {
		width: 100%;
		text-align: center;
		white-space: nowrap;
	}

	button {
		color: #fff;
		display: inline-flex;
		align-items: center;
		line-height: 0;
		padding: calc(0.015 * var(--screen-width)) calc(0.025 * var(--screen-width));
		margin: 0 calc(0.02 * var(--screen-width));
		font-size: 130%;
		transition: all 0.5s;
		opacity: 0.75;
		position: relative;
	}
	@media screen and (max-width: 1200px) {
		button {
			margin: 0.5% calc(0.02 * var(--screen-width));
		}
	}

	:global(.mobileLandscape) button {
		font-size: 120%;
	}

	button.active,
	button:hover {
		opacity: 1;
	}

	.icon {
		padding: 3.5%;
		border-radius: 100%;
		background-color: transparent;
		transition: all 0.5s;
		position: absolute;
		left: 0;
		top: 50%;
		transform: translate(-10%, -50%);
	}

	@media screen and (max-width: 750px) {
		.icon {
			transform: translate(-100%, -50%);
		}
	}

	.active span.icon {
		background-color: #fff;
		color: #000;
		opacity: 1;
	}

	span.icon::after {
		content: '';
		position: absolute;
		width: 120%;
		height: 120%;
		top: -15%;
		left: -15%;
		transform: translate(-50%, -50%);
		border-radius: 100%;
		border: 2px dotted transparent;
		transition: border 0.2s;
		animation: rotate 30s forwards infinite linear;
	}
	.active span.icon::after {
		border-color: #fff;
	}

	button:not(.active):hover span.icon::after {
		border-color: orange;
		border-style: dashed;
	}

	:global(.mobileLandscape) button span.icon::after {
		border-width: 1px;
	}

	@media screen and (max-width: 640px) {
		button span.icon::after {
			border-width: 1px;
		}
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(-360deg);
		}
	}
</style>
