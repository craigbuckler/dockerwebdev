// parse email addresses
Array.from(document.querySelectorAll('a.email'), e => {

  const
    em = e.textContent,
    es = em.replace(/\sdot\s/ig, '.').replace(/\{at\}/ig,'@').replace(/\s/g,'');

  console.log(em, es);

  if (em !== es) {
    e.href = `mailto:${es}`;
    e.textContent = es;
  }

});
