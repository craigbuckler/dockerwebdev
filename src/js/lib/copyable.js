// clipboard copy
import { pageInfo, tokenReplace } from './util';

(() => {

  if (!document.queryCommandSupported('copy')) return;

  const cfg = {
    class:    'copyable',
    active:   'active',
    done:     'done',
    datacopy: 'copyable'
  };

  // enable copy links
  window.addEventListener('load', copyInit);
  document.addEventListener('viewload', copyInit);

  function copyInit() {

    Array.from( document.querySelectorAll(`.${ cfg.class }:not(.${ cfg.active })`) )
      .forEach(a => a.classList.add(cfg.active));

  }

  // handle copy links
  document.body.addEventListener('click', copyLink);

  function copyLink(e) {

    const
      link = e && e.target,
      value = link && link.dataset[cfg.datacopy];

    if (value === null) return;

    // find or create associated field
    let field, input;

    if (value) {
      input = document.createElement('input');
      input.value = tokenReplace(value, pageInfo());
      field = document.body.appendChild(input);
    }
    else if (link.htmlFor) {
      field = document.getElementById(link.htmlFor);
    }

    if (!field) return;

    // copy value to clipboard
    let copied = false;

    if (field.select && field.value) {

      // form input
      field.select();
      try {
        document.execCommand('copy');
        copied = true;
      }
      catch (err) {}

    }
    else if (window.getSelection) {

      // DOM element
      try {
        var range = document.createRange();
        range.selectNode(field);
        window.getSelection().addRange(range);
        document.execCommand('copy');
        copied = true;
      }
      catch(err) {}

    }

    if (!copied) return;

    e.preventDefault();

    // remove input
    if (input) document.body.removeChild(field);

    // show/hide indicator
    link.onanimationend = () => link.classList.remove(cfg.done);
    link.classList.add(cfg.done);

  }


})();
