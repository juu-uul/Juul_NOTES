/**
 * Service Worker - Juul_NOTES
 * Version: 11.2.1
 * Gestion de la mise en cache hors-ligne : pré-mise en cache des briques JS (app, db, ui, sync, auth, modal, icons, supabase-client, sw-update, version, mobile-keyboard),
 * des dépendances (SortableJS inclus dans le bundling/fetch), des styles CSS et des assets PWA.
 */
"use strict";

const CACHE_NAME = 'juul-notes-v11.2.1';

// Liste des ressources essentielles à pré-cacher lors de l'installation
const ESSENTIAL_ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './assets/index-Cstju1R0.js',
  './assets/index-DXLdT7cd.css',
  './icons/icon72.png',
  './icons/icon192.png',
  './icons/icon512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      console.log('SW : Mise en cache initiale des ressources (v11.2.1)');
      for (const asset of ESSENTIAL_ASSETS) {
        try {
          await cache.add(asset);
        } catch (err) {
          console.warn(`SW : Impossible de pré-cacher ${asset}:`, err);
        }
      }
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.action === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('SW : Nettoyage de l\'ancien cache', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  
  // Ignorer les requêtes non-HTTP/HTTPS (ex: data: URIs, extensions, blobs)
  if (!event.request.url.startsWith('http://') && !event.request.url.startsWith('https://')) return;

  // Ne pas mettre en cache les requêtes API Supabase
  if (event.request.url.includes('supabase.co')) return;

  // Traitement Stale-While-Revalidate pour les scripts JS, CSS, images et document HTML
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && (networkResponse.status === 200 || networkResponse.type === 'opaque')) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch((err) => {
          console.log(`SW : Mode hors-ligne pour ${event.request.url}`, err);
          return cachedResponse;
        });

      return cachedResponse || fetchPromise;
    })
  );
});
