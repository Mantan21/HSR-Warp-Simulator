import path from 'path';
import adapter from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		appDir: 'internal',
		adapter: adapter(),
		alias: {
			'@image': path.resolve('./src/post')
		}
	},
	preprocess: preprocess({ postcss: true })
};

export default config;
