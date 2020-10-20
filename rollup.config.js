const productionMode = (process.env.NODE_ENV !== 'development');

import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const

  // primary processing plugins
  plugins = [
    nodeResolve({
      browser: true
    }),
    commonjs()
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
  }

];
