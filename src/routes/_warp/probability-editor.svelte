<script>
	import { getContext } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import { getRate, setRate } from '$lib/helpers/gacha/probabilities';
	import { probEdit } from '$lib/stores/app-store';
	import { localPity } from '$lib/helpers/dataAPI/api-localstorage';
	import Header from '$lib/components/Header.svelte';

	export let banner = 'character-event';
	export let fullscreen = false;

	const toggleEditor = () => {
		playSfx('click2');
		probEdit.update((v) => !v);
	};

	const showModalReset = getContext('showModalReset');
	const resetClick = () => {
		showModalReset();
		playSfx();
	};

	$: baseRate4 = getRate(banner, 'baseRate4');
	$: baseRate5 = getRate(banner, 'baseRate5');
	$: charRate = getRate(banner, 'charRate');
	$: winRate = getRate(banner, 'winRate');
	$: hard4 = getRate(banner, 'hard4');
	$: hard5 = getRate(banner, 'hard5');
	$: max4 = getRate(banner, 'max4');
	$: max5 = getRate(banner, 'max5');
	$: guaranteed = getRate(banner, 'guaranteed') || 'default';

	let showGuarateedOption = false;
	const guaranteedToggle = (selected) => {
		setRate(banner, 'guaranteed', selected);
		guaranteed = selected;
		showGuarateedOption = false;
		playSfx('click2');
	};

	const changeRate = (e, variable) => {
		const val = e.target.value;
		const maxVal = variable.match('Rate4') ? 100 - baseRate5 : 100;
		const capVal = parseFloat(val) < maxVal || !val ? val : maxVal;

		if (val >= maxVal) e.target.value = capVal;
		setRate(banner, variable, capVal || 0);

		if (variable === 'winRate') return (winRate = capVal);
		if (variable === 'baseRate4') return (baseRate4 = capVal);

		if (variable === 'baseRate5') {
			baseRate5 = capVal;
			const isOverLimit = parseFloat(baseRate5) + parseFloat(baseRate4) > 100;
			if (!isOverLimit) return;
			baseRate4 = 100 - baseRate5;
			setRate(banner, 'baseRate4', baseRate4);
		}
	};

	const changePity = (e, variable) => {
		const val = e.target.value;
		let finalVal = 1;

		// Max Pity Changer
		if (variable.match('max')) {
			const capVal = val <= 1 || !val ? 1 : val;
			finalVal = parseInt(capVal);
			e.target.value = finalVal;

			if (variable === 'max5') {
				max5 = finalVal;
				const maxHard = hard5 >= max5 - 1 ? max5 - 1 : hard5;
				if (hard5 >= maxHard || isNaN(finalVal)) {
					hard5 = isNaN(finalVal) ? 0 : maxHard;
					setRate(banner, 'hard5', hard5 || 0);
				}
			}

			if (variable === 'max4') {
				max4 = finalVal;
				const maxHard = hard4 >= max4 - 1 ? max4 - 1 : hard4;
				if (hard4 >= maxHard || isNaN(finalVal)) {
					hard4 = isNaN(finalVal) ? 0 : maxHard;
					setRate(banner, 'hard4', hard4 || 0);
				}
			}
		}

		// Hard Pity Changer
		if (variable.match('hard')) {
			const maxPity = variable === 'hard5' ? max5 : max4;
			const cap = (maxPity || 0) - 1;
			finalVal = val >= cap ? cap : val;
			if (val >= cap) e.target.value = finalVal;
			if (variable === 'hard4') hard4 = finalVal;
			if (variable === 'hard5') hard5 = finalVal;
		}

		if (!variable.match('now')) return setRate(banner, variable, finalVal || 1);

		// Current Pity Changer
		const value = parseInt(val);
		if (variable === 'now4') localPity.set(`pity4${banner}`, value);
		if (variable === 'now5') localPity.set(`pity5${banner}`, value);
	};
</script>

