<script>
	import { getContext, onMount } from 'svelte';
	import { viewportHeight } from '$lib/stores/app-store';
	import { fade } from '$lib/helpers/transition';
	import { playSfx, stopSfx } from '$lib/helpers/audio';
	import ButtonIcon from '$lib/components/ButtonIcon.svelte';

	export let show;
	export let rarity;
	export let banner;

	let v3star;
	let regular4star;
	let regular5star;
	let event4star;
	let event5star;
	let showSkipButton = false;
	const muted = true;

	const showSplashArt = getContext('showSplashArt');
	const onExpressArrived = ({ skip } = { skip: false }) => {
		showSplashArt({ skip });
		showSkipButton = false;
	};

	const skip = () => {
		stopSfx(`express-${rarity}star`);
		onExpressArrived({ skip: true });
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
			} else if (type.match('event')) {
				videoContent = rarity === 5 ? event5star : event4star;
			}
		} else videoContent = v3star;

		if (!videoContent || videoContent.error || isNaN(videoContent.duration)) {
			// showToast = true;
			console.error("Can't play Meteor Animation because it cannot be loaded", videoContent.error);
			return onExpressArrived();
		}
		videoContent.style.display = 'unset';
		videoContent.play();
		return;
	};

	$: if (show) showVideoHandle(rarity, banner);
</script>

<div
	class:show
	class="express"
	style="height: {$viewportHeight}px"
	on:mousedown={() => (showSkipButton = true)}
>
	<div class="video">
		<video
			bind:this={v3star}
			{muted}
			src="/videos/3star.mp4"
			type="video/mp4"
			crossorigin="anonymous"
		/>
		<video
			bind:this={regular4star}
			{muted}
			src="/videos/regular-4star.mp4"
			type="video/mp4"
			crossorigin="anonymous"
		/>
		<video
			bind:this={regular5star}
			{muted}
			src="/videos/regular-5star.mp4"
			type="video/mp4"
			crossorigin="anonymous"
		/>
		<video
			bind:this={event4star}
			{muted}
			src="/videos/event-4star.mp4"
			type="video/mp4"
			crossorigin="anonymous"
		/>
		<video
			bind:this={event5star}
			{muted}
			src="/videos/event-5star.mp4"
			type="video/mp4"
			crossorigin="anonymous"
		/>

		{#if showSkipButton}
			<div class="skip" in:fade={{ duration: 200 }}>
				<ButtonIcon icon="skip" on:click={skip} />
			</div>
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
		top: 0;
		right: 0;
		padding: 3.7vh 2%;
		z-index: 10;
	}

	:global(.mobileLandscape) .skip {
		padding: 1.5vh 5%;
	}
</style>
