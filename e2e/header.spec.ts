import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  console.log(process.env.url);
  await page.goto(process.env.url || "");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/nopwd/);
});
