const CACHE_NAME = 'tumye-sf19-v2-cache';
const urlsToCache = [
  './',
  'index.html',
  'https://code.jquery.com/jquery-3.5.1.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.3/chess.min.js',
  'https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.css',
  'https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.js',
  'https://cdn.jsdelivr.net/npm/stockfish@19.0.1/src/stockfish-19-single.js'
];

for (let p of ['wP','wR','wN','wB','wQ','wK','bP','bR','bN','bB','bQ','bK']) {
    urlsToCache.push(`https://chessboardjs.com/img/chesspieces/wikipedia/${p}.png`);
}

self.addEventListener('install', event => {
  self.skipWaiting(); // Erzwingt das sofortige Ersetzen des alten Caches
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName); // Löscht alte Caches
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
