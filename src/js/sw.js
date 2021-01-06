/*
  service worker
*/
'use strict';

const
  domain = self.location.origin + '__root__',
  version = '__version__',
  CACHE = '__PWAcache__',
  offlineHTML = '__root__' + 'offline.html',
  offlineJSON = '__root__' + 'offline.json',

  installFilesEssential = [
    'index.json',
    'manifest.webmanifest',
    // 'css/critical.css', // required when testing offline PWA during development
    'css/main.css?' + version,
    'js/main.js?' + version,
  ].map(u => '__root__' + u).concat(offlineHTML, offlineJSON),

  installFilesDesirable = [
    '',
    'js/a.js?' + version,
    'images/icons/logo.svg'
  ].map(u => '__root__' + u);


// install event
self.addEventListener('install', event => {

  console.log('service worker: install');

  // cache core files
  event.waitUntil(
    cacheInstall()
      .then(() => self.skipWaiting())
  );

});


// activated event
self.addEventListener('activate', event => {

  console.log('service worker: activate');

  // delete old caches
  event.waitUntil(
    cacheClearOld()
      .then(() => self.clients.claim())
  );

});


// fetch event
self.addEventListener('fetch', event => {

  // abandon non-GET requests
  if (event.request.method !== 'GET') return;

  let url = event.request.url;

  event.respondWith(

    caches.open(CACHE)
      .then(cache => {

        return cache.match(event.request)
          .then(response => {

            console.log('cache', (response ? 'found  :' : 'missing:'), url);

            // make network request if not in cache or is HTML
            let network;
            if (!response) {

              network = fetch(event.request)
                .then(newreq => {

                  if (newreq && newreq.ok && url.startsWith(domain) && !url.includes('/browser-sync/')) {

                    // cache valid response
                    cache.put(event.request, newreq.clone());

                  }

                  return newreq;

                })
                // app is offline
                .catch(() => offlineAsset(url));

            }

            return response || network;

          });

      })

  );

});


// install static assets
function cacheInstall() {

  return caches.open(CACHE)
    .then(cache => {

      // cache desirable files
      cache.addAll(installFilesDesirable);

      // cache essential files
      return cache.addAll(installFilesEssential);

    });

}


// clear old caches
function cacheClearOld() {

  return caches.keys()
    .then(keylist => {

      return Promise.all(
        keylist
          .filter(key => key !== CACHE)
          .map(key => caches.delete(key))
      );

    });

}


// is image URL?
let iExt = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'svg'].map(f => '.' + f);
function isImage(url) {

  return iExt.some(ext => url.endsWith(ext));

}


// return offline asset
function offlineAsset(url) {

  if (isImage(url)) {

    // return image
    return new Response(
      '<svg role="img" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"><title>offline</title><path d="M0 0h400v300H0z" fill="#eee" /><text x="200" y="150" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="50" fill="#ccc">offline</text></svg>',
      {
        headers: {
          'Content-Type': 'image/svg+xml',
          'Cache-Control': 'no-store'
        }
      }
    );

  }
  else if (url.startsWith('https://www.optimalworks.')) {

    // return nothing for Ajax request
    return new Response(
      '',
      {
        headers: {
          'Content-Type': 'text/html',
          'Cache-Control': 'no-store'
        }
      }
    );

  }
  else if (url.endsWith('.json')) {

    // return page data
    return caches.match(offlineJSON);

  }
  else {

    // return page
    return caches.match(offlineHTML);

  }

}
