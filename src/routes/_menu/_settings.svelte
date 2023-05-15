<script>
	import { getContext } from 'svelte';
	import { warpAmount } from '$lib/stores/app-store';
	import { localConfig } from '$lib/stores/localstorage';
	import { t } from 'svelte-i18n';
	import OptionsItem from './_settings-option.svelte';

	export let activeOption;

	// Warp Number
	const handleSelectAmount = ({ detail }) => {
		const { selected } = detail;
		localConfig.set('warpAmount', selected);
		warpAmount.set(selected);
	};

	// AutoSkip
	const autoskip = getContext('autoskip');
	const handleAutoSkip = ({ detail }) => {
		const { selected } = detail;
		autoskip.set(selected === 'yes');
		localConfig.set('autoskip', selected === 'yes');
	};

	// Sound & Volume
	const muted = getContext('muted');
	const handleSfx = ({ detail }) => {
		const { selected } = detail;
		muted.set(selected === 'yes');
		localConfig.set('muted', selected === 'yes');
	};
</script>

<div class="settings">
	<OptionsItem
		text={$t('menu.muted')}
		showOption={activeOption === 'mute'}
		optionName="mute"
		activeIndicator={$muted}
		on:select={handleSfx}
	/>

	<OptionsItem
		text={$t('menu.warpNumber')}
		showOption={activeOption === 'warpnumber'}
		optionName="warpnumber"
		activeIndicator={$warpAmount}
		on:select={handleSelectAmount}
	/>

	<OptionsItem
		text={$t('menu.autoskip')}
		showOption={activeOption === 'autoskip'}
		optionName="autoskip"
		activeIndicator={$autoskip}
		on:select={handleAutoSkip}
	/>

	<OptionsItem
		text={$t('menu.switchbanner')}
		optionName="switchbanner"
		on:select={handleSelectAmount}
	/>

	<OptionsItem text={$t('menu.clearStorage')} optionName="reset" on:select={handleSelectAmount} />
</div>
