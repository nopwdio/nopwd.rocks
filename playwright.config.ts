import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  fullyParallel: true,
  reporter: "line",
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
