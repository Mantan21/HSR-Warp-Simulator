const _getAllCookies = () => {
	const splitted = document.cookie.split('; ');
	const cuuid = splitted.find((row) => row.startsWith(`WarpSimulator=`));
	return cuuid ? JSON.parse(cuuid.split('=')[1]) : {};
};

const _setCookies = (value) => {
	const stringToSet = JSON.stringify(value);
	const d = new Date();
	d.setTime(d.getTime() + 365 * 24 * 60 * 60 * 1000);
	let expires = 'expires=' + d.toUTCString();
	document.cookie = `WarpSimulator=${stringToSet};${expires};SameSite=Lax; Secure;path=/`;
};

export const cookie = {
	get(cname) {
		const result = _getAllCookies();
		return result[cname];
	},
	set(cname, cvalue) {
		const cookieNow = _getAllCookies();
		cookieNow[cname] = cvalue;
		_setCookies(cookieNow);
	},
	remove(cname) {
		const cookieNow = _getAllCookies();
		delete cookieNow[cname];
		_setCookies(cookieNow);
	},

	clean() {
		const d = new Date();
		d.setTime(d.getTime() - 1 * 24 * 60 * 60 * 1000);
		let expires = 'expires=' + d.toUTCString();
		document.cookie = `WarpSimulator=;${expires};SameSite=Lax; Secure;path=/`;
	}
};
