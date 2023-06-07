<script>
	import { getContext } from 'svelte';
	import { warpAmount, autoskip, liteMode } from '$lib/stores/app-store';
	import { activeBacksound } from '$lib/stores/phonograph-store';
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
	const muted = getContext('muted');
	const handleSfx = ({ detail }) => {
		const { selected } = detail;

		// stop bgm before saving config
		if (selected === 'yes') pauseTrack($activeBacksound.sourceID);

		// saving config
		muted.set(selected === 'yes');
		localConfig.set('muted', selected === 'yes');

		// Play audio after saving config
		if (selected !== 'yes') randomTrack('init');
	};
</script>

<div class="settings" in:fade={{ duration: 250 }}>
	<OptionsItem
		text={$t('menu.warpNumber')}
		showOption={activeOption === 'warpnumber'}
		optionName="warpnumber"
		activeIndicator={$warpAmount}
		on:select={handleSelectAmount}
	/>

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

	<OptionsItem
		text={$t('menu.muted')}
		showOption={activeOption === 'mute'}
		optionName="mute"
		activeIndicator={$muted}
		on:select={handleSfx}
	/>

	{#if !$muted}
		<div transition:fly|local={{ y: -10 }}>
			<OptionsItem sub text={$t('phonograph.choosebgm')} optionName="backsound" />
		</div>
	{/if}

	<OptionsItem text={$t('menu.switchbanner')} optionName="switchbanner" />

	<OptionsItem text={$t('menu.clearStorage')} optionName="reset" />

	<OptionsItem text="Give a Comment" optionName="feedback" />
</div>

<style>
	.settings {
		width: 100%;
	}
</style>
