import {
	storageVersion,
	version as siteVersion,
	warpPhase,
	initialAmount
} from '$lib/data/warp-setup.json';
import {
	activePhase,
	activeVersion,
	autoskip,
	embers,
	liteMode,
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
import { customTracks, localBalance, localConfig, rollCounter } from '$lib/stores/localstorage';
import { musics } from '$lib/stores/phonograph-store';

const importLocalConfig = () => {
	const { stellarJade: isj, ticketPass: pass, oneiric: ios } = initialAmount;
	const {
		stellarJade: sj,
		specialPass: sp,
		regularPass: rp,
		oneiric: os,
		embers: eb,
		starlight: sl
	} = localBalance.all() || {};
	stellarJade.set(isNaN(sj) ? isj : sj);
	specialPass.set(isNaN(sp) ? pass : sp);
	regularPass.set(isNaN(rp) ? pass : rp);
	oneiric.set(isNaN(os) ? ios : os);
	embers.set(isNaN(eb) ? 0 : eb);
	starlight.set(isNaN(sl) ? 0 : sl);

	const lAutoSkip = localConfig.get('autoskip') || false;
	autoskip.set(lAutoSkip);

	const llitemode = localConfig.get('litemode') || false;
	liteMode.set(llitemode);

	const lWarpAmount = localConfig.get('warpAmount') || 'default';
	warpAmount.set(lWarpAmount);

	const starterRollCount = rollCounter.get('starter') || 0;
	starterRemaining.set(50 - starterRollCount);

	const regularRollCount = rollCounter.get('regular') || 0;
	const isRegRewardClaimed = localConfig.get('additionalClaimed');
	regReward.set({ rollcount: regularRollCount, isClaimed: isRegRewardClaimed });

	// Custom Music
	const customBGM = customTracks.getAll();
	musics.update((m) => {
		customBGM.forEach(({ sourceID, title, description }) => {
			m.push({ album: 'custom-musics', sourceID, title, description });
		});
		return m;
	});
};

const setBannerVersionAndPhase = () => {
	const localstoreVersion = localConfig.get('storageVersion');
	const localVersion = localConfig.get('version') || '';
	let [patch, phase] = localVersion.split('-');
	const cancelPro = parseInt(patch) === 1000000;

	if (cancelPro || localstoreVersion !== storageVersion || !localVersion) {
		localConfig.set('version', `${siteVersion}-${warpPhase}`);
		localConfig.set('storageVersion', storageVersion);
		[patch, phase] = [siteVersion, warpPhase];
	}

	activePhase.set(parseInt(phase));
	activeVersion.set(patch);

	console.log(`Banner version set to ${patch} phase ${phase}`);
};

const restartBannerVersion = () => {
	localConfig.set('version', `${siteVersion}-${warpPhase}`);
	localConfig.set('storageVersion', storageVersion);
	let [patch, phase] = [siteVersion, warpPhase];

	activePhase.set(parseInt(phase));
	activeVersion.set(patch);
};

const checkStarterBanner = () => {
	const starterRollCount = rollCounter.get('starter');
	const isShowStarter = starterRollCount < 50;
	showStarterBanner.set(isShowStarter);
	return isShowStarter;
};

export { setBannerVersionAndPhase, restartBannerVersion, checkStarterBanner, importLocalConfig };
