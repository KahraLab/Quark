import { createConfig } from './common-config';
import sourcemaps from 'rollup-plugin-sourcemaps';

const devConfig = createConfig({
  output: [
    {
      format: "iife",
      sourcemap: true,
      file: "playground/bundle/quark.global.js",
      name: "Quark",
    },
    {
      format: "cjs",
      sourcemap: true,
      file: "playground/bundle/quark.cjs.js",
      name: "Quark",
    },
    {
      format: "esm",
      sourcemap: true,
      file: "playground/bundle/quark.esm.js",
      name: "Quark",
    },
  ],
  plugins: [
    sourcemaps()
  ]
});

export default devConfig;
