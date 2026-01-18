import { test, expect } from "@playwright/test";

test("Report Page loads and Task Matrix interacts correctly", async ({
  page,
}) => {
  // Go to the report page of a known run (e.g., amp)
  await page.goto("/report/amp-2026-01-13T132446");

  // 1. Verify Header
  await expect(
    page.getByRole("heading", { name: "Amp Code CLI" }),
  ).toBeVisible();

  // 2. Switch to Task Matrix Tab
  await page
    .getByRole("button", { name: "Task Matrix" })
    .click({ force: true });

  // 3. Verify Matrix loaded
  await expect(page.getByRole("table").first()).toBeVisible({ timeout: 15000 });
  // Check for a known task
  await expect(page.getByText("dart/future-pool")).toBeVisible();

  // 4. Test Search
  const searchInput = page.getByPlaceholder("Search tasks or languages...");
  await searchInput.fill("go/bank");

  // "go/bank-account" should be visible
  await expect(page.getByText("go/bank-account")).toBeVisible();
  // "dart/future-pool" should be hidden
  await expect(page.getByText("dart/future-pool")).not.toBeVisible();

  // Clear search
  await searchInput.fill("");

  // 5. Test Filters (Status)
  // Default: All Status
  // Select "Failed"
  await page.locator("select").first().selectOption("fail"); // Assuming first select is Status

  // "dart/future-pool" (Failed) should be visible
  await expect(page.getByText("dart/future-pool")).toBeVisible();
  // "go/bank-account" (Passed) should be hidden
  await expect(page.getByText("go/bank-account")).not.toBeVisible();
});