<div class="prob-container" class:fullscreen in:fade|local={{ delay: 500 }}>
	{#if fullscreen}
		<Header
			icon="cog-bold"
			h1={$t('editor.bannerConfig', { values: { banner: $t(`banner.${banner}`) } })}
			relative
			invert
		/>
	{/if}

	<div class="content">
		<div class="control">
			<button class="revert" on:click={resetClick}>
				<i class="hsr-refresh" />
				{$t('editor.revert')}
			</button>
			<button class="close" on:click={toggleEditor}> <i class="hsr-check" /> {$t('close')} </button>
		</div>

		<div class="form">
			<div class="wrapper">
				<div class="row">
					<div class="col">
						{$t('editor.baseRate', { values: { rarity: 5 } })}
					</div>
					<div class="col percent">
						<input type="number" value={baseRate5} on:input={(e) => changeRate(e, 'baseRate5')} />
					</div>
				</div>

				<div class="row" class:disabled={baseRate5 >= 100}>
					<div class="col">
						{$t('editor.maxPity', { values: { rarity: 5 } })}
					</div>
					<div class="col">
						<input
							type="number"
							value={max5}
							disabled={baseRate5 >= 100}
							on:input={(e) => changePity(e, 'max5')}
						/>
					</div>
				</div>

				<div class="row" class:disabled={baseRate5 >= 100 || !max5 || max5 <= 1}>
					<div class="col">
						{$t('editor.hardPity', { values: { rarity: 5 } })}
					</div>
					<div class="col">
						<input
							type="number"
							value={hard5}
							disabled={baseRate5 >= 100 || !max5 || max5 <= 1}
							on:input={(e) => changePity(e, 'hard5')}
						/>
					</div>
				</div>

				<div class="row">
					<div class="col">
						{$t('editor.currentPity', { values: { rarity: 5 } })}
					</div>
					<div class="col">
						<input
							type="number"
							value={localPity.get(`pity5${banner}`)}
							on:input={(e) => changePity(e, 'now5')}
						/>
					</div>
				</div>

				<div class="row" class:disabled={baseRate5 >= 100 || max5 <= 1}>
					<div class="col">{$t('editor.baseRate', { values: { rarity: 4 } })}</div>
					<div class="col percent">
						<input
							type="number"
							value={baseRate4}
							disabled={baseRate5 >= 100 || max5 <= 1}
							on:input={(e) => changeRate(e, 'baseRate4')}
						/>
					</div>
				</div>

				<div class="row" class:disabled={baseRate5 >= 100 || baseRate4 >= 100 || max5 <= 1}>
					<div class="col">
						{$t('editor.maxPity', { values: { rarity: 4 } })}
					</div>
					<div class="col">
						<input
							type="number"
							value={max4}
							disabled={baseRate5 >= 100 || baseRate4 >= 100 || max5 <= 1}
							on:input={(e) => changePity(e, 'max4')}
						/>
					</div>
				</div>

				<div
					class="row"
					class:disabled={baseRate5 >= 100 || baseRate4 >= 100 || !max4 || max4 <= 1 || max5 <= 1}
				>
					<div class="col">{$t('editor.hardPity', { values: { rarity: 4 } })}</div>
					<div class="col">
						<input
							type="number"
							value={hard4}
							disabled={baseRate5 >= 100 || baseRate4 >= 100 || !max4 || max4 <= 1 || max5 <= 1}
							on:input={(e) => changePity(e, 'hard4')}
						/>
					</div>
				</div>

				<div class="row">
					<div class="col">
						{$t('editor.currentPity', { values: { rarity: 4 } })}
					</div>
					<div class="col">
						<input
							type="number"
							value={localPity.get(`pity4${banner}`)}
							on:input={(e) => changePity(e, 'now4')}
						/>
					</div>
				</div>

				{#if banner !== 'regular'}
					<div class="row" class:disabled={guaranteed === 'always'}>
						<div class="col">{$t('editor.winRate')}</div>
						<div class="col percent">
							<input
								type="number"
								value={winRate}
								disabled={guaranteed === 'always'}
								on:input={(e) => changeRate(e, 'winRate')}
							/>
						</div>
					</div>
				{/if}

				<div
					class="row"
					class:disabled={(baseRate5 >= 100 && banner !== 'regular') ||
						guaranteed === 'always' ||
						winRate >= 100}
				>
					<div class="col">
						{$t('editor.charRate')}
						{#if banner !== 'regular'}
							<small>{$t('editor.nonRateup')}</small>
						{/if}
						:
					</div>
					<div class="col percent">
						<input
							type="number"
							value={charRate}
							on:input={(e) => changeRate(e, 'charRate')}
							disabled={(baseRate5 >= 100 && banner !== 'regular') ||
								guaranteed === 'always' ||
								winRate >= 100}
						/>
					</div>
				</div>

				{#if banner !== 'regular'}
					<div class="row">
						<div class="col">{@html $t('editor.guaranteedSystem')}</div>
						<div class="col select">
							<button
								class="selected"
								on:click={() => {
									showGuarateedOption = !showGuarateedOption;
									playSfx('click2');
								}}
							>
								{$t(`editor.${guaranteed}`)}
							</button>
							{#if showGuarateedOption}
								<div class="selection" transition:fly|local={{ y: 10 }}>
									<button class="option" on:click={() => guaranteedToggle('default')}>
										{$t('editor.default')}
									</button>
									<button class="option" on:click={() => guaranteedToggle('always')}>
										{$t('editor.always')}
									</button>
									<button class="option" on:click={() => guaranteedToggle('never')}>
										{$t('editor.never')}
									</button>
								</div>
							{/if}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

<style>
	.prob-container {
		width: inherit;
		height: inherit;
		position: relative;
		color: #111;
		overflow: hidden;
		z-index: +100;
	}

	.content {
		height: inherit;
		width: inherit;
		display: flex;
		flex-direction: column;
	}
	.fullscreen .content {
		height: 78%;
		padding: 0 2%;
	}

	.form {
		padding-bottom: calc(0.03 * var(--bw));
		height: calc(100% - calc(0.02 * var(--bw)));
		width: 100%;
	}

	.fullscreen .form {
		height: 100%;
	}

	.wrapper {
		padding-left: calc(0.02 * var(--bw));
		padding-right: calc(0.03 * var(--bw));
		width: var(--bw);
		width: 100%;
		height: inherit;
		overflow: auto;
	}

	.control {
		min-height: calc(0.05 * var(--bw));
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.control button {
		color: #fff;
		padding: 0.75% 2.5%;
		margin: 0 1%;
		border-radius: 10rem;
		line-height: 0;
		display: inline-flex;
		align-items: center;
		transition: all 0.25s;
	}
	.control button:active {
		transform: scale(0.9);
	}
	button.revert {
		color: #b90000;
		border: 1px solid #b90000;
	}
	button.revert:hover {
		background-color: #b90000;
		color: #fff;
	}
	button.close {
		border: 1px solid #000;
		color: #000;
	}
	button.close:hover {
		background-color: #000;
		color: #fff;
	}

	/* Content */
	.row {
		display: flex;
		align-items: center;
		font-size: 105%;
		padding: 0.5% 0 0.5% 1%;
		border-bottom: rgba(20, 18, 15, 0.5) 1px solid;
		transition: background 0.25s;
	}

	@media screen and (max-width: 700px) {
		.row {
			padding: 1.5%;
			font-size: 120%;
		}
		.control button {
			padding: 0.5rem 2rem;
		}
	}

	.row:hover,
	.row.disabled {
		background-color: rgba(20, 18, 15, 0.075);
	}

	.row.disabled {
		opacity: 0.2;
		cursor: not-allowed;
	}
	input:disabled {
		cursor: not-allowed;
	}

	.col {
		position: relative;
		display: block;
	}

	.col:nth-child(1) {
		flex-basis: 90%;
		width: 90%;
	}

	.col:nth-child(2) {
		height: 2.2rem;
		flex-basis: 10%;
		min-width: 5rem;
	}
	.fullscreen .col:nth-child(2) {
		height: 2rem;
	}

	.col.percent:nth-child(2)::after {
		content: '%';
		background-color: #333;
		height: 100%;
		aspect-ratio: 1/1;
		display: flex;
		justify-content: center;
		align-items: center;
		aspect-ratio: 1/1;
		color: #fff;
		position: absolute;
		top: 0;
		right: 0;
		border-top-right-radius: 3rem;
		border-bottom-right-radius: 3rem;
	}

	.select button.selected,
	input {
		background-color: #fff;
		width: 100%;
		padding: 10% 15%;
		margin-bottom: 2%;
		height: 100%;
		display: block;
		border-radius: 3rem;
		border: #8e7e62 1px solid;
		outline: none;
		transition: all 0.2s;
		line-height: 0;
	}

	.percent input {
		padding-right: 35%;
	}

	input:focus,
	.selection {
		box-shadow: 0 0 0.4rem rgba(255, 192, 1, 0.7);
	}

	.selection {
		position: absolute;
		bottom: 100%;
		right: 0;
		z-index: +10;
		min-width: 100%;
		background-color: #fff;
		border-radius: 0.25rem;
		border: #c3b8a5 1px solid;
	}

	.selection button {
		display: block;
		padding: 10% 15%;
		width: 100%;
		text-align: left;
		border-bottom: #c5bcac 1px solid;
	}

	button.selected,
	.selection button {
		transition: background 0.25s;
		font-size: 100%;
	}
	button.selected:hover,
	.selection button:hover {
		background-color: #e8e5e0;
	}
</style>
