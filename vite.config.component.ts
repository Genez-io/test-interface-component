import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import * as EsLint from "vite-plugin-linter";
import tsConfigPaths from "vite-tsconfig-paths";
const { EsLinter, linterPlugin } = EsLint;
import * as packageJson from "./package.json";

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [
    react(),
    tsConfigPaths(),
    // linterPlugin({
    //   include: ["./src}/**/*.{ts,tsx}"],
    //   linters: [new EsLinter({ configEnv })],
    // }),
    dts({
      include: ["src/component/"],
    }),
  ],
  build: {
    lib: {
      entry: resolve("src", "component/index.ts"),
      name: "test-interface-component",
      formats: ["es", "umd"],
      fileName: (format) => `test-interface-component.${format}.js`,
    },

    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
    // outDir: "../NpmTestInterfacePackage/dist",
  },
}));
