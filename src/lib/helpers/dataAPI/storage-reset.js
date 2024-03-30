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
	animatedLC,
	autoskip,
	embers,
	oneiric,
	probEdit,
	regReward,
	regularPass,
	showStarterBanner,
	specialPass,
	starlight,
	starterRemaining,
	stellarJade,
	warpAmount
} from '$lib/stores/app-store';
import { muted } from '$lib/stores/phonograph-store';
import { HistoryManager } from '$lib/helpers/dataAPI/api-indexeddb';
import { localConfig, storageLocal } from '$lib/helpers/dataAPI/api-localstorage';

const { clearIDB } = HistoryManager;

const clearCacheStorage = async () => {
	const keys = await caches.keys();
	for (const key of keys) await caches.delete(key);
	return true;
};

export const storageReset = async ({ keepSetting = false, clearCache = false } = {}) => {
	await clearIDB();
	if (clearCache) await clearCacheStorage();

	starterRemaining.set(50);
	showStarterBanner.set(true);
	regReward.set({ rollcount: 0, isClaimed: false });
	const customTracks = storageLocal.get('customTracks');

	if (keepSetting) {
		const config = storageLocal.get('config');
		const pity = storageLocal.get('pity');
		const balance = storageLocal.get('balance');
		const probabilityRates = storageLocal.get('probabilityRates');
		localStorage.removeItem('WarpSimulator');
		delete config.additionalClaimed;

		storageLocal.set('config', config);
		storageLocal.set('pity', pity);
		storageLocal.set('balance', balance);
		storageLocal.set('customTracks', customTracks);
		storageLocal.set('probabilityRates', probabilityRates);
		return;
	}

	localStorage.clear();
	storageLocal.set('customTracks', customTracks);

	stellarJade.set(balance.stellarJade);
	specialPass.set(balance.ticketPass);
	regularPass.set(balance.ticketPass);
	oneiric.set(balance.oneiric);
	embers.set(0);
	starlight.set(0);

	localConfig.set('version', `${version}-${warpPhase}`);
	localConfig.set('storageVersion', storageVersion);
	activeVersion.set(version);
	activePhase.set(warpPhase);
	activeBanner.set(0);

	animatedLC.set(false);
	warpAmount.set('default');
	autoskip.set({ express: false, art: true });
	muted.set({ bgm: false, sfx: false });
	probEdit.set(false);
};
