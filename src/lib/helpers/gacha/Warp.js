import { starter } from '$lib/data/banners/starter.json';
import { roll } from './roll';
import characterWarp from './warpCharacter';
import starterWarp from './warpStarter';
import lightconeWarp from './warpLightcone';

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

	_characterWarp(rarity) {
		const regularChar = this._regularBanner.characters;
		const charBannerWarp = characterWarp.init({
			data: this._characterBanner,
			version: this._version,
			phase: this._phase,
			regularList: regularChar
		});
		const result = { bannerName: this._characterBanner.featured.bannerName };
		return { ...result, ...charBannerWarp.get(rarity) };
	},

	_lightconeWarp(rarity) {
		const { _lightconeBanner, _phase, _version } = this;
		const lightconeBannerWarp = lightconeWarp.init({
			data: _lightconeBanner,
			version: _version,
			phase: _phase
		});
		return lightconeBannerWarp.get(rarity);
	},

	getItem(rarity, banner) {
		const date = new Date();
		const time = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
		const resultObj = { time, banner };

		if (banner === 'starter') return { ...resultObj, ...this._starterWish(rarity) };
		if (banner === 'character') return { ...resultObj, ...this._characterWarp(rarity) };
		if (banner === 'lightcone') return { ...resultObj, ...this._lightconeWarp(rarity) };
		// if (banner === 'standard') result = this._standardWish(rarity);
		return { type: null, rarity: 0, name: null };
	}
};

export default WARP;
export { roll };
