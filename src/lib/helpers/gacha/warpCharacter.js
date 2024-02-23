import { guaranteedStatus } from '$lib/helpers/dataAPI/api-localstorage';
import {
	checkGuaranteed,
	get3StarItem,
	get4StarItem,
	get5StarItem,
	isRateup,
	rand
} from './gacha-base';
import { identifyBanner } from '../banner-loader';

const characterWarp = {
	init(opt) {
		const { data, version, phase, regularList, indexOfBanner } = opt;
		const { rateup } = data;
		const { featured } = identifyBanner(data.bannerID[indexOfBanner]);

		this._featured = featured;
		this._rateup = rateup;
		this._version = version;
		this._phase = phase;
		this._regularList = regularList;

		return this;
	},

	get(rarity) {
		if (rarity === 3) {
			const droplist = get3StarItem();
			return rand(droplist);
		}

		if (rarity === 4) {
			const { _version: version, _phase: phase, _rateup: rateup } = this;
			const { status: isGuaranteed, never, always } = checkGuaranteed('character-event', 4);
			const useRateup = (isGuaranteed && !never) || always || isRateup('character-event');

			const droplist = get4StarItem({
				banner: 'character-event',
				rateupNamelist: rateup,
				useRateup,
				version,
				phase
			});

			guaranteedStatus.set('character-event-4star', !useRateup);
			return rand(droplist);
		}

		if (rarity === 5) {
			const { _featured, _regularList } = this;
			const { status: isGuaranteed, never, always } = checkGuaranteed('character-event', 5);
			const useRateup = (isGuaranteed && !never) || always || isRateup('character-event');

			const droplist = get5StarItem({
				banner: 'character-event',
				stdList: _regularList,
				rateupItem: [_featured],
				useRateup
			});
			const result = rand(droplist);

			const statusGuarateed = (isGuaranteed && !never) || always;
			const rateUpStatus = statusGuarateed ? 'guaranteed' : 'win';
			const status = useRateup ? rateUpStatus : 'lose';
			guaranteedStatus.set('character-event-5star', !useRateup);
			return { ...result, status };
		}
	}
};

export default characterWarp;
