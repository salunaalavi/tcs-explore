import { defineConfig } from "cypress";

export default defineConfig({
  // defaults to mobile
  viewportHeight: 800,
  viewportWidth: 360,
  e2e: {
    baseUrl: "http://localhost:3000",
    excludeSpecPattern: [
      "**/node_modules/**",
      "cypress/e2e/examples/**/*.cy.*",
    ],
  },
});
