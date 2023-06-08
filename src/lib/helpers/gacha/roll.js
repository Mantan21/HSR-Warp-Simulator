import { regReward, starterRemaining } from '$lib/stores/app-store';
import { HistoryManager } from '$lib/stores/idbManager';
import { guaranteedStatus, localPity, owneditem, rollCounter } from '$lib/stores/localstorage';
import prob, { base4StarChar, base4StarLC, base5StarChar, base5StarLC } from './probabilities';

const { addHistory } = HistoryManager;

export const roll = async (banner, WarpInstance) => {
	const pity5 = localPity.get(`pity5${banner}`);
	const pity4 = localPity.get(`pity4${banner}`);

	const isLC = banner === 'lightcone-event';
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

	const rollQty = rollCounter.get(banner);
	rollCounter.set(banner, rollQty + 1);

	if (banner === 'starter') {
		// starter banner limited 50 pulls
		const isAlreadyGet5star = guaranteedStatus.get('starter');
		const isGuaranteed50pull = rollQty === 49 && !isAlreadyGet5star;
		if (isGuaranteed50pull) rarity = 5;
		starterRemaining.update((v) => v - 1);
	}

	// 300th pulls on regular banner, pick a character
	if (rollQty <= 300 && banner === 'regular') {
		regReward.update(({ isClaimed }) => ({ rollcount: rollQty + 1, isClaimed }));
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

	// Get Item
	const randomItem = WarpInstance.getItem(rarity, banner);
	const { manual, warp } = owneditem.put({ name: randomItem.name });
	const numberOfOwnedItem = manual + warp - 1;

	// storing item to storage
	await saveResult({ pity, ...randomItem });

	const isFullEidolon = numberOfOwnedItem > 6;
	const isNew = numberOfOwnedItem < 1;

	// Undying Counter
	const undyingType = randomItem.rarity === 3 ? 'embers' : 'starlight';
	const undyingQty = getMilestoneQty(randomItem.rarity, randomItem.type, isFullEidolon, isNew);

	// Set Eidolon
	if (randomItem.type === 'character' && !isNew) {
		randomItem.eidolon = !isFullEidolon;
	}

	const result = { pity, isNew, undyingQty, undyingType, ...randomItem };
	return result;
};

const getMilestoneQty = (rarity, type, isFullEidolon, isNew) => {
	// Always give bonus on obtaining lightcone
	if (type === 'lightcone') {
		if (rarity === 3) return 20; // *3
		if (rarity === 4) return 8; // *4
		return 40; // *5
	}

	// Don't give bonus to newly obtained character
	if (isNew) return 0;

	// Give starlight for duplicate characters
	if (rarity === 4) return isFullEidolon ? 20 : 8; // *4
	return isFullEidolon ? 100 : 40; // *5
};

const saveResult = async (result) => {
	// await addHistory()

	const data = { ...result };
	delete data.buttonOffset;
	delete data.splashartOffset;
	delete data.gachaCardOffset;
	delete data.bannerOffset;

	await addHistory(data);
};
