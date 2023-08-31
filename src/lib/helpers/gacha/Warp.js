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
		this._character = character;
		this._lightcone = lightcone;
		this._regular = regularBanner;

		return this;
	},

	_starterWish(rarity) {
		const result = starterWarp({
			data: this._starter,
			version: this._version,
			phase: this._phase,
			rarity
		});
		result.bannerID = this._starter.bannerID;
		return result;
	},

	_regularWarp(rarity) {
		const { _regular, _phase: phase, _version: version } = this;
		const { characters: regularList } = _regular;
		const standardBanner = regularWarp.init({ regularList, phase, version });
		const result = standardBanner.get(rarity);

		result.bannerID = this._regular.bannerID;
		return result;
	},

	_characterWarp(rarity, indexOfBanner) {
		const { _regular, _character, _version, _phase } = this;
		const eventBanner = characterWarp.init({
			regularList: _regular.characters,
			data: _character,
			version: _version,
			phase: _phase,
			indexOfBanner
		});

		const result = eventBanner.get(rarity);
		result.bannerID = _character.bannerID[indexOfBanner];
		return result;
	},

	_lightconeWarp(rarity, indexOfBanner) {
		const { _lightcone, _version, _phase } = this;
		const eventBanner = lightconeWarp.init({
			data: _lightcone,
			version: _version,
			phase: _phase,
			indexOfBanner
		});

		const result = eventBanner.get(rarity);
		result.bannerID = _lightcone.bannerID[indexOfBanner];
		return result;
	},

	getItem(rarity, banner, indexOfBanner) {
		const date = new Date();
		const time = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;

		let warpResult = {};
		if (banner === 'starter') warpResult = this._starterWish(rarity);
		if (banner === 'regular') warpResult = this._regularWarp(rarity);
		if (banner.match('character')) warpResult = this._characterWarp(rarity, indexOfBanner);
		if (banner.match('lightcone')) warpResult = this._lightconeWarp(rarity, indexOfBanner);

		return { time, banner, ...warpResult };
	}
};

export default WARP;
export { roll };
