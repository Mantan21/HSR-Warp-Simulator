import { probabilityRates } from '$lib/data/warp-setup.json';
import { localrate } from '$lib/helpers/dataAPI/api-localstorage';

export const rates = ({
	currentPity = 0,
	maxPity = 90,
	baseRate = 0.6,
	rateIncreasedAt = 74
} = {}) => {
	if (baseRate <= 0 && currentPity < maxPity) return 0;
	if (currentPity < rateIncreasedAt) return baseRate;

	if (currentPity >= maxPity) return 100;

	const rateIncreasedBy = (100 - baseRate) / (maxPity + 1 - rateIncreasedAt);
	const rateBeforeCurrentPity = (currentPity + 1 - rateIncreasedAt) * rateIncreasedBy;
	const increasedRate = rateBeforeCurrentPity + baseRate;
	return increasedRate;
};

// Random Item by probability
export const prob = (items) => {
	let chances = [];
	for (let i = 0; i < items.length; i++) {
		chances[i] = items[i].chance + (chances[i - 1] || 0);
	}
	const random = Math.random() * chances[chances.length - 1];
	const result = items[chances.findIndex((chance) => chance > random)];
	return result;
};

const rateKey = (banner) => {
	if (banner.match('char')) return 'character-event';
	if (banner.match('cone')) return 'lightcone-event';
	return banner;
};

// Read Custom Probability
export const getRate = (banner, key) => {
	if (banner === 'starter') {
		const initial = probabilityRates['character-event'];
		return initial[key];
	}

	const initial = probabilityRates[rateKey(banner)];
	const local = localrate.get(rateKey(banner));
	if (!(local[key] || local[key] >= 0)) return initial[key];

	const val = parseFloat(local[key]);
	if (isNaN(val)) return local[key];
	return val;
};

export const setRate = (banner, key, val) => {
	const local = localrate.get(rateKey(banner));
	if (typeof val === 'boolean') {
		local[key] = val;
	} else {
		const value = parseFloat(val);
		if (isNaN(value)) local[key] = val;
		else local[key] = value;
	}

	localrate.set(rateKey(banner), local);
};
