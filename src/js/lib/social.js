// social sharing links
import { pageInfo, tokenReplace } from './util';

(() => {

  const
    cfg = {
      name:   'social',
      width:  600,
      height: 600,
      margin: 20
    };

  document.body.addEventListener('click', e => {

    // is a social link?
    let t = e.target, url = t.href;
    if (!url || !t.classList.contains(cfg.name)) return;

    // stop link
    e.preventDefault();

    // replace tokens
    url = tokenReplace(url, pageInfo(), true);

    // ignore non-browser protocols
    let popup;
    if ((t.protocol || 'http').includes('http')) {

      // open popup
      const
        sw = screen.availWidth || 1024,
        sh = screen.availHeight || 700,
        pw = Math.min(cfg.width, (sw - cfg.margin * 2)),
        ph = Math.min(cfg.height, (sh - cfg.margin * 2)),
        px = Math.floor((sw - pw) / 2),
        py = Math.floor((sh - ph) / 2);

      popup = window.open(
        url,
        cfg.name,
        'width=' + pw +
        ',height=' + ph +
        ',left=' + px +
        ',top=' + py +
        ',location=0,menubar=0,toolbar=0,personalbar=0,status=0,scrollbars=1,resizable=1'
      );

    }

    if (popup) popup.focus();
    else location.assign(url);

  });

})();
