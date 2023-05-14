import {
	storageVersion,
	version as siteVersion,
	warpPhase,
	initialAmount
} from '$lib/data/warp-setup.json';
import {
	activePhase,
	activeVersion,
	regularPass,
	showStarterBanner,
	specialPass,
	starterRemaining,
	stellarJade,
	warpAmount
} from '$lib/stores/app-store';
import { localConfig, rollCounter } from '$lib/stores/localstorage';

const importLocalBalance = () => {
	const placeholder = {
		stellarJade: initialAmount.stellarJade,
		specialPass: initialAmount.ticketPass,
		regularPass: initialAmount.ticketPass
	};
	const lb = localConfig.get('balance') || placeholder;
	stellarJade.set(lb.stellarJade || 0);
	specialPass.set(lb.specialPass || 0);
	regularPass.set(lb.regularPass) || 0;

	const lWarpAmount = localConfig.get('warpAmount') || 'default';
	warpAmount.set(lWarpAmount);

	const starterRollCount = rollCounter.get('starter') || 0;
	starterRemaining.set(50 - starterRollCount);
};

const setBannerVersionAndPhase = () => {
	let patch, phase;
	const localstoreVersion = localConfig.get('storageVersion');
	const localVersion = localConfig.get('version');
	if (localstoreVersion !== storageVersion || !localVersion) {
		localConfig.set('version', `${siteVersion}-${warpPhase}`);
		localConfig.set('storageVersion', storageVersion);
		[patch, phase] = [siteVersion, warpPhase];
	} else {
		[patch, phase] = localVersion.split('-');
	}

	activePhase.set(parseInt(phase));
	activeVersion.set(patch);

	console.log(`Banner version set to ${patch} phase ${phase}`);
};

const checkStarterBanner = () => {
	const starterRollCount = rollCounter.get('starter');
	const isShowStarter = starterRollCount < 50;
	showStarterBanner.set(isShowStarter);
	return isShowStarter;
};

export { setBannerVersionAndPhase, checkStarterBanner, importLocalBalance };
