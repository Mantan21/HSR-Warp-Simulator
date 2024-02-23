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

	get(itemID) {
		const db = this.getAll();
		const selected = db[itemID];
		if (!selected) return { qty: 0, itemID };

		const { manual, warp } = selected;
		return { itemID, qty: manual + warp };
	},

	put({ itemID, source = 'warp' }) {
		const allItems = storageLocal.get('ownedItem');
		const { manual = 0, warp = 0 } = allItems[itemID] || {};
		allItems[itemID] = {
			manual: source === 'warp' ? manual : 1 + manual,
			warp: source === 'warp' ? warp + 1 : warp
		};
		storageLocal.set('ownedItem', allItems);
		return allItems[itemID];
	}
};

export const customTracks = {
	getAll() {
		const tracks = storageLocal.get('customTracks');
		if (Array.isArray(tracks)) return tracks;
		return [];
	},
	put({ sourceID, title, description } = {}) {
		const allTracks = this.getAll();

		// update track if already in list
		const findTrack = allTracks.findIndex((t) => t.sourceID === sourceID);
		if (findTrack > -1) {
			allTracks[findTrack] = { sourceID, title, description };
		} else {
			// add if not on the list yet
			allTracks.push({ title, description, sourceID });
		}

		storageLocal.set('customTracks', allTracks);
	},
	delete(sourceID) {
		const allTracks = this.getAll();
		const newVal = allTracks.filter((t) => t.sourceID !== sourceID);
		storageLocal.set('customTracks', newVal);
	}
};

export const localrate = {
	get(key) {
		const rates = storageLocal.get('probabilityRates');
		const isValue = rates[key] && rates[key] !== null && rates[key] !== undefined;
		return isValue ? rates[key] : {};
	},
	set(key, value) {
		const rates = storageLocal.get('probabilityRates');
		rates[key] = value;
		storageLocal.set('probabilityRates', rates);
	},
	reset(key) {
		const rates = storageLocal.get('probabilityRates');
		delete rates[key];
		storageLocal.set('probabilityRates', rates);
	}
};
