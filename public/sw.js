/**
 * Service Worker — InfoHub UEMG Carangola
 * Cache do App Shell e suporte à instalação PWA
 */

const CACHE_NAME = 'infohub-uemg-shell-v1';

const APP_SHELL_ASSETS = [
  '/',
  '/index.html',
  '/manifest.webmanifest',
  '/src/css/style.css',
  '/src/js/main.js',
  '/src/js/services-data.js',
  '/images/logo_uemg.png',
  '/images/logo_uemg_2.jpg',
  '/images/UEMG-fachada-1.jpg',
  '/images/icon-pwa.svg'
];

// Instalação: Cache dos arquivos essenciais da casca da aplicação
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(APP_SHELL_ASSETS);
      })
      .then(() => self.skipWaiting())
      .catch((err) => {
        console.warn('[ServiceWorker] Falha ao pré-carregar cache inicial:', err);
      })
  );
});

// Ativação: Limpeza de caches obsoletos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== CACHE_NAME) {
              return caches.delete(cache);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Interceptação de requisições: Estratégia Stale-While-Revalidate para a mesma origem
self.addEventListener('fetch', (event) => {
  // Ignora requisições para origens externas (links dos setores discentes)
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  // Apenas métodos GET são cacheados
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Em caso de falha de rede total, retorna o cache correspondente ou a raiz
          return cachedResponse || caches.match('/index.html');
        });

      return cachedResponse || fetchPromise;
    })
  );
});
