import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import svgr from "@svgr/rollup";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default {
  input: "src/index.ts",

  output: {
    name: "datePicker",
    file: "dist/bundle.js",
    format: "iife",
    globals: {
      "react/jsx-runtime": "jsxRuntime",
    },
  },

  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript(),
    terser(),
    svgr(),
    alias({
      entries: [
        { find: "components", replacement: "./src/components" },
        { find: "constants", replacement: "./src/constants" },
        { find: "utils", replacement: "./src/utils" },
        { find: "types", replacement: "./src/types" },
        { find: "styled", replacement: "./src/styled" },
        { find: "assets", replacement: "./src/assets" },
        { find: "hocs", replacement: "./src/hocs" },
      ],
    }),
  ],
  external: ["react", "react-dom", "styled-components", "react/jsx-runtime"],
};
