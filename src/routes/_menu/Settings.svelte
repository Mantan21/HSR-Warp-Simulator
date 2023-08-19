<script>
	import { getContext } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { locale, t } from 'svelte-i18n';

	import { warpAmount, autoskip, liteMode } from '$lib/stores/app-store';
	import { muted } from '$lib/stores/phonograph-store';
	import { localConfig } from '$lib/stores/localstorage';
	import { initTrack, pauseTrack } from '$lib/helpers/sounds/phonograph';
	import { check as expressChecker } from '$lib/helpers/express-loader';

	import Scrollable from '$lib/components/Scrollable.svelte';
	import OptionsItem from './_settings-option.svelte';

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
		localConfig.set('autoskip', { express: isAutoSkip, art: $autoskip.art });
		autoskip.update((v) => ({ ...v, express: isAutoSkip }));
		if (isAutoSkip) return readyToPull.set(true);

		// Check express animation if animation turned ON
		const cekExpress = await expressChecker();
		readyToPull.set(cekExpress);
	};

	const handleAutoSkipArt = ({ detail }) => {
		const { selected } = detail;
		const isAutoSkip = selected === 'yes';
		autoskip.set({ art: isAutoSkip, express: true });
		localConfig.set('autoskip', { express: true, art: isAutoSkip });
	};

	// Sound & Volume
	const handleSound = ({ detail }) => {
		const { selected, optionName } = detail;

		const isBGM = optionName === 'muteBGM';
		// stop bgm before saving config
		if (selected === 'yes' && isBGM) pauseTrack();

		// saving config
		const key = isBGM ? 'bgm' : 'sfx';
		muted.update((v) => {
			v[key] = selected === 'yes';
			return v;
		});
		localConfig.set('mutedSounds', $muted);

		// Play audio after saving config
		if (selected !== 'yes' && isBGM) initTrack();
	};
</script>

<div class="settings" in:fade={{ duration: 250 }}>
	<Scrollable>
		<h2>{$t('menu.visual')}</h2>
		<OptionsItem
			showOption={activeOption === 'litemode'}
			optionName="litemode"
			activeIndicator={$liteMode}
			on:select={handleLiteMode}
		>
			{$t('menu.litemode')}
		</OptionsItem>

		<OptionsItem
			showOption={activeOption === 'autoskip'}
			optionName="autoskip"
			activeIndicator={$autoskip.express}
			on:select={handleAutoSkip}
		>
			{$t('menu.autoskip')}
		</OptionsItem>

		{#if $autoskip.express}
			<div transition:fly|local={{ y: -10 }}>
				<OptionsItem
					sub
					optionName="skipSplashArt"
					showOption={activeOption === 'skipSplashArt'}
					activeIndicator={$autoskip.art}
					on:select={handleAutoSkipArt}
				>
					{$t('menu.skipSplashArt')}
				</OptionsItem>
			</div>
		{/if}

		<h2>{$t('menu.sound')}</h2>
		<OptionsItem
			showOption={activeOption === 'muteSFX'}
			optionName="muteSFX"
			activeIndicator={$muted.sfx}
			on:select={handleSound}
			>{$t('menu.mutedSFX')}
		</OptionsItem>

		<OptionsItem
			showOption={activeOption === 'muteBGM'}
			optionName="muteBGM"
			activeIndicator={$muted.bgm}
			on:select={handleSound}
		>
			{$t('menu.mutedBGM')}
		</OptionsItem>

		{#if !$muted.bgm}
			<div transition:fly|local={{ y: -10 }}>
				<OptionsItem sub optionName="backsound">
					{$t('phonograph.choosebgm')}
				</OptionsItem>
			</div>
		{/if}

		<h2>{$t('menu.other')}</h2>
		<OptionsItem
			optionName="locale"
			activeIndicator={$locale}
			showOption={activeOption === 'locale'}
		>
			{$t('menu.language')}
		</OptionsItem>

		<OptionsItem
			showOption={activeOption === 'warpnumber'}
			optionName="warpnumber"
			activeIndicator={$warpAmount}
			on:select={handleSelectAmount}
		>
			{$t('menu.warpNumber')}
		</OptionsItem>

		<OptionsItem optionName="switchbanner">
			{$t('menu.switchbanner')}
		</OptionsItem>

		<OptionsItem optionName="reset">{$t('menu.clearStorage')}</OptionsItem>
		<OptionsItem optionName="feedback">{$t('menu.giveComment')}</OptionsItem>
	</Scrollable>
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
