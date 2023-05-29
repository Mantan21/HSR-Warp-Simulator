<script>
	import { getContext, onMount, setContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { data as musics } from '$lib/data/tracks.json';
	import { playSfx } from '$lib/helpers/audio';

	import ButtonIcon from '$lib/components/ButtonIcon.svelte';
	import Header from '$lib/components/Header.svelte';
	import Background from './_background.svelte';
	import Albums from './_albums.svelte';
	import Tracks from './_tracks.svelte';
	import Controller from './_controller.svelte';

	onMount(() => playSfx('music-loaded'));

	const navigate = getContext('navigate');
	const back = () => {
		playSfx('music-close');
		navigate('index');
	};

	let tracks = [];
	let activeAlbum = 'out-of-control';
	let playedAlbum = activeAlbum;
	const albumList = musics.map(({ album }) => album);

	setContext('pickAlbum', (selected) => (playedAlbum = selected));
	$: ({ tracks } = musics.find(({ album }) => album === playedAlbum));
</script>

<svelte:head>
	<title>Phonograph | {$t('title')}</title>
</svelte:head>

<section transition:fade={{ duration: 250 }}>
	<Background />
	<Header icon="phonograph" h2="Phonograph" relative>
		<div class="close">
			<ButtonIcon on:click={back} />
		</div>
	</Header>
	<div class="container">
		<div class="album-list">
			<Albums {activeAlbum} {albumList} {playedAlbum} />
		</div>
		<div class="playlist">
			<Tracks {activeAlbum} trackList={tracks} />
		</div>
		<div class="controller">
			<Controller />
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
