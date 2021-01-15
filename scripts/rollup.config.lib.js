import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser'

export default {
  input: "./src/index.ts",
  output: [
    {
      format: "iife",
      file: "dist/quark.global.js",
      name: "Quark",
    },
    {
      format: "cjs",
      file: "dist/quark.cjs.js",
      name: "Quark",
    },
    {
      format: "esm",
      file: "dist/quark.esm.js",
      name: "Quark",
    },
  ],
  plugins: [
    typescript(),
    resolve(),
    commonjs(),
    terser(),
  ]
}
