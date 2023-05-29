// Load and procces images
const charSplashArt4 = import.meta.glob('@images/characters/splash-art/4star/*.webp', {
	query: { w: '640;1280', as: 'picture' },
	import: 'default',
	eager: true
});
const charSplashArt5 = import.meta.glob('@images/characters/splash-art/5star/*.webp', {
	query: { w: '640;1280;2000', as: 'picture' },
	import: 'default',
	eager: true
});

const lightcones34 = import.meta.glob(
	['@images/light-cones/full-art/3star/*.webp', '@images/light-cones/full-art/4star/*.webp'],
	{ query: { w: '150;450', as: 'picture' }, import: 'default', eager: true }
);

const lightcone5star = import.meta.glob('@images/light-cones/full-art/5star/*.webp', {
	query: { w: '150;450;890', as: 'picture' },
	import: 'default',
	eager: true
});

const utils = import.meta.glob(
	[
		'@images/utils/*',
		'@images/banners/**/*',
		'@images/background/**/*',
		'@images/light-cones/icons/*.webp',
		'@images/characters/closeup/**/*.webp'
	],
	{ query: { as: 'picture' }, import: 'default', eager: true }
);

const generateFullPath = (path) => {
	const [type, rarity, name] = path.split('/');

	if (type === 'lc') {
		return `/src/images/light-cones/full-art/${rarity}star/${name}.webp`;
	}

	if (['splash-art', 'closeup'].includes(type)) {
		return `/src/images/characters/${type}/${rarity}star/${name}.webp`;
	}
	const fullpath = `/src/images/${path}`;

	return fullpath;
};

export const assetPath = (path, size = 0) => {
	try {
		const imageModules = {
			...charSplashArt4,
			...charSplashArt5,
			...lightcones34,
			...lightcone5star,
			...utils
		};
		const fullpath = generateFullPath(path);
		const findImage = imageModules[fullpath] || {};

		if (typeof findImage === 'string') return findImage;
		if (Object.keys(findImage.sources) < 1) return findImage.img.src;

		const image = Object.values(findImage.sources);
		if (image.length < 1) throw new Error(`No Image Found for ${fullpath}`);
		if (!size || size < 1) return image[0][0]?.src;

		const filterSize = image[0].find(({ w }) => w === parseInt(size));
		return filterSize?.src;
	} catch (e) {
		console.error(e);
		return null;
	}
};

const images = [
	{
		dir: 'background',
		paths: [
			'additional-reward-bg.webp',
			'allbanner-bg.webp',
			'archive-bg.webp',
			'departure-bg.webp',
			'gachainfo-bg.webp',
			'gachainfo-bg2.webp',
			'phonograph-bg.webp',
			'stellar-bg.webp',
			'warp-bg.webp'
		]
	},
	{
		dir: 'utils',
		paths: [
			'additional-reward.svg',
			'album_of-snow-and-ember.webp',
			'album_out-of-control.webp',
			'circle-ornament1.svg',
			'circle-ornament2.svg',
			'depature-icon.svg',
			'eidolon-4star.webp',
			'eidolon-5star.webp',
			'method-tears.webp',
			'method-imaginary-money.webp',
			'method-empty-wallet.webp',
			'music.svg',
			'music-disc.webp',
			'oneiric-shard.webp',
			'oneiric-60.webp',
			'oneiric-300.webp',
			'oneiric-980.webp',
			'oneiric-1980.webp',
			'oneiric-3280.webp',
			'oneiric-6480.webp',
			'regular-pass-clean.webp',
			'regular-pass.webp',
			'special-pass-clean.webp',
			'special-pass.webp',
			'stellar-icon.svg',
			'stellar-jade.webp',
			'undying-embers.webp',
			'undying-starlight.webp'
		]
	}
];

const videos = ['phonograph1.mp4', 'phonograph2.mp4'];

const bgList = () => {
	const paths = [];
	for (let i = 0; i < 10; i++) {
		paths.push(`bg${i + 1}.webp`);
	}
	return { dir: 'background', paths };
};

export const listingAssets = () => {
	const arr = [];
	const allImg = [...images, bgList()];

	allImg.forEach(({ dir, paths }) => {
		paths.forEach((path) => {
			const pathdir = assetPath(`${dir}/${path}`);
			const item = { path: pathdir, asset: path };
			arr.push(item);
		});
	});

	videos.forEach((v) => {
		const pathdir = `/videos/${v}`;
		const item = { path: pathdir, asset: v };
		arr.push(item);
	});

	return arr;
};

export const blobAssets = async (path) => {
	try {
		const data = await fetch(path);
		const responseType = data.headers.get('Content-Type');
		if (responseType === 'text/html') throw new Error('Failed to load Assets');
		const blob = await data.blob();
		const DOMURL = window.URL || window.webkitURL;
		const url = DOMURL.createObjectURL(blob);
		return url;
	} catch (e) {
		console.error(e);
		return 'error';
	}
};
