import { starter } from '$lib/data/banners/starter.json';
import { regular } from '$lib/data/banners/regular.json';
import { data as charDB } from '$lib/data/characters.json';
import { data as lcDB } from '$lib/data/light-cones.json';

import { checkStarterBanner } from '$lib/helpers/storage-reader';
import { bannerList } from '$lib/stores/app-store';
import { identifyBanner } from './banners';

export const initializeBanner = async (version, phase) => {
	try {
		if (!version || !phase) return {};
		const list = checkStarterBanner() ? [{ ...starter, ...identifyBanner(starter.bannerID) }] : [];
		const { data } = await import(`../../lib/data/banners/events/${version}.json`);
		const { character, lightcone, regularVersion } = data.find((d) => d.phase === phase).banners;
		const regularData = regular.find(({ version }) => version === regularVersion);

		const charInfo = charDB.find(({ name }) => name === character.featured);
		character.path = charInfo.path;
		character.combat_type = charInfo.combat_type;
		list.push({ ...character, ...identifyBanner(character.bannerID) });

		if (lightcone) {
			const lcInfo = lcDB.find(({ name }) => name === lightcone.featured);
			lightcone.path = lcInfo.path;
			list.push({ ...lightcone, ...identifyBanner(lightcone.bannerID) });
		}

		list.push({ ...regularData, ...identifyBanner(regularData.bannerID) });
		bannerList.set(list);

		return { status: 'ok' };
	} catch (e) {
		console.error(e);
		return { status: 'error', e };
	}
};

export const handleShowStarter = (show) => {
	let bannerLength;
	bannerList.update((v) => {
		bannerLength = v.length;
		return v;
	});

	if (bannerLength < 2) return;
	if (!show) {
		return bannerList.update((bn) => {
			return bn.filter(({ type }) => type !== 'starter');
		});
	}
	return bannerList.update((bn) => {
		bn.unshift({ ...starter, ...identifyBanner(starter.bannerID) });
		return bn;
	});
};
