import { storageVersion, version as siteVersion, warpPhase } from '$lib/data/warp-setup.json';
import { activePhase, activeVersion, showStarterBanner } from '$lib/stores/app-store';
import { localConfig, rollCounter } from '$lib/stores/localstorage';

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

export { setBannerVersionAndPhase, checkStarterBanner };
