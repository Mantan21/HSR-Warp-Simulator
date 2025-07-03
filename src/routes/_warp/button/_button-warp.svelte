<script>
	import { createEventDispatcher } from 'svelte';
	import { t } from 'svelte-i18n';
	import { starterRemaining } from '$lib/stores/app-store';
	import Icon from '$lib/components/Icon.svelte';

	export let bannerType = '';
	export let single = false;
	export let disabled = false;

	$: starter = bannerType == 'starter';
	$: event = bannerType.match('event');
	$: cost = starter ? 8 : 10;

	const dispatch = createEventDispatcher();
	const handleClick = () => dispatch('click');
</script>

<div class="warp-btn">
	{#if starter}
		<span class="remaining">
			{$t('warp.starterRemaining', { values: { remaining: $starterRemaining } })}
		</span>
		<span class="discount">-20%</span>
	{/if}

	<button class:starter on:click={handleClick} {disabled}>
		<div class="cost">
			<Icon type={event ? 'specialPass' : 'regularPass'} />
			<span>×{single ? '1 ' : `${cost}`}</span>
		</div>
		<span class="text">
			{$t('warp.button', { values: { qty: single ? 1 : 10 } })}
		</span>
	</button>
</div>

<style>
	.warp-btn {
		position: relative;
	}

	button {
		background-color: var(--color-text);
		color: #222;
		padding: 0.5rem 0;
		font-size: 130%;
		border-radius: 10rem;
		position: relative;
		min-width: 12.5rem;
		max-width: 15.5rem;
		width: calc(0.19 * var(--width));
		margin-left: 0.2rem;
		transition: filter 0.2s, transform 0.2s;
	}
	button:disabled {
		filter: brightness(50%);
	}

	button:not(:disabled):active {
		filter: brightness(85%);
		transform: scale(0.95);
	}

	button.starter {
		max-width: 23rem;
		width: calc(0.26 * var(--width));
	}

	@media screen and (min-width: 600px) {
		button.starter {
			min-width: 18rem;
		}
	}

	.cost,
	button {
		display: inline-flex;
		position: relative;
		align-items: center;
		justify-content: space-between;
	}

	button::after {
		content: '';
		width: 97%;
		height: 80%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border: 0.08rem solid #bbb;
		border-radius: 5rem;
	}

	@media screen and (max-width: 640px) {
		button :global(img) {
			width: 22px;
		}
	}

	.cost {
		white-space: nowrap;
		padding-left: 1rem;
		padding-right: 0.5rem;
		position: relative;
		font-size: 90%;
	}

	.cost::after {
		content: '';
		height: 100%;
		border-right: 1.5px dashed #aaa;
		position: absolute;
		top: 0;
		right: 0;
	}

	.cost span {
		padding-left: 0.5rem;
	}

	span.text {
		text-align: center;
		width: 90%;
		transform: translateX(-10%);
	}

	span.discount {
		position: absolute;
		top: 0;
		right: 5%;
		background-color: #73a95d;
		display: inline-block;
		padding: 0.5% 4%;
		font-size: 100%;
		color: var(--color-text);
		border-top-right-radius: 2rem;
		border-bottom-right-radius: 2rem;
		z-index: +1;
		transform: translateY(-30%);
		pointer-events: none;
	}

	span.remaining {
		pointer-events: none;
		position: absolute;
		right: 0;
		top: -75%;
		padding: 0.2% 15% 0.2% 0;
		color: var(--color-text);
		font-weight: normal;
		font-size: 140%;
		white-space: nowrap;
	}

	/* Mobile Landscape */
	:global(.mobileLandscape) button {
		font-size: 120%;
		min-width: 11rem;
		padding: 0.3rem 0;
	}
	:global(.mobileLandscape) button.starter {
		width: calc(0.33 * var(--width));
	}
	:global(.mobileLandscape) button :global(img) {
		width: 22px;
	}
</style>
