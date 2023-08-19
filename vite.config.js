import path from 'path';
import { sveltekit } from '@sveltejs/kit/vite';
import { imagetools } from 'vite-imagetools';
import { VitePWA } from 'vite-plugin-pwa';
import { plugin as MdPlugin } from 'vite-plugin-markdown';

const iconSize = [32, 72, 96, 128, 144, 152, 192, 256, 384, 512];
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
		sizes: '1280x720',
		src: 'https://i.ibb.co/7NF6qNp/sc1.jpg',
		label: 'Section 1',
		type: 'image/jpg'
	},
	{
		sizes: '1280x720',
		src: 'https://i.ibb.co/n3hN3w3/sc2.jpg',
		label: 'Section 2',
		type: 'image/jpg'
	},
	{
		sizes: '1280x720',
		src: 'https://i.ibb.co/VMrtX8v/sc3.jpg',
		label: 'Section 3',
		type: 'image/jpg'
	},
	{
		sizes: '1280x720',
		src: 'https://i.ibb.co/fX29p3X/sc4.jpg',
		label: 'Section 4',
		type: 'image/jpg'
	},
	{
		sizes: '1280x720',
		src: 'https://i.ibb.co/ZH8y8N5/sc5.jpg',
		label: 'Section 5',
		type: 'image/jpg'
	},
	{
		sizes: '1280x720',
		src: 'https://i.ibb.co/128RLT1/sc6.jpg',
		label: 'Section 6',
		type: 'image/jpg'
	},
	{
		sizes: '1280x720',
		src: 'https://i.ibb.co/p4Yfkdh/sc7.jpg',
		label: 'Section 7',
		type: 'image/jpg'
	}
];

const manifest = {
	orientation: 'landscape',
	name: 'Honkai: Star Rail Warp Simulator',
	short_name: 'HSR Warp Sim',
	description:
		"Just a Realistic Gacha Simulator for Honkai: Star Rail. Let's Simulate your luck unlimited times!",
	theme_color: '#000000',
	background_color: '#000000',
	scope: '/',
	start_url: '/?pwasc=hsr-homescreen',
	id: 'hsr.wishsimulator.app',
	categories: ['games', 'utilities'],
	dir: 'auto',
	display: 'fullscreen',
	handle_links: 'preferred',
	icons,
	screenshots,
	prefer_related_applications: true,
	launch_handler: {
		client_mode: ['focus-existing, auto']
	},
	scope_extensions: [
		{ origin: 'hsr.wishsimulator.app' },
		{ origin: 'hsr-warp-simulator.pages.dev' }
	],
	display_override: [
		'fullscreen',
		'window-controls-overlay',
		'standalone',
		'minimal-ui',
		'browser'
	],
	shortcuts: [
		{
			name: 'Feedback',
			url: '/feedback',
			description: 'Give a Comment about the Simulator.'
		}
	],
	edge_side_panel: {
		preferred_width: 412
	},
	related_applications: [
		{
			platform: 'webapp',
			url: 'https://hsr.wishsimulator.app/appmanifest.json'
		},
		{
			platform: 'play',
			url: 'https://play.google.com/store/apps/details?id=hsr.wishsimulator.app',
			id: 'hsr.wishsimulator.app'
		}
	]
};

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [
		imagetools({}),
		sveltekit(),
		MdPlugin({ mode: 'html' }),
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
			$post: path.resolve(__dirname, './src/post'),
			'@images': path.resolve(__dirname, './src/images')
		}
	},
	build: {
		chunkSizeWarningLimit: 350,
		target: ['es2020']
	}
};

export default config;
