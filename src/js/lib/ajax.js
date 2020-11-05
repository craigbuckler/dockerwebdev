export function get({ url, timeout = 10000, callback, progress }) {

  return call('GET', url, null, timeout, callback, progress);

}


// make XMLHttpRequest
function call(method, url, data, timeout, callback = (() => {}), progress = (() => {})) {

  console.log(`Ajax ${ method }: ${ url }`);

  let
    req,
    ptime = +new Date(),
    complete = false,
    ret = null;

  req = new XMLHttpRequest();
  req.open(method, url);
  req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  // progress handler
  req.onprogress = p => {
    ptime = +new Date();
    progress({ loaded: p.loaded, total: p.total });
  };

  // state change
  req.onreadystatechange = () => {

    if (req.readyState != 4) return;

    complete = true;
    const err = (req.status !== 200);

    if (!err) {
      try {
        ret = JSON.parse(req.response);
      }
      catch(e) {
        ret = req.response || null;
      }
    }

    callback(err, url, ret);

  };

  // start request
  req.send(data);

  // timeout
  function timeoutCheck() {

    // request ended?
    if (complete) return;

    // recheck later
    if ((+new Date() - ptime) < timeout) setTimeout(timeoutCheck, 2000);
    else {

      // abort request
      complete = true;
      req.abort();
      callback('TIMEOUT', url, null);

    }

  }
  timeoutCheck();

  // return abort method
  return req;

}
