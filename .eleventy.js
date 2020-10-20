// Eleventy configuration

const
  // development mode
  dev = global.dev = (process.env.NODE_ENV === 'development'),

  // directories
  src = global.src = 'content',
  build = global.build = 'build',

  // meta data
  pkg = require('./package.json');


module.exports = config => {

  // site meta data
  const meta = require('./site.json');
  meta.version = pkg.version;
  meta.now = new Date();


  /* --- PASS-THROUGH COPY --- */

  config.addPassthroughCopy(`${src}/images/`);


  /* --- PLUGINS --- */

  // navigation
  config.addPlugin( require('@11ty/eleventy-navigation') );

  // RSS
  config.addPlugin( require('@11ty/eleventy-plugin-rss') );


  /* --- TRANSFORMS -- */

  // automatic image dimensions
  config.addTransform('imagesize', require('./lib/transforms/imagesize'));

  // inline assets
  config.addTransform('inline', require('./lib/transforms/inline'));

  // minify HTML
  config.addTransform('htmlminify', require('./lib/transforms/htmlminify'));


  /* --- FILTERS --- */

  // minify HTML
  config.addFilter('htmlminify', require('./lib/transforms/htmlminify'));

  // clean HTML (for feed)
  config.addFilter('htmlclean', require('./lib/filters/htmlclean'));

  // normalise strings
  config.addFilter('normalise', require('./lib/filters/util').normalise);

  // format dates
  const dateformat = require('./lib/filters/dateformat');
  config.addFilter('datefriendly', dateformat.friendly);
  config.addFilter('dateymd', dateformat.ymd);

  // format word count and reading time
  config.addFilter('readtime', require('./lib/filters/readtime'));


  /* --- SHORTCODES --- */

  // meta data
  config.addShortcode('meta', name => meta[name] || '');

  // page navigation
  config.addShortcode('navlist', require('./lib/shortcodes/navlist'));


  /* --- CUSTOM COLLECTIONS --- */

  // post collection (in src/articles)
  config.addCollection('post', collection =>

    collection
      .getFilteredByGlob(`./${src}/articles/*.md`)
      .filter(p => dev || (!p.data.draft && p.date <= meta.now))

  );

  // create list of all tags
  config.addCollection('taglist', collection => {

    let tagSet = new Set();

    collection.getAll().forEach(page =>

      (page.data.tags || [])
        .filter(tag => tag !== 'all' && tag !== 'undefined')
        .map(tag => tagSet.add( tag ))

    );

    return [...tagSet].sort((a, b) => a.toLowerCase() > b.toLowerCase() ? 1 : -1);

  });


  /* --- BROWSERSYNC OPTIONS --- */

  config.setBrowserSyncConfig({
    files: [
      `${build}/**/*`
    ],
    notify: false
  });


  // 11ty defaults
  return {

    dir: {
      input: src,
      output: build
    },

    templateFormats: ['md', 'njk'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',

    pathPrefix: meta.root

  };

};
