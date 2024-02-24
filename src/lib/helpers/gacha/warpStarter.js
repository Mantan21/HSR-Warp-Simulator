import { guaranteedStatus } from '$lib/helpers/dataAPI/api-localstorage';
import { get3StarItem, get4StarItem, rand, regularChars5Star } from './gacha-base';

const starterWarp = ({ rarity, data }) => {
	const { characters } = data;

	if (rarity === 3) {
		const droplist = get3StarItem();
		return rand(droplist);
	}

	if (rarity === 4) {
		const droplist = get4StarItem({ banner: 'starter' });
		return rand(droplist);
	}

	if (rarity === 5) {
		const result = regularChars5Star(characters);
		guaranteedStatus.set('starter', true);
		return rand(result);
	}
};

export default starterWarp;
