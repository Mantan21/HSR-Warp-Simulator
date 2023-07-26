<script>
	import { getContext, onMount } from 'svelte';
	import { fade } from 'svelte/transition';
	import { assets, viewportHeight } from '$lib/stores/app-store';
	import { playSfx, stopSfx } from '$lib/helpers/sounds/audiofx';
	import ButtonIcon from '$lib/components/ButtonIcon.svelte';

	export let show;
	export let rarity;
	export let banner;

	let regular3star;
	let regular4star;
	let regular5star;
	let event3star;
	let event4star;
	let event5star;
	let showSkipButton = false;

	const showSplashArt = getContext('showSplashArt');
	const onExpressArrived = ({ skip = false } = {}) => {
		showSplashArt({ skip });
		showSkipButton = false;
	};

	const skip = () => {
		stopSfx(`express-${rarity}star`);
		onExpressArrived({ skip: true });
		const doms = [regular3star, regular4star, regular5star, event3star, event4star, event5star];
		doms.forEach((video) => {
			video.load();
			video.style.display = 'none';
		});
	};

	onMount(() => {
		const doms = [regular3star, regular4star, regular5star, event3star, event4star, event5star];
		doms.forEach((video) => {
			video.addEventListener('ended', () => {
				video.style.display = 'none';
				video.load();
				onExpressArrived();
			});
		});
	});

	const showVideoHandle = async (rarity, type) => {
		let videoContent;
		if (['starter', 'regular'].includes(type)) {
			switch (rarity) {
				case 3:
					videoContent = regular3star;
					break;
				case 4:
					videoContent = regular4star;
					break;
				case 5:
					videoContent = regular5star;
					break;
			}
		} else {
			switch (rarity) {
				case 3:
					videoContent = event3star;
					break;
				case 4:
					videoContent = event4star;
					break;
				case 5:
					videoContent = event5star;
					break;
			}
		}

		if (!videoContent || videoContent.error || isNaN(videoContent.duration)) {
			// showToast = true;
			console.error('Failed to call Astral Express!', videoContent.error);
			return onExpressArrived();
		}
		videoContent.style.display = 'unset';
		await videoContent.play();
		playSfx(`express-${rarity}star`);
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
	<!-- Insert All Video To DOM first -->
	<div class="video">
		<video
			bind:this={regular3star}
			muted
			src={$assets['regular-3star.mp4']}
			type="video/mp4"
			crossorigin="anonymous"
		/>
		<video
			bind:this={regular4star}
			muted
			src={$assets['regular-4star.mp4']}
			type="video/mp4"
			crossorigin="anonymous"
		/>
		<video
			bind:this={regular5star}
			muted
			src={$assets['regular-5star.mp4']}
			type="video/mp4"
			crossorigin="anonymous"
		/>

		<!-- Event Warp -->
		<video
			bind:this={event3star}
			muted
			src={$assets['event-3star.mp4']}
			type="video/mp4"
			crossorigin="anonymous"
		/>
		<video
			bind:this={event4star}
			muted
			src={$assets['event-4star.mp4']}
			type="video/mp4"
			crossorigin="anonymous"
		/>
		<video
			bind:this={event5star}
			muted
			src={$assets['event-5star.mp4']}
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
