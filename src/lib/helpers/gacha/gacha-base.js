import { data as lcDB } from '$lib/data/light-cones.json';
import { data as charsDB } from '$lib/data/characters.json';
import { getRate, prob } from './probabilities';
import { guaranteedStatus } from '$lib/helpers/dataAPI/api-localstorage';

export const rand = (array) => {
	if (!Array.isArray(array)) return array;
	if (array.length < 2) return array[0];
	return array[Math.floor(Math.random() * array.length)];
};

const filterByRelease = (charlist, version = null, phase = null) => {
	return charlist.filter(({ release }) => {
		if (!release) return true;
		const [v, phs] = release.split('-');
		if (parseFloat(version) < parseFloat(v)) return false;
		if (parseFloat(version) === parseFloat(v) && phase <= parseInt(phs)) return false;
		return true;
	});
};

export const getAllChars = (star) =>
	charsDB
		.filter(({ rarity }) => rarity === star)
		.map((arr) => {
			arr.type = 'character';
			return arr;
		});

export const getAllLightCones = (star) =>
	lcDB
		.filter(({ rarity }) => rarity === star)
		.map((arr) => {
			arr.type = 'lightcone';
			return arr;
		});

export const getCharDetails = (charName) => {
	if (!charName) return {};
	const findChar = charsDB.find(({ name }) => charName === name);
	return findChar || {};
};

export const getLCDetails = (lcName) => {
	if (!lcName) return {};
	const findLC = lcDB.find(({ name }) => lcName === name);
	return findLC || {};
};

export const regularChars5Star = (nameList) => {
	return getAllChars(5).filter(({ name }) => nameList.includes(name));
};

export const regularLightcones = (star, exclude = []) => {
	return getAllLightCones(star)
		.filter(({ limited }) => !limited)
		.filter(({ name }) => !exclude.includes(name));
};

export const get3StarItem = () => regularLightcones(3);

export const get4StarItem = ({
	banner = 'regular',
	version = null,
	phase = null,
	type = null,
	useRateup = false,
	rateupNamelist = []
} = {}) => {
	// Rateup Item
	if (useRateup) {
		const isChar = banner === 'character-event';
		const DBList = isChar ? getAllChars(4) : getAllLightCones(4);
		const rateupList = DBList.filter(({ name }) => rateupNamelist.includes(name));
		if (rateupList.length > 0) return rateupList;
		console.log('Rateup Filtering Error');
		return DBList;
	}

	// Beginner droplist
	if (banner === 'starter') {
		const charList = getAllChars(4).filter(({ release }) => release === '1.0-0');
		const lcList = getAllLightCones(4);

		if (type == 'all') return [...charList, ...lcList];
		else if (type === 'character') return charList;
		else if (type === 'lightcone') return lcList;
		else {
			const { itemType } = prob([
				{ itemType: 'char', chance: 50 },
				{ itemType: 'lc', chance: 50 }
			]);

			return itemType === 'lc' ? lcList : charList;
		}
	}

	// General droplist
	let items;
	if (type == 'all') {
		items = [...getAllChars(4), ...regularLightcones(4)];
	} else if (type === 'character') {
		items = getAllChars(4);
	} else if (type === 'lightcone') {
		items = regularLightcones(4);
	} else {
		const charRate = getRate(banner, 'charRate');
		const { itemType } = prob([
			{ itemType: 'char', chance: charRate },
			{ itemType: 'lc', chance: 100 - charRate }
		]);
		items = itemType === 'lc' ? regularLightcones(4) : getAllChars(4);
	}

	const filtered = filterByRelease(items, version, phase);
	const itemList = filtered.filter(({ name }) => !rateupNamelist.includes(name));
	return itemList;
};

export const get5StarItem = ({
	banner = 'starter',
	stdList = [],
	type = null,
	useRateup = false,
	rateupItem = []
} = {}) => {
	// Featured Char Result
	if (useRateup && banner === 'character-event') {
		const featured = getAllChars(5).find(({ name }) => name === rateupItem[0]);
		return featured;
	}

	// Featured Weapon Result
	if (useRateup && banner === 'lightcone-event') {
		const featured = getAllLightCones(5).filter(({ name }) => rateupItem.includes(name));
		return featured;
	}

	// Standard Weapon result
	if (banner === 'lightcone-event') {
		const rateupRemoved = regularLightcones(5).filter(({ name }) => !rateupItem.includes(name));
		return rateupRemoved;
	}

	// Beginner Result
	if (banner === 'starter') {
		const result = regularChars5Star(stdList);
		return result;
	}

	// Standard Result
	if (banner === 'regular' || !banner) {
		let resultList;
		if (type === 'all') {
			resultList = [...regularChars5Star(stdList), ...regularLightcones(5)];
		} else if (type === 'character') {
			resultList = regularChars5Star(stdList);
		} else if (type === 'lightcone') {
			resultList = regularLightcones(5);
		} else {
			const charRate = getRate(banner, 'charRate');
			const { itemType } = prob([
				{ itemType: 'char', chance: charRate },
				{ itemType: 'lc', chance: 100 - charRate }
			]);
			resultList = itemType === 'lc' ? regularLightcones(5) : regularChars5Star(stdList);
		}
		return resultList;
	}

	// Character List while lose on character banner
	return regularChars5Star(stdList).filter(({ name }) => !rateupItem.includes(name));
};

export const isRateup = (banner) => {
	const winRate = getRate(banner, 'winRate');
	const { item } = prob([
		{ item: 'rateup', chance: winRate },
		{ item: 'std', chance: 100 - winRate }
	]);

	return item === 'rateup';
};

// checkGuaranteed
export const checkGuaranteed = (banner, rarity) => {
	const status = guaranteedStatus.get(`${banner}-${rarity}star`);
	const guaranteedSystem = getRate(banner, 'guaranteed');
	const never = guaranteedSystem === 'never';
	const always = guaranteedSystem === 'always';
	return { status, never, always };
};
