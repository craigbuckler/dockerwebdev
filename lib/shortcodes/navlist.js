// generates a page navigation list
const
  listType    = 'ul',
  classActive = 'active',
  classOpen   = 'open',
  classSub    = 'submenu';

// pass in collections.all | eleventyNavigation, page, and maximum depth level
module.exports = (pageNav, page, maxLevel = 999) => {

  let nav = '';
  for (let entry of pageNav) {
    nav += navRecurse(entry);
  }

  return `<${ listType }>${ nav }</${ listType }>`;


  function navRecurse(entry, level = 1) {

    let
      active = (entry.url === page.url),
      childPages = '',
      classList = [];

    if (level < maxLevel) {
      for (let child of entry.children) {
        childPages += navRecurse(child, level++);
      }
    }

    if (active) classList.push(classActive);
    if ((active && childPages) || childPages.includes(classActive)) classList.push(classOpen);

    return (
      '<li>' +
      (childPages ? `<span class="${classSub}">sub-menu</span>` : '') +
      `<a href="${ entry.url }"` + (classList.length ? ` class="${ classList.join(' ') }"` : '') + '>' +
      entry.title +
      '</a>' +
      (childPages ? `<${ listType }>${ childPages }</${ listType }>` : '') +
      '</li>'
    );

  }

};
