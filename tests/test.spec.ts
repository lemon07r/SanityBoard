import { test, expect } from "@playwright/test";

test.describe("SanityBoard", () => {
  test("Leaderboard loads and displays rows", async ({ page }) => {
    await page.goto("/");

    // Check hero text
    await expect(
      page.getByRole("heading", { name: /SanityHarness/i }),
    ).toBeVisible();

    // Check if at least one row is present
    const rows = page.locator(".group\\/row");
    await expect(rows.first()).toBeVisible();
  });

  test("Report page loads correctly", async ({ page }) => {
    // Navigate to the first available report
    await page.goto("/");
    const firstRowButton = page.locator(".group\\/row button").first();
    await firstRowButton.click();

    // Click "Open Flight Recorder"
    // Use .first() because there are multiple rows in the DOM, even if hidden/collapsed
    const link = page
      .getByRole("link", { name: /Open Flight Recorder/i })
      .first();
    await expect(link).toBeVisible();

    // Navigate
    await link.click();

    // Check Report Page Header
    // The header contains the Agent Name, not "Flight Recorder"
    // We can check for "Run Statistics" which is present on the page
    await expect(page.getByText("Run Statistics")).toBeVisible();

    // Check Tabs
    await expect(page.getByText("Task Matrix")).toBeVisible();
    await expect(page.getByText("Flight Report")).toBeVisible();

    // Switch to Task Matrix
    await page.getByText("Task Matrix").click();
    await page.waitForTimeout(1000); // Wait for transition
    await expect(page.getByText("Task Name")).toBeVisible(); // Column header
  });

  test("Submission page has form", async ({ page }) => {
    await page.goto("/submit");

    // Header
    await expect(
      page.getByRole("heading", { name: /Ingestion & Contribution/i }),
    ).toBeVisible();

    // Form Fields
    await expect(page.getByLabel("Agent Name")).toBeVisible();
    await expect(page.getByLabel("Agent Version")).toBeVisible();
    await expect(page.getByLabel("Model")).toBeVisible();
    await expect(page.getByLabel("Provider")).toBeVisible();
    await expect(page.getByLabel("Results Download Link")).toBeVisible();

    // Submit Button
    await expect(
      page.getByRole("button", { name: /Submit Run/i }),
    ).toBeVisible();
  });
});
