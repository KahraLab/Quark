import { createConfig } from './common-config';

const devConfig = createConfig({
  output: [
    {
      format: "iife",
      file: "playground/bundle/quark.global.js",
      name: "Quark",
    },
    {
      format: "cjs",
      file: "playground/bundle/quark.cjs.js",
      name: "Quark",
    },
    {
      format: "esm",
      file: "playground/bundle/quark.esm.js",
      name: "Quark",
    },
  ],
});

export default devConfig;
