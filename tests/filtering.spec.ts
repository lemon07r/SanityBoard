import { test, expect } from "@playwright/test";

test("View Options toggle switches between Verified and Community runs", async ({
  page,
}) => {
  await page.goto("/");

  // Check View Options label
  await expect(page.getByText("View Options")).toBeVisible();

  // Default state: Verified Only
  // "Amp Code CLI" is verified, so it should be visible
  await expect(page.getByText("Amp Code CLI")).toBeVisible();

  // "Kimi CLI" is NOT verified (we edited it), so it should NOT be visible
  await expect(page.getByText("Kimi CLI")).not.toBeVisible();

  // Click "Community" button
  await page.getByRole("button", { name: "Community" }).click();

  // State: Community Only (Unverified)
  // "Kimi CLI" should now be visible
  await expect(page.getByText("Kimi CLI")).toBeVisible();

  // "Amp Code CLI" should now be hidden
  await expect(page.getByText("Amp Code CLI")).not.toBeVisible();
});
