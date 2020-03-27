const cacheName = 'barcodepwa-v1';
const appShellFiles = [
    'index.html',
    'styles/barcode.css',
    'dist/app.js',
    'dist/barcode.js',
    'dist/zxing.js',
    'home512.png',
    'home192.png',
    'favicon.ico'
];
self.addEventListener('install', function (e) {
    console.log('[Service Worker] Install');
    e.waitUntil(caches.open(cacheName).then(function (cache) {
        console.log('[Service Worker] Caching all: app shell and content');
        return cache.addAll(appShellFiles);
    }));
});
//# sourceMappingURL=serviceworker.js.map