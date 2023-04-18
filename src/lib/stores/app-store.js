import { writable } from 'svelte/store';

export const regularPass = writable(2);
export const specialPass = writable(0);
export const stellarJade = writable(1600);

export const activeBanner = writable(0);
export const showDepature = writable(true);
export const bannerList = writable([
	{ type: 'depature' },
	{ type: 'character', item: 'seele' },
	{ type: 'cone', item: 'in-the-night' },
	{ type: 'stellar' }
]);

export const isMobileLandscape = writable(false);
export const isMobile = writable(false);
export const viewportWidth = writable(0);
export const viewportHeight = writable(0);

export const assets = writable([]);
