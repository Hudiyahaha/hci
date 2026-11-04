import { defineConfig } from "vite";

export default defineConfig({
  // Relative paths let the build run from any hosting subfolder, such as GitHub Pages.
  base: "./",
  server: { port: 5173, strictPort: true },
  test: { include: ["tests/**/*.test.js"] }
});
