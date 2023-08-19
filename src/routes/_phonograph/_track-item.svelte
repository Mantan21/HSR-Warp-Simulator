<script>
	import { getContext } from 'svelte';
	import { t } from 'svelte-i18n';
	import { assets } from '$lib/stores/app-store';
	import { activeBacksound, currentTime } from '$lib/stores/phonograph-store';
	import { formatTime, pauseTrack, playTrack } from '$lib/helpers/sounds/phonograph';
	import { playSfx } from '$lib/helpers/sounds/audiofx';

	export let title = '';
	export let sourceID = '';
	export let album = '';
	export let isWaiting = false;
	export let playedTrack;
	export let duration;

	let isloaded = true;
	let current = '0:00';
	let percentage = 0;

	$: bgm = $activeBacksound;
	$: isPlayed = playedTrack === sourceID;
	$: if (isPlayed && isloaded) {
		current = formatTime($currentTime);
		percentage = ($currentTime / duration) * 100 || 0;
	} else {
		current = '0:00';
		percentage = 0;
	}

	const wait = getContext('wait');
	const songReady = getContext('songReady');
	const selectTrack = getContext('selectTrack');

	const previewTrack = async (sID) => {
		if (sID === playedTrack) return;
		try {
			isloaded = false;
			wait(true);
			songReady(false);

			selectTrack(sID);
			await pauseTrack();
			const { status } = await playTrack(sID);
			if (status === 'error') throw new Error('Server Error');
			playedTrack = sID;

			isloaded = true;
			wait(false);
			songReady(true);
		} catch (e) {
			console.error(e);
			wait(false);
		}
	};

	const deletePrompt = getContext('deletePrompt');
	const deleteMusic = () => {
		playSfx();
		deletePrompt(sourceID);
	};
</script>

<button
	{title}
	id={sourceID}
	class:isPlayed
	disabled={isWaiting}
	class:custom={album === 'custom-musics'}
	on:click={() => previewTrack(sourceID)}
