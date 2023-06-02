import { regular as regularDB } from '$lib/data/banners/regular.json';
import { getAllChars, getAllLightCones } from './gacha-base';

const filterRelease = (releaseVersion, pathcNow, phaseNow) => {
	if (!releaseVersion) return true;
	const [v, phs] = releaseVersion.split('-');
	if (parseFloat(pathcNow) < parseFloat(v)) return false;
	if (parseFloat(pathcNow) === parseFloat(v) && phaseNow <= parseInt(phs)) {
		return false;
	}
	return true;
};

const placeHolder = { drop5char: [], drop5lc: [], drop4char: [], drop4lc: [], drop3star: [] };
export const InfoData = {
	async get(patch, phase, type) {
		if (!type) return placeHolder;

		const { data } = await import(`../../data/banners/events/${patch}.json`);
		const {
			character: charEvent,
			lightcone: lcEvent,
			regularVersion
		} = data.find((d) => d.phase === phase).banners;
		const { characters: regChars } = regularDB.find(({ version }) => regularVersion === version);

		this.drop3star = getAllLightCones(3).map(({ name }) => ({ name }));
		this._stdDropChar5 = regChars.map((name) => ({ name }));

		this._phase = phase;
		this._patch = patch;
		this._charEvent = charEvent;
		this._lightcone = lcEvent;

		if (type === 'starter') return this._showStarter();
		if (type === 'regular') return this._showRegular();
		if (type === 'character-event') return this._showCharEvent();
		if (type === 'lightcone-event') return this._showLightcone();
	},

	_getDrop4Star(type) {
		return (type === 'character' ? getAllChars(4) : getAllLightCones(4))
			.filter(({ limited }) => !limited)
			.filter(({ release }) => filterRelease(release, this._patch, this._phase));
	},

	_showStarter() {
		const drop3star = this.drop3star;
		const drop4char = this._getDrop4Star('character');
		const drop4lc = this._getDrop4Star('lightcone');
		const drop5char = this._stdDropChar5;
		return { drop3star, drop4char, drop4lc, drop5char };
	},

	_showRegular() {
		const drop5lc = getAllLightCones(5).filter(({ limited }) => !limited);
		const drop5char = this._stdDropChar5;
		const drop4char = this._getDrop4Star('character');
		const drop4lc = this._getDrop4Star('lightcone');
		const drop3star = this.drop3star;
		return { drop3star, drop4char, drop4lc, drop5char, drop5lc };
	},

	_showCharEvent() {
		const { featured, path, rateup, combat_type } = this._charEvent;
		const drop5char = this._stdDropChar5;
		drop5char.unshift({ name: featured, path, combat_type, rateup: true });

		const rateUpchar = getAllChars(4)
			.filter(({ name }) => rateup.includes(name))
			.map(({ path, name, combat_type }) => ({ path, name, combat_type, rateup: true }))
			.reverse();

		const drop4char = this._getDrop4Star('character')
			.filter(({ name }) => !rateup.includes(name))
			.map(({ name, path, combat_type }) => ({ name, path, combat_type }));
		drop4char.unshift(...rateUpchar);

		return {
			drop5char,
			drop4char,
			drop4lc: this._getDrop4Star('lightcone'),
			drop3star: this.drop3star
		};
	},

	_showLightcone() {
		const { featured, path, rateup } = this._lightcone;
		const drop5lc = getAllLightCones(5)
			.filter(({ limited }) => !limited)
			.filter(({ name }) => !featured.includes(name))
			.map(({ name, type }) => ({ name, type }));
		drop5lc.unshift({ name: featured, path, rateup: true });

		const rateUplc = getAllLightCones(4)
			.filter(({ name }) => rateup.includes(name))
			.map(({ path, name }) => ({ path, name, rateup: true }))
			.reverse();

		const drop4lc = this._getDrop4Star('lightcone')
			.filter(({ name }) => !rateup.includes(name))
			.map(({ name, path }) => ({ name, path }));
		drop4lc.unshift(...rateUplc);

		return {
			drop5lc,
			drop4lc,
			drop4char: this._getDrop4Star('character'),
			drop3star: this.drop3star
		};
	}
};
