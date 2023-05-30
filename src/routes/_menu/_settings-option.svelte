<script>
	import { createEventDispatcher, getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { fly } from 'svelte/transition';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import { activePhase, activeVersion } from '$lib/stores/app-store';

	export let showOption = false;
	export let optionName;
	export let text;
	export let activeIndicator = null;

	const openOption = getContext('openOption');
	const dispatch = createEventDispatcher();
	let select = (selected) => {
		playSfx('setting-item-option');
		showOption = !showOption;
		if (!selected) return;
		dispatch('select', { selected });
		openOption();
	};

	const handleOption = () => {
		if (showOption) return openOption('');
		playSfx('setting-item');
		openOption(optionName);
	};

	// Clear Storage
	const showModal = getContext('showModal');
	const clearStorage = () => {
		playSfx('setting-item');
		showModal({ title: $t('menu.promptTitle') });
	};

	// Switch Banner
	const navigate = getContext('navigate');
	const switchBanner = () => {
		playSfx();
		navigate('allbanner');
	};
</script>

<div class="setting-item">
	<div class="caption">{text}</div>
	<div class="option-select" on:mousedown|stopPropagation>
		<!-- Clear Storage -->
		{#if optionName === 'reset'}
			<button class="selected-option" on:click={clearStorage}>
				{$t('menu.clearNow')} <i class="hsr-trash" />
			</button>

			<!-- Switch Banner -->
		{:else if optionName === 'switchbanner'}
			<button class="selected-option" on:click={switchBanner}>
				{$activeVersion} - {$activePhase} <i class="hsr-caret-down" />
			</button>

			<!-- Numeber of Warps -->
		{:else if optionName === 'warpnumber'}
			<button class="selected-option" on:click={handleOption}>
				{$t(activeIndicator)} <i class="hsr-caret-{showOption ? 'up' : 'down'}" />
			</button>

			{#if showOption}
				<div class="select-option" transition:fly={{ y: -20, duration: 200 }}>
					{#each ['default', 'unlimited'] as op}
						<button class:selected={op === activeIndicator} on:click={() => select(op)}>
							<span> {$t(op)} </span>
						</button>
					{/each}
				</div>
			{/if}

			<!-- Regular -->
		{:else}
			<button class="selected-option" on:click={handleOption}>
				{activeIndicator ? $t('menu.yes') : $t('menu.no')}
				<i class="hsr-caret-{showOption ? 'up' : 'down'}" />
			</button>

			{#if showOption}
				<div class="select-option" transition:fly={{ y: -20, duration: 200 }}>
					<button class:selected={activeIndicator} on:click={() => select('yes')}>
						<span> {$t('menu.yes')} </span>
					</button>
					<button class:selected={!activeIndicator} on:click={() => select('no')}>
						<span> {$t('menu.no')} </span>
					</button>
				</div>
			{/if}
		{/if}
	</div>
</div>

<style>
	.setting-item {
		width: 100%;
		border: 0.1rem solid rgba(255, 255, 255, 0.5);
		display: flex;
		color: #000;
		font-size: 120%;
		transition: all 0.2s;
		position: relative;
	}
	.setting-item:hover {
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.6);
		border-color: transparent;
		z-index: +1;
	}

	.caption {
		flex-basis: 75%;
		background-color: rgba(255, 255, 255, 0.8);
		padding: 0.8rem 1.5rem;
	}

	.option-select {
		flex-basis: 25%;
		background-color: rgba(255, 255, 255, 0.9);
		position: relative;
	}

	@media screen and (max-width: 600px) {
		.caption {
			flex-basis: 60%;
		}

		.option-select {
			flex-basis: 40%;
		}
	}

	button {
		font-size: 100%;
	}

	.selected-option {
		text-align: center;
		width: 100%;
		height: 100%;
		position: relative;
	}
	.selected-option i {
		position: absolute;
		top: 50%;
		right: 1rem;
		line-height: 0;
		transform: translate(-50%, -50%) scale(1.3);
	}

	.select-option {
		background-color: #fff;
		width: 100%;
		top: 110%;
		position: absolute;
		box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		z-index: +2;
	}

	.select-option button {
		padding: 1% 3%;
		text-align: left;
		position: relative;
		transition: all 0.2s;
	}
	.select-option span {
		padding: 0.8rem 1.5rem 0.8rem 0.5rem;
		display: block;
		width: 100%;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		transition: all 0.2s;
	}
	.select-option button:last-child span {
		border: none;
	}

	.select-option button:hover {
		box-shadow: 0 0 0.3rem #000;
	}
	.select-option button:hover span {
		border-color: transparent;
	}

	.select-option button::after {
		content: '';
		width: 1rem;
		aspect-ratio: 1/1;
		border-radius: 100%;
		position: absolute;
		top: 50%;
		right: 1rem;
		transform: translate(-50%, -50%);
		outline: 0.1rem solid #aaa;
		transition: all 0.2s;
	}

	.select-option button.selected::after {
		width: 0.6rem;
		background-color: orange;
		border: 0.2rem solid white;
		outline: 0.2rem solid orange;
	}
</style>
