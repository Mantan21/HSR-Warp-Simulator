import { writable } from 'svelte/store';
import { initialAmount } from '$lib/data/warp-setup.json';

export const regularPass = writable(initialAmount.ticketPass);
export const specialPass = writable(initialAmount.ticketPass);
export const stellarJade = writable(initialAmount.stellarJade);
export const oneiric = writable(initialAmount.oneiric);
export const embers = writable(0);
export const starlight = writable(0);

export const starterRemaining = writable(50);
export const regReward = writable({ rollcount: 0, isClaimed: false });
export const priceList = writable({ oneiric: {}, supplyPass: null });

export const activeVersion = writable(null);
export const activePhase = writable(null);
export const activeBanner = writable(0);
export const showStarterBanner = writable(true);
export const bannerList = writable([{ type: 'starter' }]);

export const isMobileLandscape = writable(false);
export const isMobile = writable(false);
export const viewportWidth = writable(0);
export const viewportHeight = writable(0);

export const assets = writable([]);
export const probEdit = writable(false);

// Settings
export const proUser = writable(false);
export const warpAmount = writable('default');
export const autoskip = writable({ express: false, art: true });
export const liteMode = writable(false);
export const isPWA = writable(false);
