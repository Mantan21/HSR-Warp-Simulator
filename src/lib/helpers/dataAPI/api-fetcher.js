export const fetchMedia = async (videoID, type = 'audio') => {
	try {
		const dataToPost = { videoID, type };
		const headers = new Headers();
		headers.append('Content-Type', 'text/plain');

		const data = await fetch('https://api.wishsimulator.app/track', {
			method: 'POST',
			body: JSON.stringify(dataToPost),
			headers
		});

		if (data.status !== 200) return { status: 'error' };
		const result = await data.json();
		return result;
	} catch (e) {
		console.error(e);
		return { status: 'error' };
	}
};

export const toBlob = async (url) => {
	try {
		if (!url) return url;
		if (/videoplayback|googlevideo/.test(url)) return url;

		const vi = await fetch(url);
		const blob = await vi.blob();
		const blobURL = URL.createObjectURL(blob);
		return blobURL;
	} catch (e) {
		return url;
	}
};
