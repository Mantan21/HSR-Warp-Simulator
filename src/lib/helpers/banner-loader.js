import { starter } from '$lib/data/banners/starter.json';
import { regular } from '$lib/data/banners/regular.json';
import { data as charDB } from '$lib/data/characters.json';
import { data as lcDB } from '$lib/data/light-cones.json';

import { checkStarterBanner } from '$lib/helpers/readLocalData';
import { bannerList } from '$lib/stores/app-store';

export const initializeBanner = async (version, phase) => {
	if (!version || !phase) return;
	const list = checkStarterBanner() ? [{ type: 'starter', item: starter.characters }] : [];
	const { data } = await import(`../../lib/data/banners/events/${version}.json`);
	const { character, lightcone, regularVersion } = data.find((d) => d.phase === phase).banners;
	const regularChar = regular.find(({ version }) => version === regularVersion)?.characters;

	const charInfo = charDB.find(({ name }) => name === character.featured);
	const lcInfo = lcDB.find(({ name }) => name === lightcone.featured);
	character.path = charInfo.path;
	character.combat_type = charInfo.combat_type;
	lightcone.path = lcInfo.path;

	list.push({ type: 'character', item: character });
	list.push({ type: 'lightcone', item: lightcone });
	list.push({ type: 'regular', item: regularChar });

	bannerList.set(list);
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
		bn.unshift({ type: 'starter', item: starter.characters });
		return bn;
	});
};
