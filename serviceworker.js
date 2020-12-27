this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
        '/assistant/',
        '/index.html',
        '/style.css',
        '/script.js',
        '/logo.png',
        '/new-message.mp3'
      ]);
    })
  );
});

this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).catch(function() {
      return fetch(event.request);
    })
  );
});
