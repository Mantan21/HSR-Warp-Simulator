<script>
	import { warpAmount } from '$lib/stores/app-store';
	import { localConfig } from '$lib/stores/localstorage';
	import OptionsItem from './_settings-option.svelte';

	export let activeOption;

	// Warp Number
	const handleSelectAmount = ({ detail }) => {
		const { selected } = detail;
		localConfig.set('warpAmount', selected);
		warpAmount.set(selected);
	};
</script>

<div class="settings">
	<OptionsItem
		text="Number of Warps"
		showOption={activeOption === 'warpnumber'}
		optionName="warpnumber"
		activeIndicator={$warpAmount}
		on:select={handleSelectAmount}
	/>

	<OptionsItem text="Clear Storage" optionName="reset" on:select={handleSelectAmount} />
</div>
