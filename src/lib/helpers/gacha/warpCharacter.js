import { guaranteedStatus } from '$lib/stores/localstorage';
import { get3StarItem, get4StarItem, getAllChars, rand, regularChars5Star } from './gacha-base';

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
		const characterName = this._featured;
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
			const result = get4StarItem({
				version: this._version,
				phase: this._phase,
				exclude: this._rateup
			});
			guaranteedStatus.set('character4star', true); // set to guaranteed after loosing
			return result;
		}

		if (rarity === 5) {
			const resultType = rand(['featured', 'regular']);
			const isGuaranteed = guaranteedStatus.get('character5star');

			// Guaranteed
			if (resultType === 'featured' || isGuaranteed) {
				const characterResult = this._featuredChars();
				guaranteedStatus.set('character5star', false);
				characterResult.status = isGuaranteed ? 'guaranteed' : 'win';
				return characterResult;
			}

			// Lose 50/50
			const result = rand(regularChars5Star(this._regularList));
			guaranteedStatus.set('character5star', true);
			result.status = 'lose';
			return result;
		}
	}
};

export default characterWarp;
