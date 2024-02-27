import { HistoryManager } from '$lib/helpers/dataAPI/api-indexeddb';
import { owneditem, storageLocal } from '$lib/helpers/dataAPI/api-localstorage';

const { getList } = HistoryManager;
export const setNewCalculation = async () => {
	await resetOwnedItem();

	const beginner = await getList('starter');
	const character = await getList('character-event');
	const weapons = await getList('lightcone-event');
	const standard = await getList('regular');
	const list = [...beginner, ...character, ...weapons, ...standard];
	if (list.length < 1) return;
	list.map(({ itemID }) => owneditem.put({ itemID }));
};

const resetOwnedItem = () => {
	const promise = new Promise((resolve) => {
		const items = owneditem.getAll();
		const newCalculation = Object.keys(items).reduce((prev, current) => {
			const owned = prev || {};
			const { manual } = items[current];
			owned[current] = { manual };
			return owned;
		}, {});

		storageLocal.set('ownedItem', newCalculation);
		resolve('ok');
	});
	return promise;
};
