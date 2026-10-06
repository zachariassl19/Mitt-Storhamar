const BASE = '/Mitt-Storhamar/';
const CACHE = 'mitt-storhamar-v3';
const CORE = [BASE, `${BASE}manifest.webmanifest`, `${BASE}icon.svg`];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(CORE)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request).then((cached) => cached || caches.match(BASE)))
  );
});

self.addEventListener('push', (event) => {
  let payload = {};
  try {
    payload = event.data?.json() || {};
  } catch {
    payload = { body: event.data?.text() || '' };
  }

  const title = payload.title || 'Mitt Storhamar';
  const body = payload.body || 'Du har et nytt varsel.';
  const tag = payload.tag || 'mitt-storhamar-push';
  const icon = payload.icon || `${BASE}icon.svg`;
  const url = payload.url || BASE;

  event.waitUntil(
    self.registration.showNotification(title, {
      body,
      tag,
      icon,
      badge: icon,
      data: { url },
      renotify: Boolean(payload.renotify),
    })
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const target = event.notification.data?.url || BASE;
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clients) => {
      const existing = clients.find((client) => client.url.includes(BASE));
      if (existing) return existing.focus();
      return self.clients.openWindow(target);
    })
  );
});
