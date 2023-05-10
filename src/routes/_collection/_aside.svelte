<script>
	import { getContext } from 'svelte';
	import { fly } from 'svelte/transition';
	import { OverlayScrollbarsComponent as Scrollable } from 'overlayscrollbars-svelte';
	import { playSfx } from '$lib/helpers/audio';
	import { isMobileLandscape, viewportWidth } from '$lib/stores/app-store';

	export let activePath = 'all';
	let isOpen = false;
	$: dynamic = $viewportWidth < 700 && !$isMobileLandscape;

	const selectPath = getContext('selectPath');
	const select = (path) => {
		isOpen = false;
		selectPath(path);
	};

	const nav = [
		'all',
		'destruction',
		'hunt',
		'erudition',
		'harmony',
		'nihility',
		'preservation',
		'abundance'
	];

	const toggleShowAside = (sfx) => {
		playSfx(sfx || 'click');
		isOpen = !isOpen;
	};
</script>

<aside class:dynamic class:show={isOpen && dynamic}>
	<div class="wrapper">
		<Scrollable options={{ scrollbars: { theme: 'os-theme-light', visibility: 'hidden' } }}>
			{#each nav as item}
				<div class="item">
					<button class:active={activePath === item} on:click={() => select(item)}>
						<div class="icon">
							<div class="ornament"><span /></div>
							<i class="hsr-{item}" />
						</div>
						<span> {item} </span>
					</button>
				</div>
			{/each}
		</Scrollable>
	</div>

	{#if dynamic}
		<div class="toggle">
			<button on:click={() => toggleShowAside()}>
				<i class="hsr-chevron-right" />
			</button>
		</div>
	{/if}
</aside>

{#if isOpen && dynamic}
	<div
		class="overlay"
		transition:fly={{ x: $viewportWidth * -1, duration: 300 }}
		on:mousedown={() => toggleShowAside('close')}
	/>
{/if}

<style>
	aside {
		width: 25%;
		min-width: 20vh;
		display: block;
		height: 100%;
		position: relative;
	}

	aside.dynamic {
		background-color: rgba(7, 9, 33, 0.8);
		backdrop-filter: blur(8px);
		position: absolute;
		top: 0;
		left: 0;
		z-index: +5;
		padding: 5vh 2vh 0;
		max-width: 75vw;
		width: 35vh;
		min-width: unset;
		transform: translateX(-100%);
		transition: transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
	}

	aside.dynamic.show {
		transform: translateX(0);
	}

	.wrapper {
		height: 100%;
		width: 100%;
		mask-image: linear-gradient(black 97%, transparent);
	}

	.overlay {
		background-color: rgba(0, 0, 0, 0.4);
		backdrop-filter: blur(10px);
		width: var(--screen-width);
		height: var(--screen-height);
		position: fixed;
		top: 0;
		left: 0;
		z-index: +3;
	}

	.toggle {
		position: absolute;
		border-top-right-radius: 1rem;
		top: 50%;
		right: 0;
		z-index: +10;
		background-color: var(--color-second);
		transform: translate(100%, -50%);
		opacity: 0.75;
		transition: opacity 0.5s;
	}
	.toggle:hover {
		opacity: 1;
	}

	.toggle button {
		width: 40px;
		aspect-ratio: 1/1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.item {
		padding: 1%;
	}

	button {
		display: inline-flex;
		align-items: center;
		line-height: 0;
		width: 100%;
		color: #fff;
		font-size: 130%;
	}

	.item button {
		padding: calc(0.005 * var(--screen-width)) calc(0.015 * var(--screen-width));
		padding-left: calc(0.005 * var(--screen-width));
	}
	.dynamic .item button {
		margin: 0.5vh 0;
		font-size: 180%;
		padding-left: 5%;
	}

	button.active {
		opacity: 1;
	}

	button span {
		padding-left: 5%;
		opacity: 0.7;
		transition: 0.5s all;
	}
	button.active span,
	button:hover span {
		opacity: 1;
	}

	.icon {
		font-size: 180%;
		padding: 4%;
		border-radius: 100%;
		position: relative;
		transition: all 0.5s;
	}
	button.active .icon {
		background-color: #fff;
		color: #000;
	}

	.ornament {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 50%;
		left: 50%;
		display: flex;
		justify-content: center;
		align-items: center;
		transform: translate(-50%, -50%) scale(1.3);
		opacity: 0;
		transition: all 0.5s;
	}

	button.active .ornament {
		opacity: 1;
	}

	.ornament span {
		width: 100%;
		height: 100%;
		border-radius: 100%;
		border: 1px dashed rgba(255, 255, 255, 0.4);
		position: relative;
		animation: rotate 10s linear forwards infinite;
	}

	.ornament span::before,
	.ornament span::after {
		content: '';
		width: 7%;
		border-radius: 100%;
		aspect-ratio: 1/1;
		background-color: #fff;
		content: 0;
		position: absolute;
	}
	.ornament span::before {
		top: 50%;
		left: 0;
		transform: translate(-50%, -50%);
	}
	.ornament span::after {
		top: 50%;
		right: 0;
		transform: translate(50%, -50%);
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
</style>
