import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import serve from "rollup-plugin-serve";
import babel from '@rollup/plugin-babel';
import livereload from 'rollup-plugin-livereload';

export default {
  input: "./playground/play.jsx",
  output: {
    file: "./playground/bundle/play.bundle.js",
    format: 'iife'
  },
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: [
        [
          "@babel/plugin-transform-react-jsx",
          {
            pragma: "Quark.createElement",
            pragmaFrag: "Quark.Fragment"
          },
        ],
      ],
    }),
    serve({
      open: 'index.html',
      verbose: false,
      contentBase: ["dist", "playground"],
      host: "localhost",
      port: 8100,
      onListening() {
        console.log(`Start Quark Playground - ` +
          `Server listening at http://${this.host}:${this.port}/`);
      },
    }),
    livereload({
      watch: 'playground'
    })
  ],
};

