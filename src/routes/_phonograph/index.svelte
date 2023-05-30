<script>
	import { getContext, onMount, setContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { activeBacksound, musics } from '$lib/stores/phonograph-store';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import { pauseTrack, playTrack } from '$lib/helpers/sounds/phonograph';

	import ButtonIcon from '$lib/components/ButtonIcon.svelte';
	import Header from '$lib/components/Header.svelte';
	import Background from './_background.svelte';
	import Albums from './_albums.svelte';
	import Tracks from './_tracks.svelte';
	import Controller from './_controller.svelte';

	onMount(() => playSfx('music-loaded'));

	$: bgm = $activeBacksound;
	$: activeTrack = bgm.sourceID;
	$: playedTrack = activeTrack;

	$: activeAlbum = bgm.album;
	$: playedAlbum = activeAlbum;
	$: tracks = $musics.filter(({ album }) => album === playedAlbum);

	setContext('pickAlbum', (selected) => (playedAlbum = selected));
	setContext('pickTrack', (selected) => (playedTrack = selected));

	const setMusic = (sid) => {
		playSfx('item-obtained');
		const trackData = $musics.find(({ sourceID }) => sourceID === sid);
		activeBacksound.set(trackData);
	};
	setContext('setMusic', setMusic);

	const navigate = getContext('navigate');
	const back = () => {
		playSfx('music-close');
		navigate('index');
		if (playedTrack === activeTrack) return;
		pauseTrack(playedTrack);
		playTrack(activeTrack);
	};
</script>

<svelte:head>
	<title>{$t('phonograph.heading')} | {$t('title')}</title>
</svelte:head>

<section transition:fade={{ duration: 250 }}>
	<Background />
	<Header icon="phonograph" h2={$t('phonograph.heading')} relative>
		<div class="close">
			<ButtonIcon on:click={back} />
		</div>
	</Header>
	<div class="container">
		<div class="album-list">
			<Albums {activeAlbum} {playedAlbum} />
		</div>
		<div class="playlist">
			<Tracks {playedAlbum} {activeTrack} {playedTrack} trackList={tracks} />
		</div>
		<div class="controller">
			<Controller playedSID={playedTrack} />
		</div>
	</div>
</section>

<style>
	section {
		width: 100%;
		height: 100%;
		position: relative;
	}
	.container {
		padding: 0 2%;
		width: 100%;
		height: 88%;
		display: flex;
		position: relative;
		z-index: +1;
	}
	.playlist {
		margin-left: auto;
		margin-right: 3%;
	}

	:global(.mobileLandscape) .container {
		padding: 0 5%;
	}

	@media screen and (max-width: 620px) {
		.container {
			flex-direction: column;
			position: relative;
		}
		.container::after {
			content: '';
			width: 120%;
			height: 120%;
			left: 50%;
			top: 0;
			position: absolute;
			z-index: -1;
			transform: translateX(-50%);
			background-image: linear-gradient(transparent 10%, rgba(0, 0, 0, 1));
		}
		.playlist {
			margin-right: 5%;
			margin-left: 0%;
		}
	}
</style>
