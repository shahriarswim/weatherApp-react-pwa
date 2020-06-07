const CACHE_NAME = 'v1';
const urls = ['index.html', 'offline.html'];

const sw = this;

// Install Service Worker
sw.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');

        return cache.addAll(urls);
      })
      .catch((err) => console.log(err))
  );
});

// Listen for Requests
sw.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match('offline.html'));
    })
  );
});

// Active the  Service Worker
sw.addEventListener('activate', (event) => {
  const cacheToSave = [];

  cacheToSave.push(CACHE_NAME);

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      Promise.all(
        cacheNames.map((eachName) => {
          if (!cacheToSave.includes(eachName)) {
            return caches.delete(eachName);
          }
        })
      );
    })
  );
});
