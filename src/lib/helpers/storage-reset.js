import {
	initialAmount as balance,
	storageVersion,
	version,
	warpPhase
} from '$lib/data/warp-setup.json';
import { regularPass, specialPass, stellarJade } from '$lib/stores/app-store';
import IDBManager from '$lib/stores/idbManager';
import { localConfig } from '$lib/stores/localstorage';

const { clearIDB } = IDBManager;
export const storageReset = async () => {
	await clearIDB();
	localStorage.clear();
	localConfig.set('balance', {
		stellarJade: balance.stellarJade,
		specialPass: balance.ticketPass,
		regularPass: balance.ticketPass
	});
	localConfig.set('version', `${version}-${warpPhase}`);
	localConfig.set('storageVersion', storageVersion);
	stellarJade.set(balance.stellarJade);
	specialPass.set(balance.ticketPass);
	regularPass.set(balance.ticketPass);
};
