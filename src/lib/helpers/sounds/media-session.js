import { t } from 'svelte-i18n';
import { musics, albumList } from '$lib/stores/phonograph-store';

const trackAlbums = {
	'out-of-control': 'm4kdBdn',
	'of-snow-and-ember': '4fq5BGg',
	'svah-sanishyu': 'pKsGkwH',
	'the-flapper-sinthome': 'Lx0h7B6',
	'experience-the-paths-1': 'ZLhLMvZ',
	'experience-the-paths-2': 'hBwzvZj',
	inside: 'R2nsXP2',
	'more-ost': ''
};

export const loadTracks = async () => {
	const trackList = [];
	const albums = Object.keys(trackAlbums);
	albumList.set([...albums, 'custom-musics']);

	for (let i = 0; i < albums.length; i++) {
		const album = albums[i];
		const data = await import(`../../data/tracks/${album}.json`);
		const tracks = data.default;

		Object.keys(tracks).forEach((sourceID) => {
			const item = tracks[sourceID];
			if (!item) return;
			if (typeof item === 'string') return trackList.push({ album, sourceID, title: item });
			const { title, description } = item || {};
			trackList.push({ album, sourceID, title, description });
		});
	}
	musics.set(trackList);
};

const albumCover = (album, images) => {
	const albums = Object.keys(trackAlbums).filter((key) => !!trackAlbums[key]);
	if (albums.includes(album)) {
		const sizes = [256, 384, 512];
		const artwork = sizes.map((size) => {
			const src = `https://imagecdn.app/v2/image/https%3A%2F%2Fi.ibb.co%2F${trackAlbums[album]}%2F${album}.webp?width=${size}`;
			const type = 'image/webp';
			const sizes = `${size}x${size}`;
			return { src, type, sizes };
		});
		return artwork;
	}

	// Use YT Thumbnail as Album Cover
	const artwork = images.map(({ height, width, url }) => {
		return {
			src: url,
			sizes: `${width}x${height}`,
			type: 'image/png'
		};
	});

	return artwork;
};

const albumTitle = (album) => {
	let localeAlbum;
	t.subscribe((l) => {
		if (!album.match('paths')) return (localeAlbum = l(`phonograph.${album}`));
		const vol = album.split('-').reverse()[0];
		localeAlbum = `${l('phonograph.experience-the-paths')} - ${vol}`;
	});
	return localeAlbum;
};

export const mediaSessionHandler = (args) => {
	if (!args) return new MediaMetadata(null);
	const { title, album, artist = 'Hoyo-MiX', images = [] } = args;

	if ('mediaSession' in navigator) {
		navigator.mediaSession.metadata = new MediaMetadata({
			album: albumTitle(album),
			artwork: albumCover(album, images),
			title,
			artist
		});
	}
};
