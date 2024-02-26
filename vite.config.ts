import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

const entryFile = "src/main.tsx";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/main.tsx"),
      name: "genezio-test-interface-component",
      fileName: "index",
    },
  },
});
