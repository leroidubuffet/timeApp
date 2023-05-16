const CACHE_NAME = 'countdown-timer-pwa-v1';
const FILES_TO_CACHE = [
	'./',
	'./index.html',
	'./public/manifest.json',
	'./src/styles.css',
	'./src/scripts/app.js',
	'./public/imgs/icon-192.png', 
	'./public/imgs/icon-512.png'
];

self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(CACHE_NAME).then(cache => {
			return cache.addAll(FILES_TO_CACHE);
		})
	);
});

self.addEventListener('activate', event => {
	event.waitUntil(
		caches.keys().then(keyList => {
			return Promise.all(
				keyList.map(key => {
					if (key !== CACHE_NAME) {
						return caches.delete(key);
					}
				})
			);
		})
	);
});

self.addEventListener('fetch', event => {
	event.respondWith(
		caches.match(event.request).then(response => {
			return response || fetch(event.request);
		})
	);
});
