import { guaranteedStatus } from '$lib/stores/localstorage';
import { get3StarItem, get4StarItem, getAllChars, rand, regularChars5Star } from './gachaBase';

const characterWarp = {
	init(opt) {
		const { data, version, phase, regularList } = opt;
		const { featured, rateup } = data;
		this._featured = featured;
		this._rateup = rateup;
		this._version = version;
		this._phase = phase;
		this._regularList = regularList;
		return this;
	},

	_rateupChars() {
		return getAllChars(4).filter(({ name }) => this._rateup.includes(name));
	},

	_featuredChars() {
		const { characterName } = this._featured;
		const result = getAllChars(5).find(({ name }) => name === characterName);
		return result;
	},

	get(rarity) {
		if (rarity === 3) return get3StarItem();
		if (rarity === 4) {
			const resultType = rand(['rateup', 'regular']);

			// win or guaranteed
			if (resultType === 'rateup' || guaranteedStatus.get('character4star')) {
				const result = rand(this._rateupChars());
				guaranteedStatus.set('character4star', false);
				return result;
			}

			// Lose rateup
			const result = get4StarItem(this._version, this._phase, { exclude: this._rateup });
			guaranteedStatus.set('character4star', true); // set to guaranteed after loosing
			return result;
		}

		if (rarity === 5) {
			// Guaranteed
			const characterResult = this._featuredChars();
			if (guaranteedStatus.get('character5star')) {
				guaranteedStatus.set('character5star', false);
				characterResult.status = 'guaranteed';
				return characterResult;
			}

			// not guaranteed
			const resultType = rand(['limited', 'regular']);
			if (resultType === 'regular') {
				guaranteedStatus.set('character5star', true);
				const result = rand(regularChars5Star(this._regularList));
				result.status = 'lose';
				return result;
			}

			// win 50: 50
			guaranteedStatus.set('character5star', false);
			characterResult.status = 'win';
			return characterResult;
		}
	}
};

export default characterWarp;
