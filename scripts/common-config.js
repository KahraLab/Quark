import path from "path";
import typescript from "rollup-plugin-typescript2";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

const buildPlugins = [typescript(), resolve(), commonjs()];

export function createConfig(options) {
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
