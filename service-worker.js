const cacheName = "toy-haven-v1";
const filesToCache = [
    "index.html",
    "products.html",
    "cart.html",
    "checkout.html",
    "wishlist.html",
    "feedback.html",
    "style.css",
    "script.js"
];
self.addEventListener("install", function (event) {
    event.waitUntil(
        caches.open(cacheName)
            .then(function (cache) {
                return cache.addAll(filesToCache);
            })
    );
});
self.addEventListener("fetch", function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                return response ||
                    fetch(event.request);
            })
    );
});