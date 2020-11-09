// share page, with native app option
import { pageInfo } from './util';

(() => {

  // share available?
  const share = document.getElementById('intent');

  if (!share) return;

  // native sharing
  const shareapp = document.getElementById('shareapp');
  if (shareapp && navigator.share) {

    shareapp.addEventListener('click', e => {
      e.preventDefault();
      navigator.share( pageInfo() );
    });

    shareapp.classList.add('active');

  }

  // enable share block
  if (share) share.classList.add('active');

})();
