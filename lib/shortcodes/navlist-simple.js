// generates a page navigation list
/* global meta */

const
  listType    = 'ul',
  classActive = 'active';

// pass in collections.all | eleventyNavigation, page, and maximum depth level
module.exports = (pageNav, page, maxLevel = 999) => {

  let
    root = meta.root.slice(0, -1),
    nav = '';

  for (let entry of pageNav) {
    nav += navRecurse(entry);
  }

  return `<${ listType }>${ nav }</${ listType }>`;


  function navRecurse(entry, level = 1) {

    let
      active = (entry.url === page.url),
      childPages = '';

    if (level < maxLevel) {
      for (let child of entry.children) {
        childPages += navRecurse(child, level++);
      }
    }

    return (
      '<li>' +
      `<a href="${ root + entry.url }"` + (active ? ` class="${ classActive }"` : '') + '>' +
      entry.title +
      '</a>' +
      (childPages ? `<${ listType }>${ childPages }</${ listType }>` : '') +
      '</li>'
    );

  }

};
