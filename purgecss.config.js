// PurgeCSS configuration
const build = './build/';

module.exports = {

  content: [`${build}**/*.html`, `${build}**/*.js`],
  safelist: [],
  css: [`${build}css/*.css`],
  output: `${build}css/`,

  fontFace: true,
  keyframes: true,
  variables: true

};
