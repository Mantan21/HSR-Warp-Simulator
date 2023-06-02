export const fetchAudio = async (sourceID) => {
	const dataToPost = { videoID: sourceID };
	const headers = new Headers();
	headers.append('Content-Type', 'text/plain');

	const data = await fetch('https://yt-audio-one.vercel.app/vi', {
		method: 'POST',
		body: JSON.stringify(dataToPost),
		headers
	});

	const { download } = await data.json();
	return download;
};
