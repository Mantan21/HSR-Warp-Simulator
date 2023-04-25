const storageLocal = {
	_getData() {
		const data = localStorage.getItem('WarpSimulator');
		if (!data) return { data: {} };
		const parsed = JSON.parse(data);
		return parsed;
	},

	get(key) {
		const { data } = this._getData();
		return data[key] || {};
	},

	set(key, value) {
		const { data } = this._getData();
		data[key] = value;
		localStorage.setItem('WarpSimulator', JSON.stringify({ data }));
	}
};

export const localPity = {
	get(pityBanner) {
		const pity = storageLocal.get('pity');
		return pity[pityBanner] || 0;
	},

	set(pityBanner, value) {
		const pity = storageLocal.get('pity');
		pity[pityBanner] = value;
		storageLocal.set('pity', pity);
	}
};

export const starterRollQty = {
	get() {
		const rollCount = storageLocal.get('starterRollQty');
		if (isNaN(rollCount)) return 0;
		if (rollCount > 50) return 50;
		return rollCount;
	},
	set(number = 0) {
		storageLocal.set('starterRollQty', number);
	}
};

export const guaranteedStatus = {
	get(banner) {
		const guaranteedStatus = storageLocal.get('guaranteedStatus');
		return guaranteedStatus[banner] || false;
	},
	set(banner, value) {
		const guaranteedStatus = storageLocal.get('guaranteedStatus');
		guaranteedStatus[banner] = value;
		storageLocal.set('guaranteedStatus', guaranteedStatus);
	}
};
