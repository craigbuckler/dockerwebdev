// clipboard copy
import { pageInfo, tokenReplace } from './util';

(() => {

  if (!document.queryCommandSupported('copy')) return;

  const cfg = {
    copyable:   ['pre', '.copyable'],
    codetext:   'copy',
    codeclass:  'copycode icon copy',
    codedone:   'code copied',
    active:     'active',
    done:       'done',
    datacopy:   'copyable'
  };

  // enable copy links
  window.addEventListener('load', copyInit);
  document.addEventListener('viewload', copyInit);

  // handle copy links
  document.body.addEventListener('click', copyLink);


  // activate copy links
  function copyInit() {

    cfg.copyable.forEach(s => {

      Array.from( document.querySelectorAll(`${ s }:not(.${ cfg.active })`) )
        .forEach(a => {

          a.classList.add(cfg.active);

          if (!s.startsWith('.')) {
            const codeCopy = document.createElement('div');
            codeCopy.dataset[cfg.datacopy] = '#';
            codeCopy.dataset[`${ cfg.datacopy }Done`] = cfg.codedone;
            codeCopy.className = cfg.codeclass;
            codeCopy.textContent = cfg.codetext;
            a.insertAdjacentElement('afterend', codeCopy);
          }

        });

    });

  }

  // copy value or input field
  function copyLink(e) {

    const
      link = e && e.target,
      value = link && link.dataset[cfg.datacopy];

    if (value === null) return;

    // find or create associated field
    let field, input;

    if (value === '#') {

      // copy code block
      field = link.previousSibling;


    }
    else if (value) {

      // copy a specific value
      input = document.createElement('input');
      input.value = tokenReplace(value, pageInfo());
      field = document.body.appendChild(input);

    }
    else if (link.htmlFor) {

      // copy a form field
      field = document.getElementById(link.htmlFor);

    }

    // copy
    const copied = field && copy(field);

    // remove input
    if (input) document.body.removeChild(field);

    if (copied) {

      e.preventDefault();

      // show/hide success indicator
      link.addEventListener('animationend', () => link.classList.remove(cfg.done), { once: true });
      link.classList.add(cfg.done);
    }

  }


  // copy value to clipboard
  function copy(field) {

    let copied = true;

    try {

      if (field.select && field.value) {

        // form input
        field.select();
        document.execCommand('copy');

      }
      else if (window.getSelection) {

        // DOM element
        const range = document.createRange();
        range.selectNode(field);
        window.getSelection().addRange(range);
        document.execCommand('copy');
        range.collapse();

      }

    }
    catch(e) {
      copied = false;
      console.log('copy failed', e);
    }

    return copied;

  }


})();
