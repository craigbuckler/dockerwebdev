import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

const
  pkg = require('./package.json'),
  productionMode = (process.env.NODE_ENV !== 'development'),
  values = require('./lib/json').flatten( require('./site.json'), '__', '__' );

values.__dev__ = !productionMode;
values.__version__ = pkg.version;
values.__versionFile__ = pkg.version.replace(/\./g, '-');
values.__PWAcache__ = values.__versionFile__ + '::' + values.__siteshort__;

const

  // primary processing plugins
  plugins = [
    nodeResolve({
      browser: true
    }),
    commonjs(),
    replace({
      values,
      preventAssignment: true
    })
  ],

  // output plugins
  pluginsOut = [
    terser({
      ecma: 2018,
      mangle: {
        toplevel: true
      },
      compress: {
        module: true,
        toplevel: true,
        unsafe_arrows: true,
        drop_console: productionMode,
        drop_debugger: productionMode
      },
      output: {
        quote_style: 1
      }
    })
  ];


export default [

  // main script
  {
    input: './src/js/main.js',
    output: {
      file: './build/js/main.js',
      format: 'es',
      plugins: pluginsOut
    },
    plugins
  },

  // service worker
  {
    input: './src/js/sw.js',
    output: {
      file: './build/sw.js',
      format: 'es',
      plugins: pluginsOut
    },
    plugins
  },

  // analytics
  {
    input: './src/js/analytics.js',
    output: {
      file: './build/js/a.js',
      format: 'es',
      plugins: pluginsOut
    },
    plugins
  }

];
