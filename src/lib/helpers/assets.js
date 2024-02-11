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
		'@images/utils/**/*',
		'@images/banners/**/*',
		'@images/background/**/*',
		'@images/light-cones/icons/*.webp',
		'@images/characters/icons/*.webp',
		'@images/characters/closeup/**/*.webp',
		'@images/characters/closeup-bg/**/*.webp'
	],
	{ query: { as: 'picture' }, import: 'default', eager: true }
);

const imageModules = {
	...charSplashArt4,
	...charSplashArt5,
	...lightcones34,
	...lightcone5star,
	...utils
};

export const itemList = () => {
	const pathList = {};

	const getImagePath = (itemType, key, imgArr, defaultSrc) => {
		const imgSize = ['small', 'medium', 'large'];
		const isMultiSize = Array.isArray(imgArr) && imgArr.length > 0;
		if (!isMultiSize) {
			pathList[`${itemType}/${key}`] = defaultSrc;
		} else {
			imgArr.forEach(({ src = '' }, i) => {
				pathList[`${itemType}/${imgSize[i]}/${key}`] = src;
			});
		}
	};

	// Proccess Image Modules
	Object.keys(imageModules).forEach((key) => {
		const [keyName] = key.split('/').reverse();
		const [keyNoExt] = keyName.split('.');

		if (typeof imageModules[key] !== 'object') {
			pathList[keyName] = imageModules[key];
			return;
		}

		const { img = {}, sources = {} } = imageModules[key];
		const { src: defaultSrc = '' } = img;
		const { webp: imgArr = [] } = sources;

		if (key.match(/full-art\//)) {
			getImagePath('lc', keyNoExt, imgArr, defaultSrc);
		} else if (key.match(/splash-art/)) {
			getImagePath('splash-art', keyNoExt, imgArr, defaultSrc);
		} else if (key.match(/closeup-bg/)) {
			pathList[`closeup-bg/${keyNoExt}`] = defaultSrc;
		} else if (key.match(/closeup/)) {
			pathList[`closeup/${keyNoExt}`] = defaultSrc;
		} else if (key.match(/(cones\/icons|characters\/icons)/)) {
			pathList[`icon/${keyNoExt}`] = defaultSrc;
		} else if (key.match(/(event|regular\/)/)) {
			pathList[`banner/${keyNoExt}`] = defaultSrc;
		} else if (key.match(/(starter)/)) {
			const [, version] = key.split('/').reverse();
			pathList[`banner/${version}/${keyNoExt}`] = defaultSrc;
		} else {
			pathList[keyName] = defaultSrc;
		}
	});

	return pathList;
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
			'album_svah-sanishyu.webp',
			'album_experience-the-paths.webp',
			'album_more-ost.webp',
			'album_custom-musics.webp',
			'circle-ornament1.svg',
			'circle-ornament2.svg',
			'combat-fire.webp',
			'combat-ice.webp',
			'combat-imaginary.webp',
			'combat-lightning.webp',
			'combat-physical.webp',
			'combat-quantum.webp',
			'combat-wind.webp',
			'depature-icon.svg',
			'eidolon-4star.webp',
			'eidolon-5star.webp',
			'item-card-back.webp',
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
			'starrail-logo.webp',
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
	const globList = itemList();
	const allImg = [...images, bgList()];

	allImg.forEach(({ paths }) => {
		paths.forEach((path) => {
			const pathdir = globList[path];
			console.log(pathdir, path);
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
