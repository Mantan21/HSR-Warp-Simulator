import {
	fade as fadeTransition,
	fly as flyTransition,
	scale as scaleTransition
} from 'svelte/transition';

const animate = true;

/** @type {import('svelte/types/runtime/transition').FadeParams} */
export const fade = (node, args) => {
	if (!animate) return;
	return fadeTransition(node, args);
};

/** @type {import('svelte/types/runtime/transition').FlyParams} */
export const fly = (node, args) => {
	if (!animate) return;
	return flyTransition(node, args);
};

/** @type {import('svelte/types/runtime/transition').ScaleParams} */
export const scale = (node, args) => {
	if (!animate) return;
	return scaleTransition(node, args);
};

export const diagonalSlide = (node, { duration = 300, delay = 0 }) => {
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
