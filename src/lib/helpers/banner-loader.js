import { starter } from '$lib/data/banners/starter.json';
import { regular } from '$lib/data/banners/regular.json';
import { banners } from '$lib/data/banners/lists.json';

import { checkStarterBanner } from '$lib/helpers/dataAPI/storage-reader';
import { bannerList } from '$lib/stores/app-store';
import { getCharDetails, getLCDetails } from './gacha/gacha-base';

export const identifyBanner = (bnid = '0-0') => {
	const [id, runNumber] = bnid.split('-');
	const { name, type, featured } = banners.find((b) => b.id === parseInt(id)) || {};
	return { type, bannerName: name, featured, runNumber: parseInt(runNumber) };
};

export const initializeBanner = async (version, phase) => {
	try {
		if (!version || !phase) return {};
		const list = checkStarterBanner() ? [{ ...starter, ...identifyBanner(starter.bannerID) }] : [];
		const { data } = await import(`../../lib/data/banners/events/${version}.json`);
		const { character, lightcone, regularVersion } = data.find((d) => d.phase === phase).banners;
		const regularData = regular.find(({ version }) => version === regularVersion);

		[character, lightcone].forEach(({ bannerID, rateup }) => {
			bannerID.forEach((id) => {
				const { bannerName: banner, featured, runNumber, type } = identifyBanner(id);
				const cek = type.match('character') ? getCharDetails : getLCDetails;
				const { path, combat_type } = cek(featured);

				const bannerName = type.match('cone') && runNumber > 1 ? 'bygone-reminiscence' : banner;

				// prettier-ignore
				list.push({ bannerName, featured, runNumber, type, path, combat_type, rateup,bannerID: id });
			});
		});

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
