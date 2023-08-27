import { guaranteedStatus } from '$lib/stores/localstorage';
import {
	get3StarItem,
	get4StarItem,
	getAllLightCones,
	rand,
	regularLightcones
} from './gacha-base';
import { prob } from './probabilities';

const lightconeWarp = {
	init(opt) {
		const { data, version, phase } = opt;
		const { featured, rateup } = data;
		this._featured = featured;
		this._rateup = rateup;
		this._version = version;
		this._phase = phase;
		return this;
	},

	_rateupLightcones() {
		return getAllLightCones(4).filter(({ name }) => this._rateup.includes(name));
	},

	_featuredLightcones() {
		return getAllLightCones(5).find(({ name }) => name === this._featured);
	},

	get(rarity) {
		if (rarity === 3) return get3StarItem();
		if (rarity === 4) {
			// guaranteed after lost 75:25
			const isGuaranteed = guaranteedStatus.get('lightcone-event-4star');
			const item = [
				{ type: 'rateup', chance: 75 },
				{ type: 'regular', chance: 25 }
			];
			const { type } = prob(item);

			// win or guaranteed to get rateup one
			if (type === 'rateup' || isGuaranteed) {
				const result = rand(this._rateupLightcones());
				guaranteedStatus.set('lightcone-event-4star', false);
				return result;
			}

			// Lose Rateup
			const rateupNames = this._rateupLightcones().map(({ name }) => name);
			const result = get4StarItem({
				version: this._version,
				phase: this._phase,
				exclude: [rateupNames]
			});
			guaranteedStatus.set('lightcone-event-4star', true);
			return result;
		}

		if (rarity === 5) {
			const item = [
				{ type: 'featured', chance: 75 },
				{ type: 'regular', chance: 25 }
			];

			const { type } = prob(item);
			const isGuaranteed = guaranteedStatus.get('lightcone-event-5star');

			// Win or Guaranteed
			if (type === 'featured' || isGuaranteed) {
				const lightconeResult = this._featuredLightcones();
				guaranteedStatus.set('lightcone-event-5star', false);
				lightconeResult.status = isGuaranteed ? 'guaranteed' : 'win';
				return lightconeResult;
			}

			// Lose rateoff
			const result = rand(regularLightcones(5, [this._featured]));
			guaranteedStatus.set('lightcone-event-5star', true);
			result.status = 'lose';
			return result;
		}
	}
};

export default lightconeWarp;
