export const fetchAudio = async (sourceID) => {
	const dataToPost = { videoID: sourceID };
	const headers = new Headers();
	headers.append('Content-Type', 'text/plain');

	const data = await fetch('https://phonograph.wishsimulator.app/track', {
		method: 'POST',
		body: JSON.stringify(dataToPost),
		headers
	});

	const result = await data.json();
	return result;
};
