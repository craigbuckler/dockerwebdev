// clean HTML for feed
// remove all attributes except for those on links and images
module.exports = html => {

  return html
    .replace(/<script.*<\/script>/ig, '')
    .replace(/<style.*<\/style>/ig, '')
    .replace(/<iframe.*<\/iframe>/ig, '')
    .replace(/<((?!a|img)\w+)[^>]+?>/ig, '<$1>');

};
