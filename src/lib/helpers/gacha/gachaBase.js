import lcDB from '$lib/data/light-cones.json';
import charsDB from '$lib/data/characters.json';

export const rand = (array) => array[Math.floor(Math.random() * array.length)];

export const getAllChars = (star) =>
	charsDB.data
		.filter(({ rarity }) => rarity === star)
		.map((arr) => {
			arr.type = 'character';
			return arr;
		});

export const getAllLightCones = (star) =>
	lcDB.data
		.filter(({ rarity }) => rarity === star)
		.map((arr) => {
			arr.type = 'lightcone';
			return arr;
		});

export const regularChars5Star = (nameList) => {
	return getAllChars(5).filter(({ name }) => nameList.includes(name));
};

export const regularLightcones = (star, exclude = []) => {
	return getAllLightCones(star)
		.filter(({ limited }) => !limited)
		.filter(({ name }) => !exclude.includes(name));
};

const filterCharByReleased = (charlist, version = null, phase = null) => {
	return charlist.filter(({ release }) => {
		if (!release) return true;
		const [v, phs] = release.split('-');
		if (parseFloat(version) < parseFloat(v)) return false;
		if (parseFloat(version) === parseFloat(v) && phase <= parseInt(phs)) return false;
		return true;
	});
};

export const get3StarItem = () => rand(regularLightcones(3));

export const get4StarItem = (version = null, phase = null, { exclude } = { exclude: [] }) => {
	let charList = getAllChars(4);
	const itemType = rand(['lc', 'char']);
	const items = itemType === 'lc' ? regularLightcones(4) : charList;

	let filtered = filterCharByReleased(items, version, phase);
	if (exclude.length > 0) {
		filtered = filtered.filter(({ name }) => !exclude.includes(name));
	}

	return rand(filtered);
};
