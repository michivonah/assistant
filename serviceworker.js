this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1.1').then(function(cache) {
      return cache.addAll([
        '/assistant/',
        '/assistant/index.html',
        '/assistant/style.css',
        '/assistant/script.js',
        '/assistant/logo.png',
        '/assistant/new-message.mp3'
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
