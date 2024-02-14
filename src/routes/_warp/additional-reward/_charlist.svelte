<script>
	import { getContext } from 'svelte';
	import { lazyLoad } from '$lib/helpers/lazyload';
	import { assets } from '$lib/stores/app-store';

	export let charList = [];
	export let selected;

	const select = getContext('select');
</script>

<div class="charlist">
	{#each charList as { name, combat_type }}
		<div class="char-item">
			<button
				class="item-wrapper"
				class:active={name === selected}
				on:click={() => select(name, combat_type)}
			>
				<picture>
					<img use:lazyLoad={$assets[`closeup/${name}`]} alt={name} />
				</picture>
			</button>
		</div>
	{/each}
</div>

<style>
	.charlist {
		width: 100%;
		height: calc(0.22 * var(--wd));
		display: flex;
		justify-content: center;
		padding: calc(0.01 * var(--wd)) calc(0.03 * var(--wd));
	}

	.char-item {
		width: 100%;
		height: 100%;
		padding: 0 calc(0.007 * var(--wd));
	}

	.char-item:nth-child(even) {
		transform: translateY(5%);
		padding-top: calc(0.012 * var(--wd));
	}

	.item-wrapper {
		width: 100%;
		height: 100%;
		border: calc(0.002 * var(--wd)) solid #000;
		border-radius: calc(0.1 * var(--wd));
		background-color: rgba(0, 0, 0, 0.15);
		position: relative;
		transform: scale(0.98);
		transition: transform 0.25s;
	}

	.item-wrapper.active {
		transform: scale(1.02);
	}

	.item-wrapper::before {
		content: '';
		border-radius: inherit;
		position: absolute;
		width: 100%;
		height: 100%;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		border: calc(0.005 * var(--wd)) solid transparent;
		outline: calc(0.003 * var(--wd)) solid transparent;
		z-index: -1;
		transition: all 0.2s;
	}

	.item-wrapper:hover::before {
		border-color: #fff;
		box-shadow: 0 calc(0.007 * var(--wd)) calc(0.01 * var(--wd)) rgba(0, 0, 0, 0.25);
	}

	.item-wrapper::after {
		content: '✔';
		background-color: orange;
		font-size: calc(0.015 * var(--wd));
		line-height: 0;
		color: #fff;
		position: absolute;
		top: 0;
		right: 0;
		border-radius: 100%;
		aspect-ratio: 1/1;
		width: 21%;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		transition: opacity 0.2s;
		opacity: 0;
	}

	.item-wrapper.active::before {
		border-color: #fff;
		outline-color: orange;
	}
	.item-wrapper.active::after {
		opacity: 1;
	}

	.item-wrapper:active picture {
		filter: brightness(0.7);
	}

	picture {
		display: block;
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
		border-radius: inherit;
		transition: all 0.25s;
	}

	img {
		height: 150%;
		position: absolute;
		top: -7.5%;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
