// app cache
const cacheName = 'weatherPWA-v2'; // This should be updated after each change
let filesToCache = [
  '/',
  '/index.html',
  '/scripts/app.js',
  '/scripts/localForage.min.js',
  '/styles/inline.css',
  '/images/clear.png',
  '/images/cloudy-scattered-showers.png',
  '/images/cloudy.png',
  '/images/fog.png',
  '/images/ic_add_white_24px.svg',
  '/images/ic_refresh_white_24px.svg',
  '/images/partly-cloudy.png',
  '/images/rain.png',
  '/images/scattered-showers.png',
  '/images/sleet.png',
  '/images/snow.png',
  '/images/thunderstorm.png',
  '/images/wind.png'
];

// weather data cache
const dataCacheName = 'weatherData-v1';

self.addEventListener('install', e => {
  console.log('[ServiceWorker] Install');

  e.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(filesToCache);
      })
  );

});

// update SW cache whenever any of the app shell files change
self.addEventListener('activate', e => {
  console.log('[ServiceWorker] Activate');

  e.waitUntil(
    caches.keys()
      .then(keyList => {
        return Promise.all(keyList.map(key => {
          if (key !== cacheName && key !== dataCacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
  );

  return self.clients.claim();

});

// Serve the app shell from the cache
self.addEventListener('fetch', e => {
  console.log(`[ServiceWorker] Fetch: ${e.request.url}`);

  const dataUrl = 'https://query.yahooapis.com/v1/public/yql';

  if (e.request.url.indexOf(dataUrl) > -1) {
    /*
     * When the request URL contains dataUrl, the app is asking for fresh weather data.
     * In this case, the service worker always goes to the network and then
     * caches the response.
     * This is called the "Cache then network" strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
     */
    e.respondWith(
      caches.open(dataCacheName)
        .then(cache => {
          return fetch(e.request)
            .then(response => {
              cache.put(e.request.url, response.clone());
              return response;
            });
        })
    );
  } else {
    /*
     * The app is asking for app shell files. In this scenario the app uses the
     * "Cache, falling back to the network" offline strategy:
     * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
     */
    e.respondWith(
      caches.match(e.request).then(response => response || fetch(e.request))
    );
  }
});