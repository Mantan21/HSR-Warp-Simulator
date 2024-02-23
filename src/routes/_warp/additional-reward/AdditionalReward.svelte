<script>
	import { getContext, onMount, setContext } from 'svelte';
	import { fade, fly } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { assets, regReward } from '$lib/stores/app-store';
	import { regular } from '$lib/data/banners/regular.json';
	import { regularChars5Star } from '$lib/helpers/gacha/gacha-base';
	import { localConfig, owneditem } from '$lib/helpers/dataAPI/api-localstorage';
	import { playSfx } from '$lib/helpers/sounds/audiofx';

	import ButtonGeneral from '$lib/components/ButtonGeneral.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Charlist from './_charlist.svelte';
	import Description from './_description.svelte';

	let contentWidth;
	const handleModal = getContext('handleShowReward');
	const handleGachaAnimation = getContext('handleGachaAnimation');
	const charList = regularChars5Star(regular[0].characters).reverse();

	let showModal = false;
	const openModal = () => {
		showModal = true;
		playSfx('click');
	};
	const closeModal = () => {
		playSfx('modal-close');
		showModal = false;
	};
	setContext('closeModal', closeModal);

	let selected = '';
	let combatType = '';
	const select = (name, combat_type) => {
		if (name === selected) return;
		playSfx('click2');
		selected = name;
		combatType = combat_type;
	};
	setContext('select', select);

	const { rollcount } = $regReward;
	const readyToPick = rollcount >= 300;

	const claimCharacter = () => {
		showModal = false;
		handleModal({ confirm: true });
		const result = charList.find(({ name }) => name === selected);
		handleGachaAnimation([result], 'additional');
		owneditem.put({ itemID: result.itemID, source: 'additional' });
		regReward.update(({ rollcount }) => ({ rollcount, isClaimed: true }));
		localConfig.set('additionalClaimed', true);
	};
	onMount(() => playSfx('paper-flip'));
</script>

{#if showModal}
	<Modal title={$t('additionalReward.hint')} on:cancel={closeModal} on:confirm={claimCharacter}>
		<div class="modal-content" style="text-align: center; width: 100%;">
			{$t('additionalReward.selectPrompt')}
		</div>
	</Modal>
{/if}

<div
	class="modal"
	on:mousedown={handleModal}
	in:fade={{ duration: 200 }}
	out:fade={{ duration: 200 }}
>
	<div
		style="--bg:url('{$assets['additional-reward-bg.webp']}'); --wd:{contentWidth}px"
		class="container"
		bind:clientWidth={contentWidth}
		in:fly={{ y: 20, duration: 250, opacity: 1 }}
		out:fly={{ y: 50, duration: 100, opacity: 1 }}
	>
		<div class="wrapper" on:mousedown|stopPropagation>
			<Charlist {selected} {charList} />
			<Description {charList} {selected} {combatType} {readyToPick} />

			<div class="footer">
				<span><i class="hsr-star" /></span>

				{#if readyToPick && !selected}
					<caption> {$t('additionalReward.selectChar')} </caption>
				{:else}
					<ButtonGeneral icon="note" notAllowed>
						{$t('additionalReward.viewDetail')}
					</ButtonGeneral>
					{#if readyToPick}
						<ButtonGeneral colored icon="select" on:click={openModal}>
							{$t('additionalReward.select')}
						</ButtonGeneral>
					{:else}
						<ButtonGeneral disabled>
							{$t('additionalReward.progress', { values: { rollcount } })}
						</ButtonGeneral>
					{/if}
				{/if}
			</div>
		</div>

		<span class="note" transition:fade>
			{$t('clickToClose')}
		</span>
	</div>
</div>

<style>
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: var(--screen-height);
		background-color: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(10px);
		z-index: 10;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.container {
		width: 75%;
		max-width: 160vh;
		position: relative;
		color: #000;
		z-index: 2;
		background-size: cover;
		background-image: var(--bg);
		aspect-ratio: 135/76;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@media screen and (max-width: 800px) {
		.container {
			width: 100%;
		}
	}
	.note {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		color: rgba(255, 255, 255, 0.5);
		font-size: calc(0.015 * var(--wd));
	}

	.wrapper {
		aspect-ratio: 1.82/1;
		width: calc(0.778 * var(--wd));
	}

	.footer {
		height: calc(0.0415 * var(--wd));
		margin-top: calc(0.035 * var(--wd));
		display: flex;
		align-items: center;
		justify-content: center;
		transform: translateY(10%);
		position: relative;
	}

	.footer > span {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, -60%);
		font-size: calc(0.035 * var(--wd));
		-webkit-text-stroke: 0.1rem #ffce63;
		background-color: #242424;
		border-radius: 100%;
		aspect-ratio: 1/1;
		width: calc(0.06 * var(--wd));
		display: flex;
		justify-content: center;
		align-items: center;
	}
	i.hsr-star {
		color: #242424 !important;
		opacity: 0.5;
	}

	.footer caption {
		color: var(--color-second);
		position: relative;
		z-index: +1;
		opacity: 0.6;
		font-size: calc(0.0175 * var(--wd));
	}

	.footer :global(button) {
		padding: calc(0.009 * var(--wd));
		width: calc(0.2 * var(--wd));
		font-size: calc(0.0125 * var(--wd));
	}
</style>
