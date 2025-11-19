// ======================================================
// SERVICE WORKER - PWA (Manual, optimizada para Vite)
// ======================================================

const VERSION = "__APP_VERSION__";
const STATIC_CACHE = `static-cache-${VERSION}`;
const DYNAMIC_CACHE = `dynamic-cache-${VERSION}`;

const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/pwa-192x192.png",
  "/pwa-512x512.png",
];

// ======================================================
// INSTALL - precachea assets estáticos
// ======================================================
self.addEventListener("install", (event) => {
  self.skipWaiting(); // Instala sin esperar
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

// ======================================================
// ACTIVATE - limpia caches viejos
// ======================================================
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key !== STATIC_CACHE && key !== DYNAMIC_CACHE)
            .map((key) => caches.delete(key))
        )
      )
  );
  self.clients.claim(); // Toma control inmediato
});

// ======================================================
// FETCH - estrategia híbrida dependiendo del recurso
// ======================================================
self.addEventListener("fetch", (event) => {
  const req = event.request;
  const url = new URL(req.url);

  // 1) APIs → Network First
  if (url.pathname.startsWith("/api")) {
    return event.respondWith(networkFirst(req));
  }

  // 2) Archivos estáticos de Vite → Cache First
  if (
    req.destination === "style" ||
    req.destination === "script" ||
    req.destination === "image" ||
    req.destination === "font"
  ) {
    return event.respondWith(cacheFirst(req));
  }

  // 3) Todo lo demás → Cache First fallback
  event.respondWith(cacheFirst(req));
});

// ======================================================
// Estrategia: NETWORK FIRST (ideal APIs)
// ======================================================
async function networkFirst(req) {
  try {
    const fresh = await fetch(req);
    const clone = fresh.clone();

    const cache = await caches.open(DYNAMIC_CACHE);
    cache.put(req, clone);

    return fresh;
  } catch (err) {
    const cached = await caches.match(req);
    return cached || new Response("Offline", { status: 503 });
  }
}

// ======================================================
// Estrategia: CACHE FIRST (ideal recursos estáticos)
// ======================================================
async function cacheFirst(req) {
  const cached = await caches.match(req);
  if (cached) return cached;

  try {
    const fresh = await fetch(req);
    const clone = fresh.clone();

    const cache = await caches.open(DYNAMIC_CACHE);
    cache.put(req, clone);

    return fresh;
  } catch (err) {
    return caches.match("/index.html");
  }
}
