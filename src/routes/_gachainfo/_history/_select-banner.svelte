<script>
	import { getContext, setContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { bannerList, showStarterBanner, starterRemaining } from '$lib/stores/app-store';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import Modal from '$lib/components/Modal.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import { HistoryManager } from '$lib/helpers/dataAPI/api-indexeddb';
	import { guaranteedStatus, localPity, rollCounter } from '$lib/helpers/dataAPI/api-localstorage';

	export let banner;

	let showSelectList = false;

	$: list = $bannerList.filter((item, i, arr) => i === arr.findIndex((v) => v.type === item.type));
	//  check if beginner banner already gone, push it to hostory list
	$: if (list.findIndex(({ type }) => type === 'starter') < 0) list.unshift({ type: 'starter' });
	$: nowOpenIndex = list.findIndex(({ type }) => type === banner.toLocaleLowerCase());
	$: selected = nowOpenIndex < 0 ? 2 : nowOpenIndex;

	const selectBanner = getContext('selectBanner');
	const select = (bn) => {
		showSelectList = !showSelectList;
		playSfx('click2');
		selectBanner(bn);
	};

	const bn = (type) => {
		return ['lightcone', 'character'].includes(type) ? `${type}-event` : type;
	};

	// Modal Reset
	let showToast = false;
	let modalReset = false;
	const showModalReset = () => {
		playSfx();
		modalReset = true;
	};
	const closeModal = () => {
		modalReset = false;
		playSfx('close');
	};
	setContext('closeModal', closeModal);

	const { clearHistory } = HistoryManager;
	const clear = getContext('clearHistory');

	const confirmReset = async () => {
		await clearHistory(banner);
		localPity.set(`pity5${banner}`, 0);
		localPity.set(`pity4${banner}`, 0);
		if (banner.match('event')) {
			guaranteedStatus.set(`${banner}-4star`, false);
			guaranteedStatus.set(`${banner}-5star`, false);
		} else guaranteedStatus.set(banner, false);

		if (banner === 'starter') {
			rollCounter.set('starter', 0);
			showStarterBanner.set(true);
			starterRemaining.set(50);
		}
		clear();
		playSfx();

		modalReset = false;
		showToast = true;
	};

	setContext('closeToast', () => (showToast = false));
</script>

<!-- Modal Reset -->
{#if modalReset}
	<Modal title={$t('history.resetPromptTitle')} on:cancel={closeModal} on:confirm={confirmReset}>
		<div class="confirmation">
			<p>
				{@html $t('history.resetPrompt', {
					values: { bannerName: `<u>${$t(`banner.${banner}`)}</u>` }
				})}
			</p>
		</div>
	</Modal>
{/if}

{#if showToast}
	<Toast>{$t('history.resetSuccess')}</Toast>
{/if}
<!-- End Modal Reset -->

<div class="selectType">
	<button
		class="selected"
		on:click={() => {
			showSelectList = !showSelectList;
			playSfx('click2');
		}}
	>
		{@html $t(`banner.${bn(banner)}`)}
		<i class="hsr-caret-{showSelectList ? 'up' : 'down'}" />
	</button>

	<button class="clear" on:click={showModalReset}>
		<i class="hsr-trash" /> {$t('history.resetButton')}</button
	>

	{#if showSelectList}
		<div class="select-list" transition:fade={{ duration: 200 }}>
			{#each list as { type }, i}
				<button
					class="item"
					class:active={selected === i}
					on:click|preventDefault={() => select(type)}
				>
					<span>
						{@html $t(`banner.${bn(type)}`)}
					</span>
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.confirmation {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		padding: 3%;
		text-align: center;
	}

	.selectType {
		width: 100%;
		display: flex;
		align-items: center;
		position: relative;
		border-bottom: 0.15rem solid #ddd;
	}

	.selected {
		width: 100%;
		padding: 0.8% 0;
		font-size: calc(0.02 * var(--width));
		text-align: left;
		position: relative;
	}

	.selectType .clear {
		font-size: calc(0.0125 * var(--width));
		min-width: fit-content;
		border: 2px solid #888;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: calc(0.005 * var(--width)) calc(0.015 * var(--width));
		border-radius: 3rem;
		transform: scale(1.0001);
		transition: all 0.25s;
	}

	.clear:hover {
		background-color: #d32525;
		color: #fff;
		border-color: transparent;
	}
	.clear:active {
		transform: scale(0.95);
	}

	.clear i {
		font-size: calc(0.015 * var(--width));
		line-height: 0;
		display: inline-block;
	}

	button span {
		color: #000;
	}

	.selected i {
		position: absolute;
		top: 50%;
		right: 1rem;
		line-height: 0;
		transform: translate(-50%, -50%) scale(1.3);
	}

	.select-list {
		background-color: #fff;
		width: 100%;
		top: 110%;
		position: absolute;
		box-shadow: 0 0 0.3rem rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		z-index: +2;
	}

	.select-list button {
		padding: 0.2% 1%;
		text-align: left;
		position: relative;
		transition: all 0.2s;
	}
	.select-list span {
		padding: 0.8rem 1.5rem 0.8rem 0.5rem;
		display: block;
		width: 100%;
		border-bottom: 1px solid rgba(0, 0, 0, 0.2);
		transition: all 0.2s;
	}
	.select-list button:last-child span {
		border: none;
	}

	.select-list button:hover {
		box-shadow: 0 0 0.3rem #000;
	}
	.select-list button:hover span {
		border-color: transparent;
	}

	.select-list button::after {
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

	.select-list button.active::after {
		width: 0.6rem;
		background-color: orange;
		border: 0.2rem solid white;
		outline: 0.2rem solid orange;
	}
</style>
