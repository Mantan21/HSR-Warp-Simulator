import { writable } from 'svelte/store';

export const activeBacksound = writable({});
export const musics = writable([]);
export const albumList = writable([]);
export const currentTime = writable(0);
export const muted = writable({ sfx: false, bgm: false });
