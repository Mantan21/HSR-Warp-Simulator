export const fetchAudio = async (sourceID) => {
	try {
		const dataToPost = { videoID: sourceID };
		const headers = new Headers();
		headers.append('Content-Type', 'text/plain');

		const data = await fetch('https://phonograph.wishsimulator.app/track', {
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
