const CACHE = 'dynamick-shell-v6';
const SHELL = [
  './',
  './index.html',
  './app.html',
  './entrar.html',
  './inicio.html',
  './conteudos.html',
  './praticar.html',
  './sessao.html',
  './revisar.html',
  './simulados.html',
  './enems.html',
  './redacao.html',
  './metodos.html',
  './buscar.html',
  './catalogo.html',
  './perfil.html',
  './offline.html',
  './manifest.json',
  './css/tokens.css',
  './css/loader.css',
  './css/base.css',
  './css/components.css',
  './css/landing.css',
  './css/app.css',
  './assets/fontes/work-sans-latin.woff2',
  './assets/fontes/work-sans-latin-ext.woff2',
  './assets/fontes/work-sans-italico-latin.woff2',
  './assets/fontes/fraunces-latin.woff2',
  './assets/brand/favicon.png',
  './assets/brand/favicon.svg',
  './assets/brand/logo-dynamic.webp',
  './assets/brand/logo-dynamic.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(async () => (await caches.match(request)) || caches.match('./offline.html')),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const fresh = fetch(request)
        .then((response) => {
          if (response.ok) caches.open(CACHE).then((cache) => cache.put(request, response.clone()));
          return response;
        })
        .catch(() => cached);
      return cached || fresh;
    }),
  );
});
