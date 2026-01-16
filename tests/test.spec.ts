import { test, expect } from '@playwright/test';

test.describe('SanityBoard', () => {
    test('Leaderboard loads and displays rows', async ({ page }) => {
        await page.goto('/');
        
        // Check hero text
        await expect(page.getByRole('heading', { name: /SanityHarness/i })).toBeVisible();
        
        // Check if at least one row is present
        const rows = page.locator('.group\\/row'); 
        await expect(rows.first()).toBeVisible();
    });

    test('Report page loads correctly', async ({ page }) => {
        // Navigate to the first available report
        await page.goto('/');
        const firstRowButton = page.locator('.group\\/row button').first();
        await firstRowButton.click();
        
        // Click "Open Flight Recorder"
        const link = page.getByRole('link', { name: /Open Flight Recorder/i });
        await expect(link).toBeVisible();
        
        // Navigate
        await link.click();
        
        // Check Report Page Header
        await expect(page.getByText('Flight Recorder')).toBeVisible();
        
        // Check Tabs
        await expect(page.getByText('Task Matrix')).toBeVisible();
        await expect(page.getByText('Flight Report')).toBeVisible();
        
        // Switch to Task Matrix
        await page.getByText('Task Matrix').click();
        await expect(page.getByText('Task Name')).toBeVisible(); // Column header
    });

    test('Submission page has mailto link', async ({ page }) => {
        await page.goto('/submit');
        const link = page.getByRole('link', { name: /Upload Run Data/i });
        await expect(link).toHaveAttribute('href', /mailto:/);
    });
});
