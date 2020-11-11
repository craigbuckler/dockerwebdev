// single page app functionality
// intercept inter-site links and replace with an Ajax request
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
    if (!link || link.origin !== location.origin || e.button || link.pathname.endsWith('.xml')) return;

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


  // load and render new page
  const
    title = document.head.querySelector('title'),
    main = document.body.querySelector('main'),
    menu = document.body.querySelector('nav.menu');

  let active = menu.querySelector('a.active');

  async function render(url, scrollTop) {

    progress(0.6);
    let data;

    try {

      // ajax fetch
      const call = await fetch(url + 'index.json');
      data = await call.json();

    }
    catch(e) {}

    progress(1);
    if (!data || !data.title || !data.main) {

      // redirect to page on failure
      location.assign(url);
      return;

    }

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

    // short delay for rendering to complete
    setTimeout(() => {

      // scroll to top
      if (scrollTop) window.scrollTo(0,0);

      // trigger viewload event
      document.dispatchEvent(
        new CustomEvent('viewload', { detail: { url }})
      );

    }, 10);

  }


  // progress loader
  let loader;
  function progress(pc = 0) {

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
