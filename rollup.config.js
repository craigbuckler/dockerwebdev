const productionMode = (process.env.NODE_ENV === 'production');

import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './src/js/main.js',
  output: {
    file: './build/js/main.js',
    format: 'iife',
    plugins: [
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
    ]
  },
  plugins: [
    nodeResolve({
      browser: true
    }),
    commonjs()
  ]
};
