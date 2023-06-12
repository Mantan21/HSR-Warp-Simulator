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
	autoskip,
	embers,
	oneiric,
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
import { HistoryManager } from '$lib/stores/idbManager';
import { localConfig, storageLocal } from '$lib/stores/localstorage';

const { clearIDB } = HistoryManager;
export const storageReset = async ({ keepSetting = false }) => {
	await clearIDB();

	starterRemaining.set(50);
	showStarterBanner.set(true);
	regReward.set({ rollcount: 0, isClaimed: false });
	const customTracks = storageLocal.get('customTracks');

	if (keepSetting) {
		const config = storageLocal.get('config');
		const pity = storageLocal.get('pity');
		const balance = storageLocal.get('balance');
		localStorage.clear();
		delete config.additionalClaimed;

		storageLocal.set('config', config);
		storageLocal.set('pity', pity);
		storageLocal.set('balance', balance);
		storageLocal.set('customTracks', customTracks);
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

	warpAmount.set('default');
	autoskip.set(false);
	muted.set({ bgm: false, sfx: false });
};
