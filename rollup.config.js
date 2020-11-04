import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

const
  pkg = require('./package.json'),
  productionMode = (process.env.NODE_ENV !== 'development'),
  variables = require('./lib/json').flatten( require('./site.json'), '__', '__' );

variables.__dev__ = !productionMode;
variables.__version__ = pkg.version;
variables.__versionFile__ = pkg.version.replace(/\./g, '-');
variables.__PWAcache__ = variables.__versionFile__ + '::' + variables.__siteshort__;

const

  // primary processing plugins
  plugins = [
    nodeResolve({
      browser: true
    }),
    commonjs(),
    replace(variables)
  ],

  // output plugins
  pluginsOut = [
    terser({
      mangle: {
        toplevel: true
      },
      compress: {
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
