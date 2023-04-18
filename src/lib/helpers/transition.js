import {
	fade as fadeTransition,
	fly as flyTransition,
	scale as scaleTransition
} from 'svelte/transition';

const animate = true;

export const fade = (node, args) => {
	if (!animate) return;
	return fadeTransition(node, args);
};

export const fly = (node, args) => {
	if (!animate) return;
	return flyTransition(node, args);
};

export const scale = (node, args) => {
	if (!animate) return;
	return scaleTransition(node, args);
};
