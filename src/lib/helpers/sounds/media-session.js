import { t } from 'svelte-i18n';

const albumCover = (album, images) => {
	const albumList = {
		'out-of-control': 'ygKTfYj',
		'of-snow-and-ember': 'wR0Nj7h',
		'svah-sanishyu': 'vqbQ66N',
		'the-flapper-sinthome': 'C1X6Dfp',
		'experience-the-paths-1': 'Y2wRLPx',
		'experience-the-paths-2': 'zJRxzGK'
	};

	if (Object.keys(albumList).includes(album)) {
		const sizes = [256, 384, 512];
		const artwork = sizes.map((size) => {
			const src = `https://imagecdn.app/v2/image/https%3A%2F%2Fi.ibb.co%2F${albumList[album]}%2F${album}.webp?width=${size}`;
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
