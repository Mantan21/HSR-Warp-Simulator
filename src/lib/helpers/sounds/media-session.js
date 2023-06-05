import { t } from 'svelte-i18n';

const albumCover = (album, images) => {
	const albumList = {
		'out-of-control': 'sb2cKHM',
		'of-snow-and-ember': 'n8RfDth',
		'svah-sanishyu': '5WVTv6m'
	};

	if (Object.keys(albumList).includes(album)) {
		const sizes = [192, 256, 384, 512, 1024];
		const artwork = sizes.map((size) => {
			const src = `https://imagecdn.app/v1/images/https://i.ibb.co/${albumList[album]}/${album}.webp?width=${size}`;
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
