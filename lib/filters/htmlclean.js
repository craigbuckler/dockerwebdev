// clean HTML for feed
// remove all attributes except for those on links and images
module.exports = html => {

  return html
    .replace(/<script.*<\/script>/ig, '')
    .replace(/<style.*<\/style>/ig, '')
    .replace(/<iframe.*<\/iframe>/ig, '')
    .replace(/inline[\s='"]*/ig, '')
    .replace(/<((?!a|img)\w+\d*)\s[^>]+?>/ig, '<$1>')
    .replace(/<\/{0,1}(div|span|section|article|aside|header|footer|nav)>/ig, '');

};
