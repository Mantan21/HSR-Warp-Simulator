import { banners } from '$lib/data/banners/lists.json';

export const identifyBanner = (bnid = '0-0') => {
	const [id, runNumber] = bnid.split('-');
	const { name, type, beta } = banners.find((b) => b.id === parseInt(id));
	return { type, beta, bannerName: name, runNumber: parseInt(runNumber) };
};
