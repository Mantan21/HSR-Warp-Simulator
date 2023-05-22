import { starter } from '$lib/data/banners/starter.json';
import { regular } from '$lib/data/banners/regular.json';
import { roll } from './roll';
import characterWarp from './warpCharacter';
import starterWarp from './warpStarter';
import lightconeWarp from './warpLightcone';
import regularWarp from './warpRegular';

const WARP = {
	async init(version, phase) {
		const { data } = await import(`../../data/banners/events/${version}.json`);
		const { character, lightcone, regularVersion } = data.find((d) => d.phase === phase).banners;
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
		const result = starterWarp({
			data: this._starter,
			version: this._version,
			phase: this._phase,
			rarity
		});
		return { ...result, bannerName: 'departure' };
	},

	_regularWarp(rarity) {
		const result = regularWarp({
			rarity,
			data: this._regularBanner,
			phase: this._phase,
			version: this._version
		});
		return { ...result, bannerName: 'stellar' };
	},

	_characterWarp(rarity) {
		const regularChar = this._regularBanner.characters;
		const charBannerWarp = characterWarp.init({
			data: this._characterBanner,
			version: this._version,
			phase: this._phase,
			regularList: regularChar
		});
		const result = { bannerName: this._characterBanner.bannerName };
		return { ...result, ...charBannerWarp.get(rarity) };
	},

	_lightconeWarp(rarity) {
		const { _lightconeBanner, _phase, _version } = this;
		const lightconeBannerWarp = lightconeWarp.init({
			data: _lightconeBanner,
			version: _version,
			phase: _phase
		});
		const result = lightconeBannerWarp.get(rarity);
		return { ...result, bannerName: this._lightconeBanner.bannerName };
	},

	getItem(rarity, banner) {
		const date = new Date();
		const time = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
		const resultObj = { time, banner };

		if (banner === 'starter') return { ...resultObj, ...this._starterWish(rarity) };
		if (banner === 'character') return { ...resultObj, ...this._characterWarp(rarity) };
		if (banner === 'lightcone') return { ...resultObj, ...this._lightconeWarp(rarity) };
		if (banner === 'regular') return { ...resultObj, ...this._regularWarp(rarity) };
		return { type: null, rarity: 0, name: null };
	}
};

export default WARP;
export { roll };
