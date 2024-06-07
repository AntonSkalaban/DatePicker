import alias from "@rollup/plugin-alias";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import svgr from "@svgr/rollup";
import path from "path";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default {
  input: "src/index.ts",

  output: {
    name: "datePicker",
    file: "dist/bundle.js",
    format: "iife",
    globals: {
      react: "React",
      "styled-components": "styled",
      "react-dom": "ReactDOM",
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
        { find: "components", replacement: path.resolve(__dirname, "./src/components") },
        { find: "constants", replacement: path.resolve(__dirname, "./src/constants") },
        { find: "utils", replacement: path.resolve(__dirname, "./src/utils") },
        { find: "types", replacement: path.resolve(__dirname, "./src/types") },
        { find: "styled", replacement: path.resolve(__dirname, "./src/styled") },
        { find: "assets", replacement: path.resolve(__dirname, "./src/assets") },
        { find: "hocs", replacement: path.resolve(__dirname, "./src/hocs") },
      ],
    }),
  ],
  external: ["react", "react-dom", "styled-components", "react/jsx-runtime"],
};
