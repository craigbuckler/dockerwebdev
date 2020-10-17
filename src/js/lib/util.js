// utility library

const reNorm = /\W/g;

// normalise a string
// no non-word characters and convert to lowercase
export function normalise(str) {
  return String(str).replace(reNorm, '').toLowerCase();
}



// thottle event: call no more than every delay
export function eventThrottle(attachTo, event, callback, delay = 300) {

  let throttle;

  attachTo.addEventListener(event, e => {

    throttle = throttle || setTimeout(() => {
      throttle = null;
      callback(e);
    }, delay);

  }, false);

}

// debounce event: call after same event has stopped for delay
export function eventDebounce(attachTo, event, callback, delay = 300) {

  let debounce;

  attachTo.addEventListener(event, e => {

    clearTimeout(debounce);
    debounce = setTimeout(() => callback(e), delay);

  }, false);

}
