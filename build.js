import esbuild from "esbuild";
// import { dependencies } from "./package.json";
import { sassPlugin } from "esbuild-sass-plugin";
import { fileURLToPath } from "url";
import { dirname } from "path";
import svgPlugin from "esbuild-plugin-svgr";

import fs from "fs/promises"; // Import fs module with promises support

const loadPackageJson = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const packageJsonPath = `${__dirname}/package.json`;
    const packageJsonContent = await fs.readFile(packageJsonPath, "utf-8");
    return JSON.parse(packageJsonContent);
  } catch (error) {
    console.error("Error reading package.json:", error);
    process.exit(1);
  }
};

const packageJson = await loadPackageJson();
const dependencies = packageJson.dependencies;

const entryFile = "src/main.tsx";
const shared = {
  bundle: true,
  entryPoints: [entryFile],
  // Treat all dependencies in package.json as externals to keep bundle size to a minimum
  external: Object.keys(dependencies),
  logLevel: "info",
  minify: true,
  sourcemap: true,
};
esbuild
  .build({
    ...shared,
    format: "esm",
    outfile: "./dist/index.esm.js",
    target: ["esnext", "node12.22.0"],
    plugins: [sassPlugin(), svgPlugin()],
    loader: {
      ".svg": "copy",
      ".png": "copy",
    },
  })
  .then(() => console.log("⚡ Build esm complete! ⚡"))
  .catch(() => process.exit(1));

esbuild
  .build({
    ...shared,
    format: "cjs",
    outfile: "./dist/index.cjs.js",
    target: ["esnext", "node12.22.0"],
    plugins: [sassPlugin(), svgPlugin()],
  })
  .then(() => console.log("⚡ Build cjs complete! ⚡"))
  .catch(() => process.exit(1));
