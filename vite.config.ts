/// <reference types="vitest" />
// https://vitejs.dev/config/
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  test: {
    globals: true,
    browser: {
      provider: "playwright",
      enabled: true,
      headless: true,
      name: "chromium",
    },
  },
  plugins: [react()],
});
