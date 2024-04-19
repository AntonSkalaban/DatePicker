import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
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
    alias({
      entries: [
        { find: "utils", replacement: "./src/utils" },
        { find: "components", replacement: "./src/components" },
      ],
    }),
  ],
  external: ["react", "react-dom", "styled-components", "react/jsx-runtime"],
};
