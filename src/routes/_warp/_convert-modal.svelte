<script>
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { specialPass, regularPass, stellarJade } from '$lib/stores/app-store';
	import Modal from '$lib/components/Modal.svelte';
	import { localBalance } from '$lib/helpers/dataAPI/api-localstorage';

	export let isSpecialPass = false;
	export let rollCost;

	const closeModal = getContext('closeModal');
	const reroll = getContext('reroll');

	const currencyUsed = isSpecialPass ? $specialPass : $regularPass;
	const ticket = isSpecialPass ? $t('item.specialPass') : $t('item.regularPass');

	const ticketNeeded = rollCost - currencyUsed;
	const jadeNeeded = ticketNeeded * 160;
	const insufficientJade = $stellarJade < jadeNeeded;

	const updateBalance = async () => {
		new Promise((resolve, reject) => {
			if (insufficientJade) return reject('not enough Stellar Jade');
			stellarJade.update((n) => {
				const v = n - jadeNeeded;
				localBalance.set('stellarJade', v);
				resolve('ok');
				return v;
			});

			if (isSpecialPass) {
				specialPass.update((n) => {
					const v = n + ticketNeeded;
					localBalance.set('specialPass', v);
					resolve('ok');
					return v;
				});
			} else {
				regularPass.update((n) => {
					const v = n + ticketNeeded;
					localBalance.set('regularPass', v);
					resolve('ok');
					return v;
				});
			}
		});
	};

	const convertAndRoll = async () => {
		await updateBalance();
		return reroll();
	};
</script>

<Modal
	title={$t('tip')}
	on:cancel={closeModal}
	on:confirm={convertAndRoll}
	disabled={insufficientJade}
>
	<div class="modal-content">
		{@html $t('warp.convertModal', {
			values: {
				ticket,
				jadeNeeded: `<span>${jadeNeeded}</span>`,
				ticketNeeded: `<span>${ticketNeeded}</span>`
			}
		})}
	</div>
</Modal>

<style>
	.modal-content {
		font-size: 120%;
	}

	.modal-content :global(span) {
		color: #ec8608;
	}
</style>
