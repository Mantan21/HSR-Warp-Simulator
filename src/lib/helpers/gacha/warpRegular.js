import { get3StarItem, get4StarItem, get5StarItem, rand } from './gacha-base';

const regularWarp = {
	init({ regularList, version, phase }) {
		this._regularList = regularList;
		this._version = version;
		this._phase = phase;
		return this;
	},

	get(rarity) {
		if (rarity === 3) {
			const droplist = get3StarItem();
			return rand(droplist);
		}

		if (rarity === 4) {
			const droplist = get4StarItem({
				banner: 'regular',
				version: this._version,
				phase: this._phase
			});

			return rand(droplist);
		}

		if (rarity === 5) {
			const droplist = get5StarItem({
				banner: 'regular',
				stdList: this._regularList
			});

			return rand(droplist);
		}
	}
};

export default regularWarp;
