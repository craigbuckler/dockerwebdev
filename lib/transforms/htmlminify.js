// minify HTML
/* global dev */
const htmlmin = require('html-minifier');

module.exports = (content, outputPath = '.html') => {

  if (!String(outputPath).endsWith('.html')) return content;

  // development: strip white space only
  if (dev) return content.trim().replace(/(\s*\n\s*)+/g, '\n');

  // production: full minify
  return htmlmin.minify(content, {
    useShortDoctype: true,
    removeComments: true,
    collapseWhitespace: true
  });

};
