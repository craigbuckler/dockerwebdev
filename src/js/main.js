import * as dom from './lib/dom';
import * as util from './lib/util';

(() => {

  const a = 'Craig Buckler';
  console.log( util.normalise(a + '!') );

  const i = dom.id('test');
  if (i) i.textContent = 'started';


})();
