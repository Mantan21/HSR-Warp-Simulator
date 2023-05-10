<script>
	import { assetPath } from '$lib/helpers/assets';
	import { t } from 'svelte-i18n';
	import { fly } from 'svelte/transition';

	export let item = '';
	export let small = false;
	export let animate = false;
	export let rarity = 5;

	const transitionFly = (node, args) => {
		if (!animate) return;
		return fly(node, args);
	};
</script>

<div class="light-cone" class:small in:transitionFly={{ y: -300, x: -30, duration: 500 }}>
	{#if !small}
		<div class="layer layer-back" in:transitionFly={{ y: 200, x: 30, duration: 300, opacity: 1 }} />
	{/if}
	<img
		src={assetPath(`lc/${rarity}/${item}`, small ? 150 : 450)}
		crossorigin="anonymous"
		alt={$t(item)}
		loading="lazy"
		on:error={(e) => e.target.remove()}
	/>
	<div
		class="layer layer-front"
		in:transitionFly={{ y: -300, x: -30, duration: 500, opacity: 1 }}
	/>
</div>

<style>
	.light-cone {
		width: 100%;
		height: auto;
		aspect-ratio: 53/74;
		position: relative;
	}

	img {
		width: 100%;
		position: relative;
	}

	.layer {
		position: absolute;
		border-radius: 0.4rem;
		width: 94%;
	}

	.layer-front {
		height: 99%;
		width: 99%;
		background-image: linear-gradient(135deg, rgba(255, 255, 255, 0.6), transparent 50%);
		box-shadow: 0.2rem 0.2rem 1px #bbb, 0.2rem -0.1rem 1px rgba(255, 255, 255, 0.8),
			-0.1rem 0px 1px rgba(255, 255, 255, 0.8);
		top: -4%;
		left: -5.5%;
	}

	.small .layer-front {
		box-shadow: 0.1rem 0.1rem 1px #bbb, 0.1rem -0.1rem 1px rgba(255, 255, 255, 0.8),
			-0.1rem 0px 1px rgba(255, 255, 255, 0.8);
		top: -2%;
		left: -4%;
	}

	.layer-front::after {
		content: '';
		width: 95%;
		height: 97%;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 0.5rem;
		border-right: 0.1rem solid var(--color-second);
		border-bottom: 0.1rem solid var(--color-second);
	}

	.light-cone:not(.small) .layer-front::after {
		mask-image: linear-gradient(135deg, transparent 40%, black);
	}

	.layer-back {
		height: 97%;
		bottom: -3%;
		right: -5%;
		background-image: linear-gradient(-45deg, rgba(255, 255, 255, 0.2), transparent 50%);
		box-shadow: 0.2rem 0.2rem 1px rgba(255, 255, 255, 0.8),
			0.2rem -0.1rem 1px rgba(255, 255, 255, 0.8), -0.1rem 0px 1px rgba(255, 255, 255, 0.8);
	}
	.small .layer-back {
		bottom: -1%;
		right: -2%;
		box-shadow: 0.2rem 0.2rem 1px rgba(255, 255, 255, 0.8),
			0.2rem -0.1rem 1px rgba(255, 255, 255, 0.8), -0.1rem 0px 1px rgba(255, 255, 255, 0.8);
	}
</style>
