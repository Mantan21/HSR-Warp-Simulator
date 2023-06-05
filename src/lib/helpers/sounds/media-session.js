import { t } from 'svelte-i18n';
import { assets } from '$lib/stores/app-store';

const albumCover = (album, images) => {
	const albumList = ['out-of-control', 'svah-sanishyu', 'of-snow-and-ember'];
	if (albumList.includes(album)) {
		let cover;
		assets.subscribe((a) => (cover = a[`album_${album}.webp`]));
		return [
			{
				src: cover,
				sizes: '227x227',
				type: 'image/webp'
			}
		];
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
	t.subscribe((l) => (localeAlbum = l(`phonograph.${album}`)));
	return localeAlbum;
};

export const mediaSessionHandler = (args) => {
	if (!args) return;
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
