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
