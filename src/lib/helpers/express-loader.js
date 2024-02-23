import { assets } from '$lib/stores/app-store';
import { AssetManager } from '$lib/helpers/dataAPI/api-indexeddb';
import { writable } from 'svelte/store';

const expressList = [
	'regular-3star.mp4',
	'regular-4star.mp4',
	'regular-5star.mp4',
	'event-3star.mp4',
	'event-4star.mp4',
	'event-5star.mp4'
];

export const check = async () => {
	const loadedData = [];

	for (let i = 0; i < expressList.length; i++) {
		const key = expressList[i];
		const storedData = await AssetManager.get(key);
		if (!storedData) continue;
		loadedData.push(storedData);
	}

	const allComplete = loadedData.length === expressList.length;
	if (allComplete) {
		const DOMURL = window.URL || window.webkitURL;
		assets.update((v) => {
			loadedData.forEach(({ key, blob }) => (v[key] = DOMURL.createObjectURL(blob)));
			return v;
		});
	}
	return allComplete;
};

export const loadProggress = writable({ item: '', progress: 0, totalItem: 0, itemNumber: 0 });

export const loadAnimation = async () => {
	const results = [];
	const totalItem = expressList.length;
	for (let i = 0; i < totalItem; i++) {
		loadProggress.set({ item: expressList[i], progress: 0, totalItem, itemIndex: i });
		const response = await fetch(`/videos/${expressList[i]}`);
		const data = new Response(streamResponse(response));
		const blob = await data.blob();

		// Save to IDB
		await AssetManager.put({ key: expressList[i], blob });

		const DOMURL = window.URL || window.webkitURL;
		const blobUrl = DOMURL.createObjectURL(blob);
		const resultObj = { asset: expressList[i], url: blobUrl };
		results.push(resultObj);
	}

	return results;
};

const streamResponse = (response) => {
	const contentLength = response.headers.get('content-length');
	return new ReadableStream({
		start(controller) {
			const reader = response.body.getReader();
			readStream(controller, reader, contentLength);
		}
	});
};

let loaded = 0;
const readStream = (controller, reader, contentLength) => {
	reader.read().then((progressEvent) => {
		if (progressEvent.done) {
			controller.close();
			loaded = 0;
			return;
		}

		loadProggress.update((v) => {
			loaded += progressEvent.value.byteLength;
			v.progress = Math.round((loaded / contentLength) * 100);
			return v;
		});
		controller.enqueue(progressEvent.value);
		readStream(controller, reader, contentLength);
	});
};
