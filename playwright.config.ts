import { defineConfig } from "@playwright/test";

export default defineConfig({
  webServer: {
    command: "bun run preview",
    port: 4173,
    reuseExistingServer: !process.env.CI,
  },
  testDir: "tests",
  testMatch: /(.+\.)?(test|spec)\.[jt]s/,
});
