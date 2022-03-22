/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    open: true,
  },
  plugins: [
    react({
      babel: {
        plugins: ["formatjs"],
      },
    }),
    visualizer(),
  ],
  test: {
    global: true,
    environment: "jsdom",
    setupFiles: ["./src/setupMatchMedia.ts", "./src/setupTests.ts"],
    coverage: {
      exclude: [
        "**/*.test.tsx",
        ".storybook",
        "**/*.stories.tsx",
        "src/setup*.ts",
      ],
    },
  },
});
