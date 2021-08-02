const { createConfig } = require("./common-config");
const sourcemaps = require("rollup-plugin-sourcemaps");
const rollup = require("rollup");
const log = require("../dev-cli/logger");
const chalk = require("chalk");

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
  plugins: [sourcemaps()],
});

let rebuildCount = 0;
const devWatcher = rollup.watch(devConfig);
devWatcher.on("change", () => {
  log.info(
    `${chalk.yellow(
      "[ HMR ]"
    )} Rebuild library source code... (${chalk.bold.hex("#63D1af")(
      "x" + ++rebuildCount
    )})`
  );
});
