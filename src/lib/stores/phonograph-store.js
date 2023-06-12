import { data } from '$lib/data/tracks.json';
import { writable } from 'svelte/store';

const tracks = [];

data.forEach(({ album, tracks: tr }) => {
	tr.forEach(({ sourceID, title, description }) =>
		tracks.push({ album, sourceID, title, description })
	);
});

export const activeBacksound = writable({});
export const musics = writable(tracks);
export const albumList = writable(data.map(({ album }) => album));
export const currentTime = writable(0);
export const muted = writable({ sfx: false, bgm: false });
