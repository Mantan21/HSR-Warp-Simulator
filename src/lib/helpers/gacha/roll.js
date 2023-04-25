import { showStarterBanner } from '$lib/stores/app-store';
import { guaranteedStatus, localPity, starterRollQty } from '$lib/stores/localstorage';
import prob, { base4StarChar, base4StarLC, base5StarChar, base5StarLC } from './probabilities';

export const roll = async (banner, WarpInstance) => {
	const pity5 = localPity.get(`pity5${banner}`);
	const pity4 = localPity.get(`pity4${banner}`);

	const isLC = banner === 'lightcone';
	const maxPity = (isLC ? 80 : 90) - 1; // Minus 1 to match with index of base pity

	const chance5star = isLC ? base5StarLC[pity5] || 100 : base5StarChar[pity5] || 100;
	let chance4star = isLC ? base4StarLC[pity4] : base4StarChar[pity4];
	let chance3star = 100 - chance4star - chance5star;

	if (chance3star < 0 && pity5 > maxPity - 1) chance4star = 0;
	if (chance3star < 0) chance3star = 0;

	const item = [
		{
			rarity: 3,
			chance: chance3star
		},
		{
			rarity: 4,
			chance: chance4star
		},
		{
			rarity: 5,
			chance: chance5star
		}
	];

	let { rarity } = prob(item);
	let pity = 1;

	if (banner === 'starter') {
		const rollQty = starterRollQty.get();
		starterRollQty.set(rollQty + 1);
		const isAlreadyGet5star = guaranteedStatus.get('starter');
		if (rollQty === 49) showStarterBanner.set(false);
		const isGuaranteed50pull = rollQty === 49 && !isAlreadyGet5star;
		if (isGuaranteed50pull) rarity = 5;
	}

	if (rarity === 5) {
		localPity.set(`pity4${banner}`, pity4 + 1);
		localPity.set(`pity5${banner}`, 0);
		pity = pity5 + 1;
	}

	if (rarity === 4) {
		localPity.set(`pity4${banner}`, 0);
		localPity.set(`pity5${banner}`, pity5 + 1);
		pity = pity4 + 1;
	}

	if (rarity === 3) {
		localPity.set(`pity4${banner}`, pity4 + 1);
		localPity.set(`pity5${banner}`, pity5 + 1);
	}

	const randomItem = WarpInstance.getItem(rarity, banner);
	const result = { pity, ...randomItem };
	return result;
};
