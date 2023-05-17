export const storageLocal = {
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

export const rollCounter = {
	get(banner) {
		const rollCount = storageLocal.get('rollCounter');
		return rollCount[banner] || 0;
	},
	set(banner, rollNumber) {
		const rollCount = storageLocal.get('rollCounter');
		rollCount[banner] = rollNumber;
		storageLocal.set('rollCounter', rollCount);
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

export const localConfig = {
	get(key) {
		const config = storageLocal.get('config');
		return config[key] || null;
	},
	set(key, value) {
		const config = storageLocal.get('config');
		config[key] = value;
		storageLocal.set('config', config);
	}
};
