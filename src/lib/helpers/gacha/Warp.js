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

		this._characterBannerWarp = characterWarp.init({
			regularList: regularBanner.characters,
			data: character,
			version,
			phase
		});

		this._lightconeBannerWarp = lightconeWarp.init({
			data: lightcone,
			version,
			phase
		});

		this._bannerIDList = {
			starter: starter.bannerID,
			regular: regularBanner.bannerID,
			character: character.bannerID,
			lightcone: lightcone.bannerID
		};

		return this;
	},

	_starterWish(rarity) {
		const result = starterWarp({
			data: this._starter,
			version: this._version,
			phase: this._phase,
			rarity
		});
		const { starter } = this._bannerIDList;
		result.bannerID = starter;
		return result;
	},

	_regularWarp(rarity) {
		const result = regularWarp({
			rarity,
			data: this._regularBanner,
			phase: this._phase,
			version: this._version
		});
		const { regular } = this._bannerIDList;
		result.bannerID = regular;
		return result;
	},

	_characterWarp(rarity) {
		const result = this._characterBannerWarp.get(rarity);
		const { character } = this._bannerIDList;
		result.bannerID = character;
		return result;
	},

	_lightconeWarp(rarity) {
		const result = this._lightconeBannerWarp.get(rarity);
		const { lightcone } = this._bannerIDList;
		result.bannerID = lightcone;
		return result;
	},

	getItem(rarity, banner) {
		const date = new Date();
		const time = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
		const resultObj = { time, banner };

		if (banner === 'starter') return { ...resultObj, ...this._starterWish(rarity) };
		if (banner === 'character-event') return { ...resultObj, ...this._characterWarp(rarity) };
		if (banner === 'lightcone-event') return { ...resultObj, ...this._lightconeWarp(rarity) };
		if (banner === 'regular') return { ...resultObj, ...this._regularWarp(rarity) };
		return { type: null, rarity: 0, name: null };
	}
};

export default WARP;
export { roll };
