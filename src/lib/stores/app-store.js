import { writable } from 'svelte/store';
import { initialAmount } from '$lib/data/warp-setup.json';

export const regularPass = writable(initialAmount.ticketPass);
export const specialPass = writable(initialAmount.ticketPass);
export const stellarJade = writable(initialAmount.stellarJade);

export const activeVersion = writable(null);
export const activePhase = writable(null);
export const activeBanner = writable(0);
export const showStarterBanner = writable(true);
export const bannerList = writable([{ type: 'starter' }]);

export const starterRemaining = writable(50);
export const warpAmount = writable('default');

export const isMobileLandscape = writable(false);
export const isMobile = writable(false);
export const viewportWidth = writable(0);
export const viewportHeight = writable(0);

export const assets = writable([]);
