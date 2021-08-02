import { createConfig } from './common-config';
import { terser } from "rollup-plugin-terser";

const prodConfig = createConfig({
  output: [
    {
      format: "iife",
      file: "pladist/quark.global.js",
      name: "Quark",
    },
    {
      format: "cjs",
      file: "pladist/quark.cjs.js",
      name: "Quark",
    },
    {
      format: "esm",
      file: "pladist/quark.esm.js",
      name: "Quark",
    },
  ],
  plugins: [terser()]
});

export default prodConfig;
