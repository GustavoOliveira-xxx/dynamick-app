const CACHE = 'dynamick-shell-v7';
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

async function guardarShell() {
  const cache = await caches.open(CACHE);
  await Promise.all(
    SHELL.map(async (caminho) => {
      try {
        const resposta = await fetch(caminho, { cache: 'reload' });
        if (resposta.ok && !resposta.redirected) await cache.put(caminho, resposta);
      } catch {

      }
    }),
  );
}

self.addEventListener('install', (event) => {
  event.waitUntil(guardarShell().then(() => self.skipWaiting()));
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
  if (url.pathname.startsWith('/api/')) return;

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

  if (/\.(?:js|mjs|css)$/.test(url.pathname)) {
    event.respondWith(
      fetch(request, { cache: 'reload' })
        .then((response) => {
          if (response.ok && !response.redirected) {
            const copia = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copia));
          }
          return response;
        })
        .catch(async () => (await caches.match(request)) || Response.error()),
    );
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const fresh = fetch(request)
        .then((response) => {
          if (response.ok && !response.redirected) {
            const copia = response.clone();
            caches.open(CACHE).then((cache) => cache.put(request, copia));
          }
          return response;
        })
        .catch(() => cached);
      return cached || fresh;
    }),
  );
});
