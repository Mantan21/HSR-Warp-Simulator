import { get3StarItem, get4StarItem, getAllChars, rand } from './gachaBase';

const regularWarp = (rarity, regularData) => {
	const { characters } = regularData;

	if (rarity === 5) {
		const result = getAllChars(5).filter(({ name }) => characters.includes(name));
		return rand(result);
	}

	if (rarity === 3) return get3StarItem();
	if (rarity === 4) return get4StarItem();
};

export default regularWarp;
