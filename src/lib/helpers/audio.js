import { localConfig } from '$lib/stores/localstorage';
import { Howl } from 'howler';

const sfxSources = {
	click: '/audiofx/click.mp3',
	'express-3star': '/audiofx/express-3star.mp3',
	'express-4star': '/audiofx/express-4star.mp3',
	'express-5star': '/audiofx/express-5star.mp3',
	'switch-banner': '/audiofx/switch-banner.mp3',
	'reveal-3star': '/audiofx/reveal-3star.mp3',
	'reveal-4star': '/audiofx/reveal-4star.mp3',
	'reveal-5star': '/audiofx/reveal-5star.mp3',
	'warp-backsound': '/audiofx/warp-backsound.mp3',
	'warpresult-close': '/audiofx/warpresult-close.mp3'
};

const sounds = {};
const soundInit = () => {
	Object.keys(sfxSources).forEach((key) => {
		sounds[key] = new Howl({
			src: [sfxSources[key]],
			loop: key === 'warp-backsound'
		});
	});
};
soundInit();

const sfxids = {};

export const playSfx = (nameOfSoundfx = 'click') => {
	try {
		if (!sounds[nameOfSoundfx]) throw new Error('No Sound effect for ' + nameOfSoundfx);
		if (localConfig.get('muted')) return;
		sfxids[nameOfSoundfx] = sounds[nameOfSoundfx].play();

		if (nameOfSoundfx === 'warp-backsound') {
			sounds[nameOfSoundfx].fade(0, 1, 1000, sfxids[nameOfSoundfx]);
		}
	} catch (e) {
		console.error('Unable to Play Sfx : ', e.message);
	}
};

export const stopSfx = (nameOfSoundfx = 'click') => {
	try {
		if (localConfig.get('muted')) return;
		if (!sounds[nameOfSoundfx]) throw new Error('No Sound effect for ' + nameOfSoundfx);

		// if (!nameOfSoundfx === 'warp-backsound') return sounds[nameOfSoundfx].stop();
		sounds[nameOfSoundfx].fade(1, 0, 1000, sfxids[nameOfSoundfx]);
	} catch (e) {
		console.error('Unable to Stop Sfx : ', e.message);
	}
};
