import {
	initialAmount as balance,
	storageVersion,
	version,
	warpPhase
} from '$lib/data/warp-setup.json';
import {
	activeBanner,
	activePhase,
	activeVersion,
	regularPass,
	showStarterBanner,
	specialPass,
	starterRemaining,
	stellarJade,
	warpAmount
} from '$lib/stores/app-store';
import IDBManager from '$lib/stores/idbManager';
import { localConfig, storageLocal } from '$lib/stores/localstorage';

const { clearIDB } = IDBManager;
export const storageReset = async ({ keepSetting = false }) => {
	await clearIDB();

	starterRemaining.set(50);
	showStarterBanner.set(true);
	if (keepSetting) {
		const config = storageLocal.get('config');
		const pity = storageLocal.get('pity');
		localStorage.clear();

		storageLocal.set('config', config);
		storageLocal.set('pity', pity);
		return;
	}

	localStorage.clear();
	stellarJade.set(balance.stellarJade);
	specialPass.set(balance.ticketPass);
	regularPass.set(balance.ticketPass);
	warpAmount.set('default');

	localConfig.set('version', `${version}-${warpPhase}`);
	localConfig.set('storageVersion', storageVersion);
	activeVersion.set(version);
	activePhase.set(warpPhase);
	activeBanner.set(0);
};
