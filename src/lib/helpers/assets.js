import { data as charDB } from '$lib/data/characters.json';
import { data as lcDB } from '$lib/data/light-cones.json';

const images = [
	{
		dir: 'background',
		paths: ['departure-bg.webp', 'stellar-bg.webp', 'warp-bg.webp']
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

export const getAssetList = async () => {
	const pathList = {};

	charDB.forEach(({ name, rarity }) => {
		pathList[`closeup/${name}`] = `/images/characters/closeup${rarity}star/${name}.webp`;
		pathList[`splash-art/${name}`] = `/images/characters/splash-art/${rarity}star/${name}.webp`;
	});

	lcDB.forEach(({ name, rarity }) => {
		pathList[name] = `/images/light-cones/${rarity}star/${name}.webp`;
	});
	return pathList;
};

export const listingAssets = () => {
	const arr = [];
	const allImg = [...images];

	allImg.forEach(({ dir, paths }) => {
		paths.forEach((path) => {
			const pathdir = `/images/${dir}/${path}`;
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
