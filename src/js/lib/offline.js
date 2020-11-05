// populate offline pages available
document.addEventListener('viewload', async() => {

  const list = document.getElementById('__offlinepages__');
  if (!list) return;

  const
    CACHE = '__PWAcache__',
    invalidURL = [
      '/404',     // not found
      '/offline'  // offline
    ],

    // all caches
    cacheAll = await caches.keys(),

    // match cache, get latest
    cacheList = cacheAll
      .filter(cName => cName.includes(CACHE))
      .sort((a, b) => a - b),

    // open cache
    cache = await caches.open(cacheList[0]),

    // get response keys
    keyList = await cache.keys(),

    // filter and sort valid responses
    reqList = keyList
      .filter(req => req.url.endsWith('.json') && invalidURL.every(u => !req.url.includes(u)))
      .sort(),

    // fetch cached items
    matchList = await Promise.allSettled(
      reqList.map( req => cache.match(req) )
    ),

    // get text
    bodyList = await Promise.allSettled(
      matchList.map( match => match.value && match.value.json() )
    ),

    // extract titles
    titleList = bodyList
      .map( body => (body.value && body.value.title) || null),

    // URL formatting
    origin = window.location.origin,
    reFilename = /[^/]+$/,

    // DOM update
    frag = document.createDocumentFragment();

  // build link list
  reqList.forEach((req, idx) => {

    const title = titleList[idx];
    if (!title) return;

    const
      url = req.url.replace(origin, '').replace(reFilename, ''),
      li = document.createElement('li'),
      a = li.appendChild( document.createElement('a') );

    a.setAttribute('href', url);
    a.innerHTML = title;
    frag.appendChild(li);

  });

  // append list to DOM
  list.appendChild(frag);

});
