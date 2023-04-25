import { starter } from '$lib/data/banners/starter.json';
import { roll } from './roll';
import starterWarp from './starterWarp';

const WARP = {
	async init(version, phase) {
		const { data } = await import('$lib/data/banners/events/1.0.json');
		const { character, lightcone, regularVersion } = data.find((d) => d.phase === phase).banners;

		const { regular } = await import('$lib/data/banners/regular.json');
		const regularBanner = regular.find(({ version }) => version === regularVersion);
		this._version = version;
		this._phase = phase;
		this._starter = starter;
		this._regularBanner = regularBanner;
		this._characterBanner = character;
		this._lightconeBanner = lightcone;

		return this;
	},

	_starterWish(rarity) {
		const result = starterWarp(rarity, this._starter);
		return result;
	},

	getItem(rarity, banner) {
		const date = new Date();
		const time = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
		const resultObj = { time, bannerName: banner };

		if (banner === 'starter') return { ...resultObj, ...this._starterWish(rarity) };
		// if (banner === 'standard') result = this._standardWish(rarity);
		// if (banner === 'events') result = this._limitedWish(rarity, indexOfBanner);
		// if (banner === 'weapons') result = this._weaponWish(rarity);
		return { type: null, rarity: 0, name: null };
	}
};

export default WARP;
export { roll };
