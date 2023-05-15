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
import { localConfig } from '$lib/stores/localstorage';

const { clearIDB } = IDBManager;
export const storageReset = async () => {
	await clearIDB();
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

	showStarterBanner.set(true);
	starterRemaining.set(50);
};
