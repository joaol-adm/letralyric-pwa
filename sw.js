self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("static").then((cache) =>
      cache.addAll(["./", "./index.html", "./app.js", "./manifest.json", "./icon-192.png"])
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
