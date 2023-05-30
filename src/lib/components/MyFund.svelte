<script>
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import { assets } from '$lib/stores/app-store';
	import { getContext } from 'svelte';

	export let type = 'stellarJade';
	export let plusbutton = false;
	const allowAddition = type === 'stellarJade' && plusbutton;

	const iconList = {
		stellarJade: 'stellar-jade.webp',
		regularPass: 'regular-pass-clean.webp',
		specialPass: 'special-pass-clean.webp',
		oneiric: 'oneiric-shard.webp',
		embers: 'undying-embers.webp',
		starlight: 'undying-starlight.webp'
	};

	const openConvertModal = getContext('openConvertModal');
	const openModal = () => {
		if (!allowAddition) return;
		openConvertModal();
		playSfx('balance-click');
	};
</script>

<button class={type} on:click={openModal}>
	<div class="icon">
		<img src={$assets[iconList[type]]} alt="Icon" crossorigin="anonymous" />
	</div>
	<span class="amount">
		<slot />
	</span>
	{#if allowAddition}
		<span class="plus"> <i class="hsr-plus" /> </span>
	{/if}
</button>

<style>
	button {
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		width: fit-content;
		height: 1.6rem;
		background-color: rgba(0, 0, 0, 0.3);
		border-radius: 50px;
		color: #fff;
		vertical-align: middle;
		text-align: center;
		position: relative;
		margin: 0 1rem 0 0;
		padding: 0 0.5rem 0 0;
		border: 0.7px solid #656565;
	}
	:global(.mobileLandscape) button {
		height: 1.1rem;
		margin: 0.3rem 0;
	}

	span.amount {
		min-width: 3.5rem;
		font-size: 130%;
		opacity: 0.8;
	}

	:global(.mobileLandscape) span.amount {
		font-size: 82%;
		min-width: 2.5rem;
	}

	span.plus {
		color: var(--color-second);
		line-height: 0;
		font-size: 130%;
	}

	:global(.mobileLandscape) span.plus {
		font-size: 100%;
		transform: translate(20%);
	}

	img {
		width: 2.5rem;
		aspect-ratio: 1/1;
	}
	:global(.mobileLandscape) img {
		width: 1.7rem;
	}

	@media screen and (max-width: 900px) {
		button {
			margin: 0.3rem 0;
		}
	}
</style>
