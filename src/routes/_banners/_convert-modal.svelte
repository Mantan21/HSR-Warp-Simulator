<script>
	import { getContext } from 'svelte';
	import { specialPass, regularPass, stellarJade } from '$lib/stores/app-store';
	import Modal from '$lib/components/Modal.svelte';
	import { localConfig } from '$lib/stores/localstorage';

	export let isSpecialPass = false;
	export let rollCost;

	const closeModal = getContext('closeModal');
	const reroll = getContext('reroll');

	const currencyUsed = isSpecialPass ? $specialPass : $regularPass;
	const ticket = isSpecialPass ? 'Star Rail Special Pass' : 'Star Rail Regular Pass';

	const ticketNeeded = rollCost - currencyUsed;
	const jadeNeeded = ticketNeeded * 160;
	const insufficientJade = $stellarJade < jadeNeeded;

	const localBalance = localConfig.get('balance');
	const convert = (currency, val) => {
		localBalance[currency] = val;
		localConfig.set('balance', localBalance);
	};

	const updateBalance = async () => {
		new Promise((resolve, reject) => {
			if (insufficientJade) return reject('not enough Stellar Jade');
			stellarJade.update((n) => {
				const v = n - jadeNeeded;
				convert('stellarJade', v);
				resolve('ok');
				return v;
			});

			if (isSpecialPass) {
				specialPass.update((n) => {
					const v = n + ticketNeeded;
					convert('specialPass', v);
					resolve('ok');
					return v;
				});
			} else {
				regularPass.update((n) => {
					const v = n + ticketNeeded;
					convert('regularPass', v);
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

<Modal title="Tip" on:cancel={closeModal} on:confirm={convertAndRoll} disabled={insufficientJade}>
	<div class="modal-content">
		Insufficient {ticket}. Consume <span>{jadeNeeded}</span> Stellar Jade to purchase
		<span>{ticketNeeded}</span>
		{ticket}?
	</div>
</Modal>

<style>
	.modal-content {
		font-size: 120%;
	}

	.modal-content span {
		color: #ec8608;
	}
</style>