>
	<i class="hsr-right-arrow" />
	<div class="track-wrapper">
		<div class="icon">
			{#if isPlayed}
				{#if isloaded && duration > 0}
					<div class="play-icon">
						<span />
						<span />
						<span />
						<span />
					</div>
				{:else}
					<i class="hsr-spinner" />
				{/if}
			{:else}
				<i class="hsr-play" />
			{/if}
		</div>
		<div class="track-info">
			<div class="track-title">
				<span class="title"> "{title}" </span>

				{#if sourceID === bgm.sourceID}
					<span class="note">
						<i class="hsr-music" />
					</span>
				{/if}
			</div>
			<div class="progress">
				<span style="--per:{percentage}%" />
			</div>
			<div class="duration">
				{isPlayed ? `${current} /` : ''}
				{duration ? formatTime(duration) : $t('phonograph.notLoaded')}
			</div>

			<picture class="track-bg">
				<img src={$assets['music.svg']} alt="" />
			</picture>
		</div>
	</div>
</button>

{#if album === 'custom-musics'}
	<button class="delete" on:click={deleteMusic}>
		<i class="hsr-trash" />
	</button>
{/if}

<style>
	button {
		position: relative;
		width: 100%;
		height: 95%;
	}

	.track-wrapper {
		width: 100%;
		height: 100%;
		color: #fff;
		border: calc(0.0075 * var(--wd)) solid;
		border-color: rgba(255, 255, 255, 0.4);
		display: flex;
		align-items: center;
		position: relative;
		overflow: hidden;
		transition: all 0.25s;
	}

	button:hover .track-wrapper {
		border-color: #fff;
	}
	button.isPlayed .track-wrapper {
		color: #000;
		border-color: #fff;
	}

	.track-wrapper::after {
		content: '';
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		position: absolute;
		border-radius: 0 10rem 10rem 0;
		transform: translateX(-120%);
		background-color: rgba(255, 255, 255, 0.85);
		transition: all 0.25s;
	}
	button.isPlayed .track-wrapper::after {
		border-radius: unset;
		transform: translateX(0%);
	}

	i.hsr-right-arrow {
		opacity: 0;
		position: absolute;
		top: 50%;
		left: 0;
		transform: translate(-100%, -50%);
		color: #000;
		font-size: x-large;
		transition: opacity 0.25s;
		-webkit-text-stroke: 0.075rem #fff;
	}
	button.isPlayed .hsr-right-arrow {
		opacity: 1;
	}

	/* Icon */
	.icon {
		font-size: calc(0.08 * var(--wd));
		flex-basis: 15%;
		min-width: 15%;
		position: relative;
		z-index: +1;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.hsr-spinner {
		line-height: 0;
		animation: rotate 2s linear infinite;
	}

	.play-icon {
		width: 45%;
		aspect-ratio: 1.2/1;
		display: flex;
	}
	.play-icon span {
		display: block;
		width: 15%;
		height: 100%;
		margin: auto;
		background-color: #000;
		transform-origin: bottom;
		animation: audiowave infinite linear;
	}
	.play-icon span:nth-child(1) {
		animation-duration: 0.9s;
	}
	.play-icon span:nth-child(2) {
		animation-duration: 0.8s;
	}
	.play-icon span:nth-child(3) {
		animation-duration: 0.7s;
	}
	.play-icon span:nth-child(4) {
		animation-duration: 0.6s;
	}

	/* Track Info */
	.track-info {
		text-align: left;
		display: flex;
		flex-direction: column;
		flex-basis: 85%;
		max-width: 85%;
		height: 100%;
		padding: 0 2%;
		position: relative;
		z-index: +1;
	}

	.track-bg {
		position: absolute;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
		height: 100%;
		aspect-ratio: 1/1;
		opacity: 0.1;
		transition: all 0.25s;
	}
	.track-bg img {
		width: 100%;
	}

	.isPlayed .track-bg {
		filter: brightness(0.5);
	}

	.track-title {
		flex-basis: 60%;
		font-size: calc(0.05 * var(--wd));
		padding: 4% 0;
		position: relative;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 100%;
	}

	.progress {
		background-color: rgba(174, 167, 167, 0.5);
		width: 100%;
		height: calc(0.005 * var(--wd));
		position: relative;
		border-radius: 1rem;
	}

	.progress span {
		display: block;
		height: 125%;
		width: var(--per);
		background-color: #000;
		position: absolute;
		top: 50%;
		left: 0;
		border-radius: 1rem;
		transform: translateY(-50%);
		transition: width 0.1s;
	}

	.duration {
		margin-left: auto;
		margin-right: 5%;
		font-size: calc(0.045 * var(--wd));
		opacity: 0.5;
	}

	.note {
		color: yellow;
		position: absolute;
		z-index: +2;
		top: 50%;
		right: 0;
		transform: translate(0, -50%);
		background-color: #000;
		border-width: 0.15rem;
		border-color: yellow;
		border-style: dotted dotted solid dotted;
		border-radius: 100%;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		aspect-ratio: 100%;
		width: 10%;
		aspect-ratio: 1/1;
		font-size: 100%;
		transition: 0.25s all;
	}

	button.delete {
		position: absolute;
		top: 0;
		left: 0;
		color: #fff;
		background-color: #c33535;
		width: 15%;
		font-size: calc(0.07 * var(--wd));
		opacity: 0;
		z-index: +1;
		pointer-events: none;
		transition: 0.25s opacity;
	}

	:global(.track-item):hover .delete {
		display: unset;
		opacity: 1;
		pointer-events: unset;
	}

	@media screen and (max-width: 620px) {
		.title {
			font-size: calc(0.03 * var(--wd));
		}
		.track-title {
			padding: 0;
		}
		.duration {
			font-size: calc(0.035 * var(--wd));
		}
	}

	@keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}
	@keyframes audiowave {
		0% {
			transform: scaleY(1);
		}
		55% {
			transform: scaleY(0.2);
		}
		100% {
			transform: scaleY(1);
		}
	}
</style>
