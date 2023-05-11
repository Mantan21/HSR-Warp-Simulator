import { writable } from 'svelte/store';

export const regularPass = writable(10);
export const specialPass = writable(10);
export const stellarJade = writable(1600);

export const activeVersion = writable(null);
export const activePhase = writable(null);
export const activeBanner = writable(0);
export const showStarterBanner = writable(true);
export const bannerList = writable([{ type: 'starter' }]);

export const starterRemaining = writable(50);

export const isMobileLandscape = writable(false);
export const isMobile = writable(false);
export const viewportWidth = writable(0);
export const viewportHeight = writable(0);

export const assets = writable([]);
