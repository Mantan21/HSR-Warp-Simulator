import { localConfig } from '$lib/helpers/dataAPI/api-localstorage';
import { cubicOut } from 'svelte/easing';
import {
	crossfade,
	fade as fadeTransition,
	fly as flyTransition,
	scale as scaleTransition
} from 'svelte/transition';

const animate = () => !localConfig.get('litemode');

/** @type {import('svelte/types/runtime/transition').FadeParams} */
export const fade = (node, args) => {
	if (!animate() || args?.disable) return;
	return fadeTransition(node, args);
};

/** @type {import('svelte/types/runtime/transition').FlyParams} */
export const fly = (node, args) => {
	if (!animate() || args?.disable) return;
	return flyTransition(node, args);
};

/** @type {import('svelte/types/runtime/transition').ScaleParams} */
export const scale = (node, args) => {
	if (!animate() || args?.disable) return;
	return scaleTransition(node, args);
};

export const scaleOrigin = (
	node,
	{ duration = 300, delay = 0, origin = null, start = 0.5, disable = false, easing = null }
) => {
	if (!animate() || disable) return;
	const transformOrigin = origin ? `transform-origin: ${origin}` : '';
	const m = getComputedStyle(node).transform.match(/scale\(([0-9.]+)\)/);
	const s = m ? m[1] : 1;
	const is = 1 - start;
	return {
		start,
		delay,
		duration,
		css: (t) => {
			const eased = easing(t) || cubicOut(t);
			return `transform: scale(${eased * s * is + start}); ${transformOrigin}`;
		}
	};
};

export const diagonalSlide = (node, { duration = 300, delay = 0, disable = false }) => {
	if (!animate() || disable) return;
	return {
		duration,
		delay,
		css: (t, u) => {
			return `
			-webkit-mask-image: linear-gradient(45deg, black 50%, transparent 50%);
			mask-image: linear-gradient(45deg, black 50%, transparent 50%);
			-webkit-mask-size: 285% 100%;
			        mask-size: 285% 100%;
			-webkit-mask-position: ${u * 100}%;
			        mask-position: ${u * 100}%`;
		}
	};
};

export const [morphOut, morphIn] = crossfade({
	duration: 750,
	easing: cubicOut
});
