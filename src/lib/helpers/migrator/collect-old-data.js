import { HistoryManager } from '$lib/helpers/dataAPI/api-indexeddb';
import { owneditem } from '$lib/helpers/dataAPI/api-localstorage';

const { getList } = HistoryManager;
const migrateWarpHistory = async () => {
	const beginner = await getList('beginner');
	const character = await getList('character-event');
	const weapons = await getList('weapon-event');
	const standard = await getList('standard');
	const list = [...beginner, ...character, ...weapons, ...standard];
	if (list.length < 1) return;
	list.map(({ itemID }) => owneditem.put({ itemID }));
};

export const retriveOldData = async () => {
	// IDB
	const warp = await migrateWarpHistory();
	return warp;
};
