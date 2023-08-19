<script>
	import { createEventDispatcher, getContext, setContext } from 'svelte';
	import { fly } from 'svelte/transition';
	import { locale, locales, t } from 'svelte-i18n';

	import { activePhase, activeVersion } from '$lib/stores/app-store';
	import { localConfig } from '$lib/stores/localstorage';
	import { activeBacksound } from '$lib/stores/phonograph-store';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import { userCurrencies } from '$lib/helpers/shop-price';
	import { flags, localeName } from '$lib/data/country.json';
	import Range from '$lib/components/Range.svelte';
	import { cookie } from '$lib/stores/cookies';
	import { setVolume } from '$lib/helpers/sounds/phonograph';

	export let showOption = false;
	export let optionName;
	export let activeIndicator = null;
	export let sub = false;
	export let mode = 'option';

	const openOption = getContext('openOption');
	const dispatch = createEventDispatcher();
	let select = (selected) => {
		playSfx('setting-item-option');
		showOption = !showOption;
		if (!selected) return;
		dispatch('select', { selected, optionName });
		openOption();
	};

	const handleOption = () => {
		if (showOption) return openOption('');
		playSfx('setting-item');
		openOption(optionName);
	};

	// Range Input
	let rangeVal = cookie.get('trackVolume') * 100 || 20;
	const setValue = (val) => (rangeVal = val);
	setContext('setValue', setValue);

	const changeValue = (e) => {
		const { value } = e.detail;
		setVolume(value);
	};

	// Language
	const setLang = (langID) => {
		playSfx('setting-item-option');
		openOption('');
		if (langID === $locale) return;
		locale.set(langID);
		localConfig.set('locale', langID);
		userCurrencies.init();
	};
	const contributeLang = () => {
		window.open(
			'https://github.com/AguzzTN54/HSR-Warp-Simulator/tree/master/src/locales',
			'_blank'
		);
	};

	// Clear Storage
	const showModal = getContext('showModal');
	const clearStorage = () => {
		playSfx('setting-item');
		showModal({ title: $t('menu.promptTitle') });
	};

	const navigate = getContext('navigate');
	// Switch Banner
	const switchBanner = () => {
		playSfx();
		navigate('allbanner');
	};

	// feedback
	const feedback = () => {
		playSfx();
		window.open('/feedback', '_blank');
	};

	// Phonograph
	const openPhonograph = () => {
		playSfx();
		navigate('phonograph');
	};

	const dontShowAlbum = ['more-ost', 'custom-musics'];
	$: dontShow = dontShowAlbum.includes($activeBacksound.album);
	$: activeAlbum = dontShow ? '' : ' - ' + $t(`phonograph.${$activeBacksound.album}`);
</script>

<div class="setting-item" class:sub>
	<div class="caption">
		<slot />
	</div>

	<div class="option-select" on:mousedown|stopPropagation aria-label="">
		<!-- Locales -->
		{#if optionName === 'locale'}
			<button class="selected-option locale" on:click={handleOption}>
				{localeName[activeIndicator]}
				<img
					src="data:image/png;base64,{flags[activeIndicator.substring(0, 2)]}"
					alt="flag {activeIndicator}"
					class="flag"
				/>
			</button>

			{#if showOption}
				<div class="select-option locale" transition:fly={{ y: -20, duration: 200 }}>
					{#each $locales as locale}
						<button class:selected={locale === activeIndicator} on:click={() => setLang(locale)}>
							<span> {localeName[locale]} </span>
							<img
								src="data:image/png;base64,{flags[locale.substring(0, 2)]}"
								alt="flag {locale}"
								class="flag"
							/>
						</button>
					{/each}

					<button on:click={contributeLang}>
						<span> Contribute </span>
					</button>
				</div>
			{/if}

			<!-- Clear Storage -->
		{:else if optionName === 'reset'}
			<button class="selected-option" on:click={clearStorage}>
				{$t('menu.clearNow')} <i class="hsr-trash" />
			</button>

			<!-- Choose Backsound -->
		{:else if optionName === 'backsound'}
			<button
				class="selected-option"
				style="text-align: left; padding-left: 5%"
				on:click={openPhonograph}
			>
				<!-- svelte-ignore a11y-distracting-elements -->
				<marquee style="width: 75%;">
					{$activeBacksound.title}{activeAlbum}
				</marquee>
				<i class="hsr-music" />
			</button>

			<!-- Switch Banner -->
		{:else if optionName === 'switchbanner'}
			<button class="selected-option" on:click={switchBanner}>
				{$activeVersion === '1000000.0' ? 'Pro' : $activeVersion} - {$activePhase}
				<i class="hsr-caret-down" />
			</button>

			<!-- Feedback -->
		{:else if optionName === 'feedback'}
			<button class="selected-option" on:click={feedback}>
				{$t('menu.feedback')}
				<i class="hsr-bug" />
			</button>

			<!-- Number of Warps -->
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

			<!-- Slider -->
		{:else if mode === 'slider'}
			<div class="selected-option slider">
				<Range value={rangeVal} max={100} min={1} dark on:input={changeValue} />
			</div>

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

	.caption :global(small) {
		opacity: 0.8;
		font-size: x-small;
		font-style: italic;
	}

	.option-select {
		flex-basis: 25%;
		background-color: rgba(255, 255, 255, 0.9);
		position: relative;
	}

	.sub {
		width: 95%;
		margin-left: 5%;
	}

	.sub::before {
		content: '';
		position: absolute;
		left: -3%;
		width: 3%;
		height: 148%;
		z-index: -1;
		bottom: 50%;
		border-bottom: #dcd4c2 dashed 0.12rem;
		border-left: #dcd4c2 dashed 0.12rem;
		opacity: 0.5;
	}

	.sub .caption {
		flex-basis: 74%;
	}
	.sub .option-select {
		flex-basis: 26.5%;
	}

	@media screen and (max-width: 600px) {
		.caption {
			flex-basis: 60%;
		}

		.option-select {
			flex-basis: 40%;
		}

		.sub .caption {
			flex-basis: 58%;
		}
		.sub .option-select {
			flex-basis: 42%;
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

	.selected-option.slider {
		display: flex;
		height: 100%;
		width: 100%;
		align-items: center;
		justify-content: center;
	}

	img.flag {
		width: 6%;
		box-shadow: 0 0 1px #111;
	}

	.selected-option i,
	img.flag {
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

	.select-option:not(.locale) button::after {
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
