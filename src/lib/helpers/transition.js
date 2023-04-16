import { fade as fadeTransition, fly as flyTransition } from 'svelte/transition';

const animate = true;

export const fade = (node, args) => {
	if (!animate) return;
	return fadeTransition(node, args);
};

export const fly = (node, args) => {
	if (!animate) return;
	return flyTransition(node, args);
};
