self.addEventListener('push', event => {
  event.waitUntil(
    self.registration.showNotification('Testbenachrichtigung', {
      body: 'Diese Benachrichtigung können sie löschen und wird nicht weiter benötigt.',
      icon: 'https://michivonah.github.io/assistant/logo.png',
      tag: 'notification'
    });
  );
});
