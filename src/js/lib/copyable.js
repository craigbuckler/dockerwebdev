// clipboard copy
import { pageInfo, tokenReplace } from './util';

(() => {

  if (!navigator.clipboard) return;

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
  async function copyLink(e) {

    const
      link = e && e.target,
      value = link && link.dataset[cfg.datacopy];

    if (value === null) return;

    // find or create associated field
    let copyText, copied;

    if (value === '#') {

      // copy code block
      copyText = link.previousSibling.innerText;

    }
    else if (value) {

      // copy specific value
      copyText = tokenReplace(value, pageInfo());

    }
    else if (link.htmlFor) {

      // copy a form field
      copyText = document.getElementById(link.htmlFor).value;

    }

    if (!copyText) return;

    e.preventDefault();

    try {
      await navigator.clipboard.writeText(copyText);
      copied = true;
    } catch (err) {
      console.log('copy failed', err);
    }

    if (copied) {
      // show/hide success indicator
      link.addEventListener('animationend', () => link.classList.remove(cfg.done), { once: true });
      link.classList.add(cfg.done);
    }

  }


})();
