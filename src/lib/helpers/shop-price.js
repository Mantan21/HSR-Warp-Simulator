import { priceList } from '$lib/stores/app-store';
import { pricelist as pl } from '$lib/data/pricelist.json';
import { checkLocale } from './i18n';
import { getLocaleFromNavigator } from 'svelte-i18n';

export const availableCurrencies = pl.map(({ symbol, currency }) => ({ symbol, currency }));
export const formatNumber = (n) => n.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const userCurrencies = {
	init(currency = null) {
		const { symbol, list, format } = this.checkUsedCurrency(currency);
		this._symbol = symbol;
		this._list = list;
		this._format = format;
		const { supplyPass, oneiric } = list;
		const prices = { oneiric: {} };

		prices.supplyPass = this.formatPrice(supplyPass);
		Object.keys(oneiric).forEach((key) => {
			prices.oneiric[key] = this.formatPrice(oneiric[key]);
		});
		priceList.set(prices);
	},

	checkUsedCurrency(curr) {
		const used = curr || checkLocale() || getLocaleFromNavigator(); // || cookie.get('currency')
		const filtered = pl.find(({ country, currency }) => {
			const isCurrDetected = used === currency;
			const isCountryAvailable = country.find((v) => used.toLocaleLowerCase().includes(v));
			const isUsed = isCurrDetected || (used.length < 6 && isCountryAvailable);
			return isUsed;
		});
		return filtered || pl.find(({ currency }) => currency === 'USD');
	},

	formatPrice(price) {
		const decimal = price.toFixed(2).toString();
		const formated = formatNumber(decimal);
		return this._format.replace('{symbol}', this._symbol).replace('{nominal}', formated);
	},

	getTotalSpend(totalPull) {
		const pricePerUnit = this._list.oneiric['60'] / 60;
		const pullPrice = totalPull * 160 * pricePerUnit;
		return this.formatPrice(pullPrice);
	}
};
