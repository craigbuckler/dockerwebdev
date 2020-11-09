# DockerWebDev.com

["Docker for Web Developers" book and video course website](https://dockerwebdev.com/).

Built as an Eleventy static site with PostCSS and Rollup.js processing.

Settings and design tokens in `site.json`.

Run in development mode:

```sh
npm start
```

Build production site:

```sh
npm run build
```

## Syntax highlighting

JavaScript example which highlights lines 1, 2, and 3:

```md
```js/0-2
// code
```

Syntax highlighting is handled with Prism styles.

Line numbers continue unless an `H2` tag or explicit `--linestart` custom property is set, e.g.

```html
<p style="--linestart:29">The next code snippet starts at line 30:</p>
```


## CSS processing

Build critical and main CSS files using PostCSS:

* `npm run watch:cst && npm run watch:css` - development mode with source maps
* `npm run build:cst && npm run build:css` - production mode

Optionally, `npm run purge:css` can be run to remove unused styles.

Tokens are imported from the `"token"` object in `site.json` and set as Sass variables. Nested properties are flattened, e.g.

```json
"theme": { "back": "#000", "fore": "#FFF" }
```

becomes the variables `$theme_back` and `$theme_fore`.

PostCSS permits Sass-like SCSS syntax including:

* `@import '_partial';`
* `$variable: 'value';`
* `$map: ('small':10em,'medium':20em,'large':30em);` and `map-get($map, 'small'));`
* image `resolve(img)`, `width(img)`, `height(img)`, `size(img)`, `inline(img)`
* selector nesting
* source maps are output in development mode

The resulting file is minified using cssnano.

PostCSS configuration defined in `postcss.config.js`.


## JavaScript processing

Build all script files using Rollup.js:

* `npm run watch:js` - development mode with source maps
* `npm run build:js` - production mode

Rollup.js performs tree-shaking and minification.

Third-party `npm` scripts can be imported, e.g.

```sh
npm i revealer.js
```

Then imported in any script:

```js
import 'revealer.js';
```

The `browser` script from the module is used.


## Image compression

Images can be compression once using `npm run image:all` to process all images in `src/images.orig` to `src/images` (the directory structure is flattened).

Minify images once only, e.g. for JPGs:

```sh
imagemin ./src/images.orig/**/*.jpg --plugin=mozjpeg --out-dir=./content/images
```

or individually, e.g. convert a PNG to webp format:

```sh
imagemin ./src/images.orig/image.png --plugin=webp > ./content/images/image.webp
```

[`imagemin-cli`](https://www.npmjs.com/package/imagemin-cli) and plugins are installed globally:

```sh
npm i -g imagemin-cli imagemin-pngquant imagemin-mozjpeg imagemin-svgo imagemin-webp
```
