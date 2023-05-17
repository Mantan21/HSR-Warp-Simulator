import path from 'path';
import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';
import { VitePWA } from 'vite-plugin-pwa';

const iconSize = [32, 72, 144, 152, 192, 256, 384, 512];
const icons = iconSize.map((size) => {
	const iconObj = {
		src: `./icons/icon-${size}x${size}.png`,
		sizes: `${size}x${size}`,
		type: 'image/png'
	};
	if (size === 192) iconObj.purpose = 'maskable';
	if (size === 384) iconObj.purpose = 'any';
	return iconObj;
});

const screenshots = [
	{
		sizes: '591x1280',
		src: 'https://user-images.githubusercontent.com/13815468/200561929-52a32a57-bd2c-473c-b25d-dcd8877ce253.jpg',
		label: 'Section 1',
		type: 'image/jpg'
	},
	{
		sizes: '591x1280',
		src: 'https://user-images.githubusercontent.com/13815468/200561938-c8429695-d7fe-4cf2-8391-d3e78daa789c.jpg',
		label: 'Section 2',
		type: 'image/jpg'
	},
	{
		sizes: '591x1280',
		src: 'https://user-images.githubusercontent.com/13815468/200561909-2f965a06-6cdb-45a3-92c9-646546d514f8.jpg',
		label: 'Section 3',
		type: 'image/jpg'
	},
	{
		sizes: '591x1280',
		src: 'https://user-images.githubusercontent.com/13815468/200561919-b76b11e2-dbda-4534-845e-48714f60fc40.jpg',
		label: 'Section 4',
		type: 'image/jpg'
	}
];

const manifest = {
	orientation: 'landscape',
	name: 'Honkai: Star Rail Warp Simulator',
	short_name: 'HSR Warp Sim',
	theme_color: '#ffffff',
	background_color: '#ffffff',
	display: 'fullscreen',
	scope: '/',
	start_url: '/?pwasc=hsr-homescreen',
	categories: ['games', 'utilities'],
	description: 'Realistic Gacha Simulator for Honkai: Star Rail',
	dir: 'auto',
	icons,
	// screenshots,
	prefer_related_applications: true,
	related_applications: [
		{
			platform: 'webapp',
			url: 'https://hsr.wishsimulator.app/appmanifest.json'
		}
		// {
		// 	platform: 'play',
		// 	url: 'https://play.google.com/store/apps/details?id=hsr.wishsimulator.app',
		// 	id: 'hsr.wishsimulator.app'
		// }
	]
};

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		imagetools({}),
		sveltekit(),
		VitePWA({
			strategies: 'injectManifest',
			srcDir: 'src',
			filename: 'sw.js',
			registerType: 'prompt',
			manifestFilename: 'appmanifest.json',
			manifest
		})
	],
	resolve: {
		alias: {
			'@images': path.resolve(__dirname, './src/images')
		}
	},
	build: {
		chunkSizeWarningLimit: 350,
		target: ['es2020']
	}
};

export default config;
