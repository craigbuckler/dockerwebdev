module.exports = (ctx) => {

  return {

    map: ctx.options.map,
    parser: ctx.file.extname === '.scss' ? 'postcss-scss' : false,
    plugins: [
      require('postcss-advanced-variables')(),
      require('postcss-map-get')(),
      require('postcss-nested')(),
      require('postcss-assets')({
        basePath: 'src',
        loadPaths: ['images']
      }),
      require('cssnano')()
    ]

  };

};
