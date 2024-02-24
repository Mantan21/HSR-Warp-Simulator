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

const lightconeWarp = {
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
			const { status: isGuaranteed, never, always } = checkGuaranteed('lightcone-event', 4);
			const useRateup = (isGuaranteed && !never) || always || isRateup('lightcone-event');

			const droplist = get4StarItem({
				banner: 'lightcone-event',
				rateupNamelist: rateup,
				useRateup,
				version,
				phase
			});

			guaranteedStatus.set('lightcone-event-4star', !useRateup);
			return rand(droplist);
		}

		if (rarity === 5) {
			const { _featured, _regularList } = this;
			const { status: isGuaranteed, never, always } = checkGuaranteed('lightcone-event', 5);
			const useRateup = (isGuaranteed && !never) || always || isRateup('lightcone-event');

			const droplist = get5StarItem({
				banner: 'lightcone-event',
				stdList: _regularList,
				rateupItem: [_featured],
				useRateup
			});
			const result = rand(droplist);

			const statusGuarateed = (isGuaranteed && !never) || always;
			const rateUpStatus = statusGuarateed ? 'guaranteed' : 'win';
			const status = useRateup ? rateUpStatus : 'lose';
			guaranteedStatus.set('lightcone-event-5star', !useRateup);
			return { ...result, status };
		}
	}
};

export default lightconeWarp;
