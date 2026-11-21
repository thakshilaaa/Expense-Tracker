const { test, expect } = require('@playwright/test');

test('User can add a new expense transaction', async ({ page }) => {
  // 1. Go to the app
  await page.goto('http://localhost:3000');

  // 2. Fill out the form
  await page.fill('#amount', '25.50');
  await page.fill('#description', 'Playwright Lunch');
  
  // Select a category (we'll pick the first one in the list, which is Food)
  await page.selectOption('#category', { index: 2 }); // 2 is usually Food (expense)

  // 3. Click the Add button
  await page.click('button[type="submit"]');

  // 4. Wait for the table to update and verify the row exists
  const rowText = await page.locator('tbody tr').first().innerText();
  expect(rowText).toContain('Playwright Lunch');
  expect(rowText).toContain('25.50');
});
