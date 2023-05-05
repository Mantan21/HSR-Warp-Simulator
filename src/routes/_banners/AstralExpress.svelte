<script>
	import { getContext, onMount } from 'svelte';
	import { viewportHeight, muted, assets } from '$lib/stores/app-store';
	import { fade } from '$lib/helpers/transition';
	import { playSfx, stopSfx } from '$lib/helpers/audio';

	export let show;
	export let rarity;
	export let banner;

	let v3star;
	let regular4star;
	let regular5star;
	let event4star;
	let event5star;
	let showSkipButton = false;
	let showBg = false;

	const showSplashArt = getContext('showSplashArt');
	const onExpressArrived = () => {
		showSplashArt();
		showSkipButton = false;
		showBg = false;
	};

	const skip = () => {
		stopSfx(`express-${rarity}star`);
		onExpressArrived();
		[v3star, regular4star, regular5star, event4star, event5star].forEach((video) => {
			video.load();
			video.style.display = 'none';
		});
	};

	onMount(() => {
		[v3star, regular4star, regular5star, event4star, event5star].forEach((video) => {
			video.addEventListener('ended', () => {
				video.style.display = 'none';
				video.load();
				onExpressArrived();
			});
		});
	});

	const showVideoHandle = (rarity, type) => {
		playSfx(`express-${rarity}star`);

		let videoContent;
		if (rarity !== 3) {
			if (['starter', 'regular'].includes(type)) {
				videoContent = rarity === 5 ? regular5star : regular4star;
			} else if (['character', 'lightcone'].includes(type)) {
				videoContent = rarity === 5 ? event5star : event4star;
			}
		} else videoContent = v3star;

		if (videoContent.error || isNaN(videoContent.duration)) {
			// showToast = true;
			console.error("Can't play Meteor Animation because it cannot be loaded", videoContent.error);
			return onExpressArrived();
		}
		videoContent.style.display = 'unset';
		videoContent.play();

		const x = setTimeout(() => {
			showBg = true;
			clearTimeout(x);
		}, 500);
		return;
	};

	$: if (show) showVideoHandle(rarity, banner);
</script>

<div
	class:show
	class="express"
	class:bg={showBg}
	style="height: {$viewportHeight}px"
	on:mousedown={() => (showSkipButton = true)}
>
	<div class="video">
		<video bind:this={v3star} muted={$muted} src="/videos/3star.mp4" type="video/mp4" />
		<video
			bind:this={regular4star}
			muted={$muted}
			src="/videos/regular-4star.mp4"
			type="video/mp4"
		/>
		<video
			bind:this={regular5star}
			muted={$muted}
			src="/videos/regular-5star.mp4"
			type="video/mp4"
		/>
		<video bind:this={event4star} muted={$muted} src="/videos/event-4star.mp4" type="video/mp4" />
		<video bind:this={event5star} muted={$muted} src="/videos/event-5star.mp4" type="video/mp4" />

		{#if showSkipButton}
			<button class="skip" in:fade={{ duration: 200 }} on:click={skip}>
				<i class="hsr-skip" />
			</button>
		{/if}
	</div>
</div>

<style>
	.express {
		position: fixed;
		z-index: 990;
		display: none;
		top: 0;
		left: 0;
		width: 100vw;
	}
	.express.bg {
		background-image: url('/images/background/warp-bg.webp');
		background-size: 130%;
		background-position: center center;
	}
	.express.show {
		display: block;
	}

	.video {
		position: relative;
		width: 100vw;
		height: 100%;
	}

	video {
		display: none;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: bottom;
	}

	.skip {
		position: absolute;
		top: 2%;
		right: 2%;
		color: #fff;
		font-size: 200%;
		z-index: 10;
	}

	:global(.mobileLandscape) .skip {
		right: 6%;
		top: 1rem;
	}
</style>
