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
		paths: ['archive-bg.webp', 'departure-bg.webp', 'stellar-bg.webp', 'warp-bg.webp']
	},
	{
		dir: 'utils',
		paths: [
			'additional-reward.svg',
			'circle-ornament1.svg',
			'circle-ornament2.svg',
			'depature-icon.svg',
			'eidolon-4star.webp',
			'eidolon-5star.webp',
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

export const listingAssets = () => {
	const arr = [];
	const allImg = [...images];

	allImg.forEach(({ dir, paths }) => {
		paths.forEach((path) => {
			const pathdir = assetPath(`${dir}/${path}`);
			const item = { path: pathdir, asset: path };
			arr.push(item);
		});
	});

	// videos.forEach((v) => {
	//   const pathdir = `/videos/${v}`;
	//   const item = { path: pathdir, asset: v };
	//   arr.push(item);
	// });

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
