// minify HTML
/* global dev */
const htmlmin = require('html-minifier');

module.exports = (content, outputPath = '.html') => {

  if (!String(outputPath).endsWith('.html')) return content;

  // development: strip white space only
  if (dev) return content.trim().replace(/(\s*\n\s*)+/g, '\n');

  // production: full minify
  return htmlmin.minify(content, {
    collapseBooleanAttributes: true,
    collapseWhitespace: true,
    decodeEntities: true,
    minifyCSS: true,
    minifyJS: false,
    preventAttributesEscaping: true,
    removeAttributeQuotes: true,
    removeComments: true,
    removeEmptyAttributes: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true,
  });

};
