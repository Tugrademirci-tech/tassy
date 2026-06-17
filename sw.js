const CACHE_NAME = 'tumye-v1.0-cache';
const urlsToCache = [
  'index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/stockfish.js/16.0.0/stockfish.js',
  'https://tests.stockfishchess.org/api/nn/nn-b1a57edbea57.nnue',
  'https://code.jquery.com/jquery-3.5.1.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/chess.js/0.10.3/chess.min.js',
  'https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.css',
  'https://unpkg.com/@chrisoakman/chessboardjs@1.0.0/dist/chessboard-1.0.0.min.js'
];

// Figuren-Grafiken automatisch mitschützen
for (let p of ['wP','wR','wN','wB','wQ','wK','bP','bR','bN','bB','bQ','bK']) {
    urlsToCache.push(`https://chessboardjs.com/img/chesspieces/wikipedia/${p}.png`);
}

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
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
