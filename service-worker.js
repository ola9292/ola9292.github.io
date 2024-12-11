
const cacheName = 'v2';

const cacheAssets = [
  'index.html',
  'style.css',
  'about.html',
  'images/image-1.jpg',
  'images/image-2.jpg',
]
// call install event
self.addEventListener('install', (e) => {
 console.log('service worker: Installed');
 e.waitUntil(
  caches
    .open(cacheName)
    .then(cache => {
      console.log('service worker: caching files')
      cache.addAll(cacheAssets)
    })
    .then(() => self.skipWaiting())
 );
})

//activate event
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activated');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log(`Service Worker: Clearing old cache: ${cache}`);
            return caches.delete(cache);
          }
          return null; // Return null for caches not deleted
        })
      );
    })
  );
});

 //call fetch events
 self.addEventListener('fetch', (e) => {
    console.log('Service worker: fetching');
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          // Return the network response if successful
          return response;
        })
        .catch(() => {
          // If the network fetch fails, look in the cache
          return caches.match(e.request).then((cacheResponse) => {
            // Return the cached response or a fallback (e.g., index.html)
            return cacheResponse || caches.match('index.html');
          });
        })
    );
 });
