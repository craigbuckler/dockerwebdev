// single page app functionality
// intercept inter-site links and replace with an Ajax call
import * as ajax from './ajax';

(() => {

  if (!window.history) return;

  // current page history
  history.replaceState({ url: location.pathname }, '', location.pathname);

  // events
  document.body.addEventListener('click', navLink);
  document.body.addEventListener('mousedown', navLink);
  window.addEventListener('popstate', navEvent);


  // internal page link clicked?
  function navLink(e) {

    const link = e && e.target && e.target.closest('a');
    if (!link || link.origin !== location.origin) return;

    // load different page
    const url = link.pathname;

    if (url === location.pathname) {
      if (!link.hash) e.preventDefault();
    }
    else {

      e.preventDefault();

      history.pushState({ url }, '', url);
      render(url, true);

    }

  }


  // navigation event
  function navEvent(e) {

    if (e && e.state && e.state.url) render(e.state.url);

  }


  // render a new page
  const
    title = document.head.querySelector('title'),
    main = document.body.querySelector('main'),
    menu = document.body.querySelector('nav.menu');

  let call, active = menu.querySelector('a.active');

  function render(url, scrollTop) {

    // cancel existing call
    if (call) {
      call.abort();
      call = null;
    }

    call = ajax.get({ url: url + 'index.json', callback, progress });

    // complete callback
    function callback(err, urlJSON, data) {

      call = null;
      if (err || !data || !data.title || !data.main) {

        // redirect to page on failure
        location.assign(url);

      }
      else {

        // render content
        title.innerHTML = data.title;
        main.innerHTML = data.main;

        // update menu
        if (active) active.classList.remove('active');
        active = menu.querySelector(`[href="${url}"]`);
        if (active) {
          active.classList.add('active');
          active.blur();
        }

        // trigger viewload event
        document.dispatchEvent(
          new CustomEvent('viewload', { detail: { url }})
        );

        // scroll to top
        if (scrollTop) setTimeout(() => { window.scrollTo(0,0); }, 10);

      }

    }

  }


  // create a progress loader
  let loader;
  function progress(p) {

    let pc = p ? p.loaded / p.total : 0;

    if (!loader) {

      let p = document.createElement('div');
      p.id = 'loader';
      loader = document.body.appendChild(p);

    }

    loader.style.transform = `scaleX(${pc})`;
    if (pc >= 1) setTimeout(() => {
      loader.style.transform = 'scaleX(0)';
    }, 400);

  }

})();
