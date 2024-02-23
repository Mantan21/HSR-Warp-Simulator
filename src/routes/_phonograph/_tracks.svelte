<script>
	import { getContext, setContext } from 'svelte';
	import { fade } from 'svelte/transition';
	import { t } from 'svelte-i18n';
	import { playSfx } from '$lib/helpers/sounds/audiofx';
	import ButtonGeneral from '$lib/components/ButtonGeneral.svelte';
	import Scrollable from '$lib/components/Scrollable.svelte';
	import TrackItem from './_track-item.svelte';
	import ModalTrack from './_modal-track.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { activeBacksound, musics } from '$lib/stores/phonograph-store';
	import { customTracks } from '$lib/helpers/dataAPI/api-localstorage';
	import { nextTrack } from '$lib/helpers/sounds/phonograph';

	export let playedAlbum = '';
	export let trackList = [];
	export let playedTrack;
	export let activeTrack;

	let width;
	let sfx = 1;
	let songReady = false;
	let isWaiting = false;
	setContext('wait', (val) => (isWaiting = val));
	setContext('songReady', (val) => (songReady = val));

	const setMusic = getContext('setMusic');
	const pickTrack = getContext('pickTrack');
	const selectTrack = (trackID) => {
		if (playedTrack === trackID) return;
		pickTrack(trackID);
		if (sfx === 1) {
			sfx = 2;
			return playSfx('music-select1');
		}
		sfx = 1;
		return playSfx('music-select2');
	};
	setContext('selectTrack', selectTrack);

	// Modal to mange Track
	let showModalAdd = false;
	const handleModal = (val) => (showModalAdd = val);
	setContext('handleModal', handleModal);

	let showModalDelete = false;
	let musicIDToDelete = '';
	const closeModalDelete = () => {
		playSfx('modal-close');
		showModalDelete = false;
	};
	setContext('closeModal', closeModalDelete);

	setContext('deletePrompt', (id) => {
		musicIDToDelete = id;
		showModalDelete = true;
	});

	const confirmDelete = () => {
		playSfx();
		if ($activeBacksound.sourceID === musicIDToDelete) nextTrack();
		musics.update((m) => m.filter((m) => m.sourceID !== musicIDToDelete));
		customTracks.delete(musicIDToDelete);
		musicIDToDelete = '';
		showModalDelete = false;
	};
</script>

<ModalTrack show={showModalAdd} />

{#if showModalDelete}
	<Modal
		title={$t('phonograph.removeTrack')}
		on:confirm={confirmDelete}
		on:cancel={closeModalDelete}
	>
		<div class="deleteTrack">{$t('phonograph.deleteTrack')}</div>
	</Modal>
{/if}

<div class="tracks" bind:clientWidth={width} style="--wd:{width}px">
	<div class="album-name"><i> {$t(`phonograph.${playedAlbum}`)}</i></div>
	<div class="track-list">
		<Scrollable visibility="hidden">
			<div class="list-wrapper">
				{#if playedAlbum === 'custom-musics' && trackList.length < 1}
					<div class="track-item custom no-track">
						<div class="title">
							<span>{$t('phonograph.notrackAdded')}</span>
						</div>
					</div>
				{/if}

				{#each trackList as track, i (track)}
					{@const { title, sourceID, duration, album } = track}
					<div class="track-item" in:fade={{ duration: 250, delay: Math.sqrt(i * 15000) }}>
						<TrackItem {playedTrack} {title} {sourceID} {isWaiting} {duration} {album} />
					</div>
				{/each}

				{#if playedAlbum === 'custom-musics'}
					<div class="track-item custom">
						<ButtonGeneral
							icon="music"
							on:click={() => {
								handleModal(true);
								playSfx();
							}}
						>
							{$t('phonograph.addCustom')}
						</ButtonGeneral>
					</div>
				{/if}
			</div>
		</Scrollable>
	</div>
	<div class="divider" />
	<div class="set-bgm">
		<ButtonGeneral
			icon="music"
			disabled={!songReady || activeTrack === playedTrack}
			on:click={() => setMusic(playedTrack)}
		>
			{activeTrack === playedTrack ? $t('phonograph.currentSong') : $t('phonograph.setSong')}
		</ButtonGeneral>
	</div>
</div>

<style>
	.tracks {
		min-width: 320px;
		width: calc(0.23 * var(--screen-width));
		height: 100%;
		display: flex;
		flex-direction: column;
	}
	.album-name {
		height: calc(0.2 * var(--wd));
		font-size: calc(0.08 * var(--wd));
		padding-left: calc(0.05 * var(--wd));
		display: flex;
		align-items: center;
		line-height: 120%;
	}

	.track-list {
		height: calc((0.84 * var(--screen-height) - (0.38 * var(--wd))));
	}

	.divider,
	.list-wrapper,
	.set-bgm {
		margin-left: calc(0.05 * var(--wd));
	}

	.divider {
		border-bottom: rgba(255, 255, 255, 0.5) calc(0.005 * var(--wd)) solid;
	}
	.list-wrapper {
		position: relative;
	}

	.set-bgm {
		height: calc(0.25 * var(--wd));
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.set-bgm :global(span) {
		padding: calc(0.0175 * var(--wd)) calc(0.1 * var(--wd));
		font-size: calc(0.05 * var(--wd));
	}

	.track-item {
		height: calc(0.25 * var(--wd));
		margin-bottom: calc(0.03 * var(--wd));
		position: relative;
	}

	.track-item.custom {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.no-track {
		opacity: 0.8;
		justify-content: center;
	}

	.custom :global(button) {
		padding: 4% 10%;
	}

	/* Mobile Landscape */
	:global(.mobileLandscape) .tracks {
		min-width: 175px;
	}

	/* Mobile Portrait */
	@media screen and (max-width: 620px) {
		.tracks {
			width: 100%;
			min-width: unset;
			max-width: 350px;
			margin: auto;
		}
		.album-name {
			height: calc(0.125 * var(--wd));
			font-size: calc(0.05 * var(--wd));
		}
		.track-list {
			height: calc((0.7 * var(--screen-height) - (0.25 * var(--wd))));
		}
		.track-item {
			height: calc(0.175 * var(--wd));
			margin-bottom: calc(0.01 * var(--wd));
		}
		.set-bgm {
			height: unset;
			padding: 0.5rem;
		}
		.set-bgm :global(span) {
			padding: 0.25rem;
			font-size: calc(0.03 * var(--wd));
		}
	}
</style>
