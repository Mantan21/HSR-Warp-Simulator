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

export const localBalance = {
	all() {
		const balance = storageLocal.get('balance');
		return balance;
	},
	get(currency) {
		const balance = storageLocal.get('balance');
		return balance[currency] || 0;
	},

	set(currency, value) {
		const balance = storageLocal.get('balance');
		balance[currency] = value;
		storageLocal.set('balance', balance);
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
		const isValue = config[key] !== null;
		return isValue ? config[key] : null;
	},
	set(key, value) {
		const config = storageLocal.get('config');
		config[key] = value;
		storageLocal.set('config', config);
	}
};

export const owneditem = {
	getAll() {
		const items = storageLocal.get('ownedItem');
		return items;
	},
	put({ name, source = 'warp' }) {
		const allItems = storageLocal.get('ownedItem');
		const { manual = 0, warp = 0 } = allItems[name] || {};
		allItems[name] = {
			manual: source === 'warp' ? manual : 1 + manual,
			warp: source === 'warp' ? warp + 1 : warp
		};
		storageLocal.set('ownedItem', allItems);

		return allItems[name];
	}
};
