import { data } from '$lib/data/tracks.json';
import { writable } from 'svelte/store';

const tracks = [];

data.forEach(({ album, tracks: tr }) => {
	tr.forEach(({ sourceID, title }) => tracks.push({ album, sourceID, title }));
});

export const activeBacksound = writable({});
export const musics = writable(tracks);
export const albumList = writable(data.map(({ album }) => album));
export const currentTime = writable(0);
