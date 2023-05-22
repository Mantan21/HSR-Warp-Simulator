import { get3StarItem, get4StarItem, getAllChars, rand, regularLightcones } from './gachaBase';

const regularWarp = ({ rarity, data, version, phase }) => {
	const { characters } = data;

	if (rarity === 5) {
		const type = rand(['lc', 'char']);
		if (type === 'lc') return rand(regularLightcones(5));
		const result = getAllChars(5).filter(({ name }) => characters.includes(name));
		return rand(result);
	}

	if (rarity === 3) return get3StarItem();
	if (rarity === 4) return get4StarItem({ version, phase });
};

export default regularWarp;
