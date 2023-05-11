<script>
	import { browser } from '$app/environment';
	import { fade } from '$lib/helpers/transition';
	import { viewportHeight } from '$lib/stores/app-store';
	import { cookie } from '$lib/stores/cookies';

	const localToggle = cookie.get('menuToggle');
	let showToggle = localToggle === undefined ? true : localToggle;

	const toggleMenuList = () => {
		showToggle = !showToggle;
		cookie.set('menuToggle', showToggle);
	};

	$: fullscreen = browser ? $viewportHeight === window.screen.height : false;
	const handleFullscreen = () => {
		if (!fullscreen) {
			const body = document.body;
			if (body.requestFullscreen) return body.requestFullscreen();
			if (body.webkitRequestFullscreen) return body.webkitRequestFullscreen();
			if (body.msRequestFullscreen) return body?.msRequestFullscreen();
		} else {
			if (document.exitFullscreen) return document?.exitFullscreen();
			if (document.webkitExitFullscreen) return document?.webkitExitFullscreen();
			if (document.msExitFullscreen) return document?.msExitFullscreen();
		}
	};
</script>

<div class="menu" class:hide={!showToggle} transition:fade={{ duration: 250 }}>
	<div class="wrapper">
		<!-- <button title="Options">
			<i class="hsr-settings" />
		</button> -->

		<button on:click={handleFullscreen} title="Fullscreen">
			<i class="hsr-{!fullscreen ? 'fullscreen' : 'shrink'}" />
		</button>

		<button class="toggle" on:click={toggleMenuList} title="Show Menu">
			<i class="hsr-chevron-right" />
		</button>
	</div>
</div>

<style>
	.menu {
		position: fixed;
		z-index: +1;
		left: 0;
		bottom: 5%;
		background-color: rgba(0, 0, 0, 0.4);
		border-top-right-radius: 1rem;
		border-bottom-right-radius: 0.2rem;
		padding: 0.5% calc(1% + 1.2rem) 0.5% 1%;
		overflow: hidden;
		transition: all 0.2s;
	}
	.menu.hide {
		transform: translateX(calc(-100% + 1.2rem));
	}

	@media screen and (max-width: 750px) {
		.menu {
			bottom: 13%;
		}
	}

	button {
		width: 2.5rem;
		aspect-ratio: 1/1;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		line-height: 0;
		font-size: 150%;
		color: #fff;
		opacity: 0.6;
		transition: all 0.25s;
	}

	button:hover {
		opacity: 1;
	}

	button:not(.toggle):active {
		transform: scale(0.9);
	}

	.toggle {
		position: absolute;
		font-size: 100%;
		width: 1.2rem;
		height: 100%;
		top: 0;
		right: 0;
		opacity: 0.8;
		background-color: var(--color-second);
	}
</style>
