<script>
	import { getContext } from 'svelte';
	import { OverlayScrollbarsComponent as Scrollable } from 'overlayscrollbars-svelte';
	import { isMobileLandscape, viewportWidth } from '$lib/stores/app-store';
	import { playSfx } from '$lib/helpers/audio';
	import { fly } from 'svelte/transition';

	export let horizontal = false;
	export let isOpen = false;
	export let dynamic = false;
	export let notext = false;

	$: dynamic = dynamic && $viewportWidth < 700 && !$isMobileLandscape;

	const toggle = getContext('navlinkToggle');
	const toggleShowAside = (sfx) => {
		playSfx(sfx || 'click');
		toggle();
	};
</script>

<aside class:dynamic class:horizontal class:notext class:show={isOpen && dynamic}>
	<div class="wrapper">
		<Scrollable options={{ scrollbars: { theme: 'os-theme-light', visibility: 'hidden' } }}>
			<div class="scroll-content">
				<slot />
			</div>
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

	aside.notext {
		width: unset;
		min-width: unset;
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

	.scroll-content {
		display: flex;
		flex-direction: column;
	}

	.horizontal .scroll-content {
		justify-content: center;
		flex-direction: row;
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

	button {
		display: inline-flex;
		align-items: center;
		line-height: 0;
		width: 100%;
		color: #fff;
		font-size: 130%;
	}

	.dynamic :global(.item button) {
		margin: 0.5vh 0;
		font-size: 180%;
		padding-left: 5%;
	}
</style>
