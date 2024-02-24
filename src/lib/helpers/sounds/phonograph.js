import { Howl } from 'howler';
import { cookie } from '$lib/helpers/dataAPI/api-cookie';
import { localConfig } from '$lib/helpers/dataAPI/api-localstorage';
import { activeBacksound, currentTime, musics } from '$lib/stores/phonograph-store';
import { fetchMedia } from '../dataAPI/api-fetcher';
import { mediaSessionHandler } from './media-session';

let tracks = [];
musics.subscribe((val) => (tracks = val));

let playID;
let inPlay;
const loadedTracks = {};
const musicMediaSession = {};

const rand = (array) => {
	const index = Math.floor(Math.random() * array.length);
	return { selected: array[index], index };
};

export const formatTime = (secs) => {
	const minutes = Math.floor(secs / 60) || 0;
	const seconds = Math.floor(secs - minutes * 60) || 0;
	const duration = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
	return duration;
};

const isMuted = () => {
	let sounds = localConfig.get('mutedSounds');
	const { bgm = false } = typeof sounds === 'object' ? sounds : {};
	return bgm;
};

export const isPlaying = (sourceID) => {
	const sound = loadedTracks[sourceID];
	if (!sound) return false;
	return sound.playing();
};

const trackError = (ID) => {
	nextTrack();
	delete loadedTracks[ID];
};

// Player
export const playTrack = async (ID) => {
	if (isMuted()) return { status: 'muted' };
	if (!ID) return { status: 'error' };
	inPlay = ID;

	// Play from cache if tracks is loaded already
	if (ID in loadedTracks) {
		const sound = loadedTracks[ID];
		if (sound.playing()) return { status: 'ok' };
		playID = sound.play();
		return { status: 'ok' };
	}

	// Fetch track data from network
	try {
		const { download, images, status } = await fetchMedia(ID);
		const { album, title } = tracks.find((v) => v.sourceID === ID);
		musicMediaSession[ID] = { images, album, title };
		if (status === 'error') return;

		let volume = cookie.get('trackVolume') || 0.2;

		loadedTracks[ID] = new Howl({
			src: [download],
			html5: true,
			volume,
			onend: nextTrack,
			onfade: fadeTrack,
			onplay: () => afterPlay(ID),
			onplayerror: () => trackError(ID)
		});

		playID = loadedTracks[ID].play();
		return { status: 'ok' };
	} catch (e) {
		console.error(e);
		return { status: 'error' };
	}
};

const afterPlay = (ID) => {
	// Stop immediately if user change track before loaded
	if (inPlay !== ID) return loadedTracks[ID].stop();

	cookie.set('trackID', ID);
	mediaSessionHandler(musicMediaSession[ID]);
	seekTrack(ID);

	// Get Duration
	const duration = loadedTracks[ID].duration();
	if (!duration) return;

	musics.update((val) => {
		return val.map((m) => {
			if (m.sourceID !== ID) return m;
			m.duration = duration;
			return m;
		});
	});

	// Pause automaticaly if not focus tab is not open
	if (document.visibilityState === 'visible') return;
	pauseTrack(ID);
};

const seekTrack = (sourceID) => {
	const pos = loadedTracks[sourceID].seek() || 0;
	currentTime.set(pos);
	// If the sound is still playing, continue stepping.
	if (loadedTracks[sourceID].playing()) {
		requestAnimationFrame(() => seekTrack(sourceID));
	}
};

let stopAfterFade = null;
const fadeTrack = () => {
	const ID = cookie.get('trackID');
	const sound = loadedTracks[ID];

	// play sound if fade in
	if (!sound || !sound.playing()) return (playID = sound.play());

	// stop Sound if its playing
	if (!stopAfterFade) return sound.pause(playID);
	sound.stop();
	stopAfterFade = null;
	return;
};

export const nextTrack = () => {
	const id = cookie.get('trackID');
	loadedTracks[id].stop();

	const isLoop = cookie.get('loopTrack');
	if (isLoop) return playTrack(id);

	const isSuffle = cookie.get('suffleTrack');
	if (isSuffle === undefined || isSuffle) return randomTrack();

	const playedIndex = tracks.findIndex(({ sourceID }) => id === sourceID);
	const nextIndex = playedIndex >= tracks.length - 1 ? 0 : playedIndex + 1;
	const trackData = tracks[nextIndex];
	playTrack(trackData.sourceID);
	activeBacksound.set(trackData);
};

export const pauseTrack = async ({ stop = true } = {}) => {
	if (isMuted()) return;
	const ID = cookie.get('trackID');
	const sound = loadedTracks[ID];
	if (!sound) return;
	if (!sound.playing()) return;

	return new Promise((resolve) => {
		stopAfterFade = stop;
		const volume = cookie.get('trackVolume') || 0.2;
		sound.fade(volume, 0, 300, playID);

		const x = setTimeout(() => {
			resolve(true);
			clearTimeout(x);
		}, 500);
	});
};

export const resumeTrack = async () => {
	if (isMuted()) return;
	const ID = cookie.get('trackID');
	const sound = loadedTracks[ID];
	if (!sound) return;
	if (sound.playing()) return;

	const volume = cookie.get('trackVolume') || 0.2;
	sound.fade(0, volume, 10, playID);
};

export const setTrackVolume = (val) => {
	const volumeVal = val / 100;
	cookie.set('trackVolume', volumeVal);
	Object.keys(loadedTracks).forEach((key) => loadedTracks[key]?.volume(volumeVal));
};

const randomTrack = () => {
	const { selected } = rand(tracks);
	playTrack(selected.sourceID);
	activeBacksound.set(selected || {});
};

export const initTrack = () => {
	const unfinisedTrack = cookie.get('trackID');
	if (!unfinisedTrack) return randomTrack();
	playTrack(unfinisedTrack);
	const trackData = tracks.find(({ sourceID }) => sourceID === unfinisedTrack);
	activeBacksound.set(trackData);
	return;
};
