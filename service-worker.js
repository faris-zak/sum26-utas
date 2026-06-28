const CACHE_NAME = "smart-student-guide-v2";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./demo.html",
  "./technology.html",
  "./impact.html",
  "./styles.css?v=20260628",
  "./app.js?v=20260628",
  "./content/data.js?v=20260628",
  "./src/demo-engine.js?v=20260628",
  "./manifest.webmanifest",
  "./assets/images/student-journey.webp",
  "./assets/images/contextual-rag.webp",
  "./assets/images/icon-192.png",
  "./assets/images/icon-512.png",
  "./assets/fonts/Tajawal-Regular.ttf",
  "./assets/fonts/Tajawal-Medium.ttf",
  "./assets/fonts/Tajawal-Bold.ttf",
  "./assets/fonts/NotoSans-Regular.ttf",
  "./assets/fonts/NotoSans-Bold.ttf",
  "./assets/vendor/lucide.min.js",
  "./assets/vendor/qrcode.min.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET" || new URL(event.request.url).origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(event.request, { ignoreSearch: true });
          return cached || caches.match("./index.html");
        })
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      }
      return response;
    }))
  );
});
