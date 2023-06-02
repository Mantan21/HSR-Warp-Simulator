const encodeAndMakeLink = (string, path = 'item') => {
	const encoded = window.btoa(string);
	const link = `${window.location.origin}/screen/${path}?a=${encoded}`;
	return link;
};

export const decodeAndReadData = {
	_read(decoded) {
		let [name, eidolon, undyingType, undyingQty, type, isNew] = decoded.split(',');
		eidolon = !!parseInt(eidolon);
		undyingQty = parseInt(undyingQty);
		isNew = !!parseInt(isNew);
		return { name, eidolon, undyingType, undyingQty, type, isNew };
	},

	single(encoded) {
		const decoded = window.atob(encoded);
		return this._read(decoded);
	},

	multi(encoded) {
		const decoded = window.atob(encoded);
		const arrData = decoded.split('|');
		const readData = arrData.map(this._read);
		return readData;
	}
};

const encodeData = {
	_createStringData(data) {
		const { name, eidolon, undyingType, undyingQty, type, isNew } = data;
		const string = `${name},${+!!eidolon},${undyingType},${undyingQty},${type},${+!!isNew}`;
		return string;
	},

	single(data) {
		const stringData = this._createStringData(data[0]);
		return encodeAndMakeLink(stringData);
	},

	multi(data) {
		const arrayDataStr = data.map(this._createStringData);
		const stringData = arrayDataStr.join('|');
		return encodeAndMakeLink(stringData, 'warplist');
	}
};

export const createLink = (data = []) => {
	if (data.length > 1) return encodeData.multi(data);
	return encodeData.single(data);
};
