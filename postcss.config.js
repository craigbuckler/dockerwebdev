// import site tokens
const variables = require('./lib/json').flatten( require('./site.json').token );

module.exports = (cfg) => {

  const productionMode = (cfg.env !== 'development');

  return {

    map: cfg.options.map,
    parser: cfg.file.extname === '.scss' ? 'postcss-scss' : false,
    plugins: [
      require('postcss-advanced-variables')({
        variables
      }),
      require('postcss-map-get')(),
      require('postcss-nested')(),
      require('postcss-assets')({
        basePath: 'content',
        loadPaths: ['images/']
      }),
      require('autoprefixer')(),
      productionMode ? require('cssnano')() : null
    ]

  };

};
