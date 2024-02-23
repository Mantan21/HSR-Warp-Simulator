import { browser } from '$app/environment';
import { init, register, getLocaleFromNavigator } from 'svelte-i18n';
import { localConfig } from '$lib/helpers/dataAPI/api-localstorage';

const supportedLocales = ['en-US', 'id-ID', 'ja-JP', 'zh-CN', 'zh-TW'];
const itemLocales = ['en-US', 'ja-JP', 'zh-CN', 'zh-TW'];

const checkLocale = () => {
	const savedLocale = browser ? localConfig.get('locale') : null;
	const browserLocale = savedLocale || getLocaleFromNavigator();
	const usedLocale = supportedLocales.find((langID) => langID.includes(browserLocale));
	return usedLocale || 'en-US';
};

const mountLocale = () => {
	supportedLocales.forEach((langID) => {
		register(langID, () => import(`../../locales/${langID}.json`));
	});

	itemLocales.forEach((langID) => {
		register(langID, () => import(`../../locales/items/${langID}.json`));
	});

	const usedLocale = checkLocale();
	init({
		fallbackLocale: 'en-US',
		initialLocale: usedLocale
	});
};

export { mountLocale, checkLocale };
