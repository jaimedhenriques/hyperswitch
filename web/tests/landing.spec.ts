import { expect, test } from '@playwright/test';

test('company site explains routing and opens the demonstration workspace', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Every payment. A better path.', exact: true })).toBeVisible();
  const adyen = page.getByRole('button', { name: /Adyen Global acquiring/ });
  await adyen.click();
  await expect(adyen).toHaveAttribute('aria-pressed', 'true');
  await expect(page.getByText('Example routed to Adyen', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Copy API example' }).click();
  const example = await page.evaluate(() => navigator.clipboard.readText());
  expect(example).toContain('"confirm": false');
  expect(example).not.toMatch(/^\+/m);
  await page.getByRole('link', { name: 'Explore the workspace', exact: true }).click();
  await expect(page).toHaveURL(/\/app$/);
  await expect(page.getByRole('heading', { name: 'Overview', exact: true })).toBeVisible();
  await expect(page.getByText(/Sample data, simulated actions, zero live transactions/)).toBeVisible();
});

test('mobile homepage navigation reaches sections and keeps content inside the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open navigation', exact: true }).click();
  await expect(page.getByRole('navigation', { name: 'Main navigation' })).toBeVisible();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Platform', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'One integration. More possibilities.', exact: true })).toBeInViewport();
  await expect(page.getByRole('button', { name: 'Open navigation', exact: true })).toHaveAttribute('aria-expanded', 'false');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.goto('/app');
  await expect(page.getByRole('heading', { name: 'Overview', exact: true })).toBeVisible();
});
