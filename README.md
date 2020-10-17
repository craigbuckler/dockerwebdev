# DockerWebDev.com

[DockerWebDev.com website](https://dockerwebdev.com/) - eleventy static site.

Run in development mode:

```sh
npm run dev
```

## PostCSS setup

Commands:

* `npm run watch:css` - development mode with source maps
* `npm run build:css` - production mode

Permits Sass-like SCSS syntax including:

* `@import '_partial';`
* `$variable: 'value';`
* `$map: ('small':10em,'medium':20em,'large':30em);` and `map-get($map, 'small'));`
* image `resolve(img)`, `width(img)`, `height(img)`, `size(img)`, `inline(img)`
* selector nesting
* source maps in development mode

The resulting file is minified using cssnano.

PostCSS configuration defined in `postcss.config.js`.


## Rollup.js setup

Commands:

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
imagemin ./src/images.orig/**/*.jpg --plugin=mozjpeg --out-dir=./src/images
```

or individually, e.g. convert a PNG to webp format:

```sh
imagemin ./src/images.orig/image.png --plugin=webp > ./src/images/
```

[`imagemin-cli`](https://www.npmjs.com/package/imagemin-cli) and plugins are installed globally:

```sh
npm i -g imagemin-cli imagemin-pngquant imagemin-mozjpeg imagemin-svgo imagemin-webp
```
