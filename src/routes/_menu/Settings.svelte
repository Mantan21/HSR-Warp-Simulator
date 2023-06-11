<script>
	import { getContext } from 'svelte';
	import { warpAmount, autoskip, liteMode } from '$lib/stores/app-store';
	import { activeBacksound, muted } from '$lib/stores/phonograph-store';
	import { localConfig } from '$lib/stores/localstorage';
	import { t } from 'svelte-i18n';
	import OptionsItem from './_settings-option.svelte';
	import { fade, fly } from 'svelte/transition';
	import { pauseTrack, randomTrack } from '$lib/helpers/sounds/phonograph';
	import { check as expressChecker } from '$lib/helpers/express-loader';

	export let activeOption;

	// Lite Mode
	const handleLiteMode = ({ detail }) => {
		const { selected } = detail;
		const isLitemode = selected === 'yes';
		liteMode.set(isLitemode);
		localConfig.set('litemode', isLitemode);
	};

	// Warp Number
	const handleSelectAmount = ({ detail }) => {
		const { selected } = detail;
		localConfig.set('warpAmount', selected);
		warpAmount.set(selected);
	};

	// AutoSkip
	const readyToPull = getContext('readyToPull');
	const handleAutoSkip = async ({ detail }) => {
		const { selected } = detail;
		const isAutoSkip = selected === 'yes';
		autoskip.set(isAutoSkip);
		localConfig.set('autoskip', isAutoSkip);
		if (isAutoSkip) return readyToPull.set(true);
		const cekExpress = await expressChecker();
		readyToPull.set(cekExpress);
	};

	// Sound & Volume
	const handleSound = ({ detail }) => {
		const { selected, optionName } = detail;

		const isBGM = optionName === 'muteBGM';
		// stop bgm before saving config
		if (selected === 'yes' && isBGM) pauseTrack($activeBacksound.sourceID);

		// saving config
		const key = isBGM ? 'bgm' : 'sfx';
		muted.update((v) => {
			v[key] = selected === 'yes';
			return v;
		});
		localConfig.set('mutedSounds', $muted);

		// Play audio after saving config
		if (selected !== 'yes' && isBGM) randomTrack('init');
	};
</script>

<div class="settings" in:fade={{ duration: 250 }}>
	<h2>General</h2>
	<OptionsItem
		text={$t('menu.warpNumber')}
		showOption={activeOption === 'warpnumber'}
		optionName="warpnumber"
		activeIndicator={$warpAmount}
		on:select={handleSelectAmount}
	/>

	<OptionsItem text={$t('menu.switchbanner')} optionName="switchbanner" />

	<OptionsItem text={$t('menu.clearStorage')} optionName="reset" />

	<OptionsItem text="Give a Comment" optionName="feedback" />

	<h2>Visual</h2>
	<OptionsItem
		text={$t('menu.litemode')}
		showOption={activeOption === 'litemode'}
		optionName="litemode"
		activeIndicator={$liteMode}
		on:select={handleLiteMode}
	/>

	<OptionsItem
		text={$t('menu.autoskip')}
		showOption={activeOption === 'autoskip'}
		optionName="autoskip"
		activeIndicator={$autoskip}
		on:select={handleAutoSkip}
	/>

	<h2>Sounds</h2>
	<OptionsItem
		text={$t('menu.mutedSFX')}
		showOption={activeOption === 'muteSFX'}
		optionName="muteSFX"
		activeIndicator={$muted.sfx}
		on:select={handleSound}
	/>

	<OptionsItem
		text={$t('menu.mutedBGM')}
		showOption={activeOption === 'muteBGM'}
		optionName="muteBGM"
		activeIndicator={$muted.bgm}
		on:select={handleSound}
	/>

	{#if !$muted.bgm}
		<div transition:fly|local={{ y: -10 }}>
			<OptionsItem sub text={$t('phonograph.choosebgm')} optionName="backsound" />
		</div>
	{/if}
</div>

<style>
	.settings {
		width: 100%;
	}

	h2 {
		padding: 0.3rem 0;
		margin-top: 1.5rem;
		font-size: 130%;
	}

	h2:first-child {
		margin-top: 0;
	}
</style>
