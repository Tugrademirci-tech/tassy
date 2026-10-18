onst CACHE_NAME = 'tumye-v4.0-sf19';
const urlsToCache = [
  './',
  'index.html',
  'stockfish-19-lite-single.js',
  'stockfish-19-lite-single.wasm',
  'https://code.jquery.com/jquery-3.5.1.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.3/chess.min.js',
  'https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.css',
  'https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.js'
];
 
for (let p of ['wP','wR','wN','wB','wQ','wK','bP','bR','bN','bB','bQ','bK']) {
    urlsToCache.push(`https://chessboardjs.com/img/chesspieces/wikipedia/${p}.png`);
}
 
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});
 
// Alte Caches (z. B. v3.0 mit Stockfish 10) löschen
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});
 
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
 
