import path from 'path';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		appDir: 'internal',
		adapter: adapter(),
		alias: {
			'@image': path.resolve('./src/post')
		}
	}
};

export default config;
