const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const serve = require("rollup-plugin-serve");
const { babel } = require("@rollup/plugin-babel");
const livereload = require("rollup-plugin-livereload");
const rollup = require("rollup");
const Log = require("../dev-cli/logger");
const chalk = require("chalk");

const playConfig = {
  input: "./playground/play.jsx",
  output: {
    file: "./playground/bundle/play.bundle.js",
    format: "iife",
  },
  plugins: [
    nodeResolve(),
    commonjs({
      include: "node_modules/**",
    }),
    babel({
      exclude: "node_modules/**",
      plugins: [
        [
          "@babel/plugin-transform-react-jsx",
          {
            pragma: "Quark.createElement",
            pragmaFrag: "Quark.Fragment",
          },
        ],
      ],
    }),
    serve({
      open: "index.html",
      verbose: false,
      contentBase: ["dist", "playground"],
      host: process.env.HOST || 'localhost',
      port: process.env.PORT || 8100
    }),
    livereload({
      watch: "playground",
      verbose: false,
    }),
  ],
};

let rebuildCount = 0;
let log = new Log().singleLineMode();
const playWatcher = rollup.watch(playConfig);
playWatcher.on("change", () => {
  log.info(
    `${chalk.yellow(
      "[ HMR ]"
    )} Rebuild playground source code... (${chalk.bold.hex("#63D1af")(
      "x" + ++rebuildCount
    )})`
  ).clear();
});
