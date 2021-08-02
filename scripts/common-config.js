const path = require("path");
const typescript = require("rollup-plugin-typescript2");
const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");

const buildPlugins = [typescript(), nodeResolve(), commonjs()];

function createConfig(options) {
  const { input, output, plugins: pluginsFromOptions } = options;
  let plugins = [...buildPlugins];
  if (pluginsFromOptions) {
    plugins.concat(pluginsFromOptions);
  }

  return {
    input: input || path.resolve(__dirname, "../src/index.ts"),
    output: output || [],
    plugins,
  };
}

module.exports = {
  createConfig,
};
