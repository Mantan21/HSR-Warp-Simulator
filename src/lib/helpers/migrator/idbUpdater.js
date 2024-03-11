// import { deleteDB } from 'idb';
import { data as charDB } from '$lib/data/characters.json';
import { data as lcDB } from '$lib/data/light-cones.json';
import { HistoryManager } from '$lib/helpers/dataAPI/api-indexeddb';
import { localConfig } from '$lib/helpers/dataAPI/api-localstorage';
import { setNewCalculation } from './newItemCalculation';

const { getAllHistories, addHistory } = HistoryManager;

export const IDBUpdater = async () => {
	const idbVer = localConfig.get('idbVer');

	if (!idbVer || idbVer < 5) {
		// Update IDB
		const itemIDs = {};
		charDB.forEach(({ itemID, name }) => (itemIDs[name] = itemID));
		lcDB.forEach(({ itemID, name }) => (itemIDs[name] = itemID));
		const historyData = await getAllHistories();

		for (let i = 0; i < historyData.length; i++) {
			const data = historyData[i];
			data.itemID = itemIDs[data.name];
			await addHistory(data);

			if (i < historyData.length - 1) continue;
			await setNewCalculation();
			localConfig.set('idbVer', 5);
		}
	}
};
