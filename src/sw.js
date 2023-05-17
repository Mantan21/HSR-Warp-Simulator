import { setCacheNameDetails, skipWaiting, clientsClaim } from 'workbox-core';
import { precacheAndRoute, cleanupOutdatedCaches } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';

const cacheVersion = 'v1';

clientsClaim();
skipWaiting();
cleanupOutdatedCaches();

setCacheNameDetails({
	prefix: 'WarpSim',
	precache: 'Core',
	suffix: cacheVersion
});

let precache = self.__WB_MANIFEST;
precache = [];
precacheAndRoute(precache, { ignoreURLParametersMatching: [/.*/] });

registerRoute('/', new NetworkFirst({ cacheName: `Static-${cacheVersion}` }));

registerRoute(
	new RegExp('.(?:/?pwa=true|/?pwasc)'),
	new NetworkFirst({
		cacheName: `Static-${cacheVersion}`,
		plugins: [
			{
				cachedResponseWillBeUsed: ({ cachedResponse }) => {
					if (cachedResponse) return cachedResponse;
					return caches.match('/');
				},
				cacheWillUpdate: () => null // prevent update cache
			}
		]
	})
);

registerRoute(
	({ url, request }) => {
		const isAudio = url.href.includes('audiofx');
		const isVideo = url.href.includes('/videos');

		const imagePath = url.pathname.startsWith('/internal/immutable/assets');
		const iconPath = url.pathname.startsWith('/icons');
		const matchImage = url.href.match(new RegExp('.(?:svg|webp|jpg|png|jpeg)')) || [];
		const isMatch = matchImage.length > 0;
		const isImage = (request.destination === 'image' || isMatch) && (imagePath || iconPath);

		return isAudio || isImage || isVideo;
	},
	new CacheFirst({
		cacheName: `Static-${cacheVersion}`
	})
);

registerRoute(
	({ url }) => {
		const font = url.href.match(new RegExp('.(?:woff|woff2|ttf)$')) || [];
		return font.length > 0;
	},
	new NetworkFirst({
		cacheName: `Static-${cacheVersion}`,
		plugins: [new CacheableResponsePlugin({ statuses: [0, 200] })]
	})
);

registerRoute(
	new RegExp('.(?:css|js|json)$'),
	new NetworkFirst({
		cacheName: 'Chunks'
	})
);
