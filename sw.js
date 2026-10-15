/* FitBros offline shell cache. Keep this file at the site root. */
const CACHE_PREFIX = 'fitbros-shell-';
const CACHE_NAME = CACHE_PREFIX + '20261015-recovery-balanced-v3';
const APP_SHELL = [
  './', './index.html', './cementfit.html', './cementfit-product.html', './style.css?v=20261015jointchallenge-joint-challenges-workout-tab', './app.js?v=20261015jointchallengerecovery-balanced-v3',
  './supabase-config.js', './touch-feedback.js?v=20261015live-search-fix2', './settings.html',
  './settings.js', './foods.json', './icon.png', './cementfit-logo.png', './background.png', './manifest.webmanifest'
];
self.addEventListener('install', event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.all(APP_SHELL.map(async path => {
      try { await cache.add(new Request(path, {cache:'reload'})); } catch (_) { /* optional asset */ }
    }));
    await self.skipWaiting();
  })());
});
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith(CACHE_PREFIX) && k !== CACHE_NAME).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // Navigation: try the network first so deployed updates appear, then fall back to the saved app.
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const response = await fetch(req);
        if (response && response.ok && url.origin === self.location.origin) {
          const cache = await caches.open(CACHE_NAME); cache.put('./index.html', response.clone());
        }
        return response;
      } catch (_) {
        return (await caches.match(req)) || (await caches.match('./index.html')) || new Response(
          '<!doctype html><html lang="ar" dir="rtl"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>FitBros</title><body style="background:#090909;color:white;font-family:sans-serif;padding:24px;text-align:center"><h2>FitBros</h2><p>جاري فتح النسخة المحفوظة…</p><script>location.replace("./index.html")</script></body></html>',
          {headers:{'Content-Type':'text/html; charset=utf-8'}}
        );
      }
    })());
    return;
  }
  // Cache-first for same-origin app files; stale-while-revalidate for external GET assets (CDNs/fonts).
  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(req);
    if (url.origin === self.location.origin) {
      if (cached) return cached;
      try { const res = await fetch(req); if (res.ok) cache.put(req, res.clone()); return res; }
      catch (_) { return cached || Response.error(); }
    }
    try {
      const res = await fetch(req);
      if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone()).catch(()=>{});
      return res;
    } catch (_) { return cached || Response.error(); }
  })());
});
