import { storageVersion, version as siteVersion, warpPhase } from '$lib/data/warp-setup.json';
import {
	activePhase,
	activeVersion,
	regularPass,
	showStarterBanner,
	specialPass,
	stellarJade,
	warpAmount
} from '$lib/stores/app-store';
import { localConfig, rollCounter } from '$lib/stores/localstorage';

const importLocalBalance = () => {
	const placeholder = { stellarJade: 0, specialPass: 0, regullarPass: 0 };
	const lb = localConfig.get('balance') || placeholder;
	stellarJade.set(lb.stellarJade);
	specialPass.set(lb.specialPass);
	regularPass.set(lb.regularPass);

	const lWarpAmount = localConfig.get('warpAmount') || 'default';
	warpAmount.set(lWarpAmount);
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
