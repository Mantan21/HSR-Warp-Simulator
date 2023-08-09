<script>
	import { getContext, setContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import {
		activeVersion,
		activePhase,
		viewportHeight,
		isMobileLandscape,
		viewportWidth,
		warpAmount,
		specialPass,
		regularPass,
		embers,
		starlight
	} from '$lib/stores/app-store';
	import { localBalance } from '$lib/stores/localstorage';
	import WARP, { roll } from '$lib/helpers/gacha/Warp';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import Button from './_button.svelte';
	import ButtonWarp from './_button-warp.svelte';
	import ConvertModal from './_convert-modal.svelte';

	export let bannerType = 'starter';

	$: isStarter = bannerType === 'starter';
	$: fit = $viewportHeight * ($isMobileLandscape ? 1.9 : 1.7) > $viewportWidth;

	let footerWidth;
	let multi = false;
	let rollCost;
	let showConverModal = false;

	const navigate = getContext('navigate');
	const goto = (page) => {
		navigate(page);
		playSfx('click');
	};

	// Ready To Pull ?
	const readyToPull = getContext('readyToPull');

	const onWarp = getContext('onWarp');
	$: warpProgress = $onWarp;

	// Convert Modal
	const closeModal = ({ confirm = false }) => {
		playSfx(confirm ? 'click' : 'close');
		showConverModal = false;

		if (confirm) return;
		warpProgress = false;
	};
	setContext('closeModal', closeModal);

	// Warp
	$: isUnlimited = $warpAmount === 'unlimited';
	$: isSpecialPass = bannerType.match('event');
	$: currencyUsed = isSpecialPass ? $specialPass : $regularPass;

	let warpResult;
	let WarpInstance;

	const initialWarp = async (version, phase) => {
		if (!version || !phase) return;
		WarpInstance = await WARP.init(version, phase);
	};
	$: initialWarp($activeVersion, $activePhase);

	const handleGachaAnimation = getContext('handleGachaAnimation');
	const doRoll = async (count, bannerToRoll) => {
		warpProgress = true;
		playSfx();
		multi = count > 1;
		const tmp = [];

		rollCost = bannerToRoll === 'starter' ? 8 : count;
		if (!isUnlimited && rollCost > currencyUsed) return (showConverModal = true);

		for (let i = 0; i < count; i++) {
			const result = await roll(bannerToRoll, WarpInstance);
			tmp.push(result);
		}

		warpResult = tmp;
		handleGachaAnimation(warpResult);
		if (isUnlimited) return;
		updateMilestones();
		updateBalance(bannerToRoll);
	};

	const reroll = () => {
		doRoll(multi ? 10 : 1, bannerType);
		showConverModal = false;
	};
	setContext('reroll', reroll);

	const updateMilestones = () => {
		const update = (type) => {
			const qty = warpResult.reduce((prev, { undyingQty, undyingType }) => {
				return prev + (undyingType === type ? undyingQty : 0);
			}, 0);

			const milestone = type === 'embers' ? embers : starlight;
			milestone.update((n) => {
				const afterUpdate = n + qty;
				localBalance.set(type, afterUpdate);
				return afterUpdate;
			});
		};

		update('starlight');
		update('embers');
	};

	const updateBalance = (banner) => {
		const isSpecialPass = banner.match('event');
		const currency = isSpecialPass ? specialPass : regularPass;
		currency.update((n) => {
			const afterUpdate = n - rollCost;
			localBalance.set(isSpecialPass ? 'specialPass' : 'regularPass', afterUpdate);
			return afterUpdate;
		});
	};
</script>

{#if showConverModal}
	<ConvertModal {rollCost} {isSpecialPass} />
{/if}

<div
	class="button-container"
	class:fit
	style="--width:{footerWidth}px"
	bind:clientWidth={footerWidth}
>
	<div class="row">
		<div class="info-button">
			<div class="btn">
				<Button on:click={() => goto('collection')}>
					{$t('collection.button')}
				</Button>
			</div>
			<div class="btn">
				<Button on:click={() => goto('details')}>
					{$t('details.view')}
				</Button>
			</div>
		</div>
		<div class="warp-button">
			{#if !isStarter}
				<div class="btn">
					<ButtonWarp
						disabled={!$readyToPull || warpProgress}
						single
						{bannerType}
						on:click={() => doRoll(1, bannerType)}
					/>
				</div>
			{/if}
			<div class="btn">
				<ButtonWarp
					disabled={!$readyToPull || warpProgress}
					{bannerType}
					on:click={() => doRoll(10, bannerType)}
				/>
			</div>
		</div>
	</div>
</div>

<style>
	.button-container {
		width: calc(83vw);
		position: fixed;
		bottom: 6%;
		right: 0;
		z-index: +1;
		padding-right: 7%;
	}

	@media screen and (min-width: 750px) {
		.button-container.fit {
			transform: translateX(3%);
		}
	}

	.row {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: flex-end;
	}

	.info-button,
	.warp-button {
		display: flex;
		width: 100%;
	}

	.warp-button {
		margin-left: 1rem;
		justify-content: flex-end;
	}

	.btn {
		padding: 0.5%;
	}

	.info-button :global(button) {
		min-width: 7.75rem;
		max-width: 15.5rem;
	}

	/* Mobile Landscape */
	:global(.mobileLandscape) .button-container {
		bottom: 4.5%;
		padding-right: 6.5%;
	}
	:global(.mobileLandscape) .warp-button {
		transform: scale(0.95);
	}

	@media screen and (max-width: 999px) {
		:global(main):not(.mobileLandscape) .info-button {
			flex-wrap: wrap;
		}
	}

	@media screen and (max-width: 750px) {
		.button-container {
			width: 100vw;
			padding: 0 1rem;
			bottom: 4%;
		}
	}

	@media screen and (max-width: 640px) {
		.warp-button {
			flex-wrap: wrap;
			width: fit-content;
		}
	}
</style>
