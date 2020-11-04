(() => {

  // load service worker
  if ('serviceWorker' in navigator) {

    navigator.serviceWorker.register('__root__' + 'sw.js');

  }

  // add to home screen
  const install = document.getElementById('install');

  if (!install) return;

  const active = 'active';
  let deferredPrompt;

  // PWA can be installed
  window.addEventListener('beforeinstallprompt', e => {

    e.preventDefault();
    deferredPrompt = e;
    install.classList.add(active);

  });

  // install click
  install.querySelector('a').addEventListener('click', e => {

    e.preventDefault();
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    deferredPrompt.userChoice
      .then(function(choice) {
        if (choice.outcome === 'accepted') {
          console.log('PWA installed');
          install.classList.remove(active);
        }
        deferredPrompt = null;
      });

  });

})();
