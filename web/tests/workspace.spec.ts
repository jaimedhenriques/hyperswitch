import { readFile } from 'node:fs/promises';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

async function openWorkspace(page: Page) {
  await page.clock.setFixedTime(new Date('2026-10-03T12:00:00.000Z'));
  await page.goto('/app');
  await expect(page.getByRole('heading', { name: 'Overview', exact: true })).toBeVisible();
}

async function navigate(page: Page, section: string) {
  const menu = page.getByRole('button', { name: 'Open navigation', exact: true });
  if (await menu.isVisible()) await menu.click();
  await page.getByRole('navigation', { name: 'Merchant workspace' }).getByRole('button', { name: section, exact: true }).click();
  await expect(page.getByRole('heading', { name: section, exact: true })).toBeVisible();
}

async function acceptedCount(page: Page) {
  return Number((await page.getByRole('region', { name: 'Accepted payments', exact: true }).locator(':scope > strong').innerText()).replaceAll(',', ''));
}

async function processedAmount(page: Page) {
  const amount = await page.getByRole('region', { name: 'Processed volume', exact: true }).locator(':scope > strong').getAttribute('title');
  return Number(amount!.replace(/[^\d.]/g, ''));
}

async function fillPayment(page: Page, customer: string, amount = '149.00') {
  await page.getByRole('button', { name: 'Create payment', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Create a demo payment' });
  await dialog.getByRole('spinbutton', { name: 'Amount', exact: true }).fill(amount);
  await dialog.getByRole('combobox', { name: 'Currency', exact: true }).selectOption('EUR');
  await dialog.getByRole('textbox', { name: 'Customer name', exact: true }).fill(customer);
  await dialog.getByRole('textbox', { name: 'Customer email', exact: true }).fill('workspace-test@example.com');
  await dialog.getByRole('button', { name: 'Create demo payment', exact: true }).click();
  await expect(page.getByRole('dialog', { name: 'Payment details' })).toBeVisible();
}

async function expectNoDocumentOverflow(page: Page) {
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
}

test('date and currency scopes update reporting, and chart data reconciles with processed volume', async ({ page }) => {
  await openWorkspace(page);
  const defaultCount = await acceptedCount(page);
  await page.getByRole('combobox', { name: 'Date range', exact: true }).selectOption('7');
  expect(await acceptedCount(page)).toBeLessThan(defaultCount);
  await page.getByRole('combobox', { name: 'Date range', exact: true }).selectOption('90');
  const euroCount = await acceptedCount(page);
  expect(euroCount).toBeGreaterThan(defaultCount);
  await page.getByRole('combobox', { name: 'Reporting currency', exact: true }).selectOption('USD');
  expect(await acceptedCount(page)).toBeLessThan(euroCount);
  await expect(page.getByRole('img', { name: 'Demo processed payment volume in USD', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'View data', exact: true }).click();
  const chartTable = page.getByRole('table', { name: 'Processed volume by date', exact: true });
  const amounts = await chartTable.locator('tbody tr td:last-child').allTextContents();
  const chartTotal = amounts.reduce((sum, amount) => sum + Number(amount.replace(/[^\d.]/g, '')), 0);
  expect(chartTotal).toBeCloseTo(await processedAmount(page), 2);
});

test('payment search, status, and currency filters are reflected in the downloaded CSV', async ({ page }) => {
  await openWorkspace(page);
  await navigate(page, 'Payments');
  await page.getByRole('combobox', { name: 'Payment status', exact: true }).selectOption('Failed');
  await page.getByRole('combobox', { name: 'Payment currency', exact: true }).selectOption('EUR');
  await page.getByRole('textbox', { name: 'Search payments', exact: true }).fill('Olivia');
  const table = page.getByRole('table', { name: 'Filtered demo payments', exact: true });
  const rows = table.locator('tbody tr');
  expect(await rows.count()).toBeGreaterThan(0);
  for (const row of await rows.all()) {
    await expect(row).toContainText('Olivia Martin');
    await expect(row.getByRole('cell', { name: 'Failed', exact: true })).toBeVisible();
    await expect(row).toContainText('€');
  }
  // The next scope spans multiple pages; export must include the entire result.
  await page.getByRole('combobox', { name: 'Date range', exact: true }).selectOption('90');
  await page.getByRole('combobox', { name: 'Payment status', exact: true }).selectOption('Succeeded');
  const filteredCount = Number((await page.getByText(/^\d+ demo payments$/).innerText()).replace(/\D/g, ''));
  expect(filteredCount).toBeGreaterThan(10);
  await expect(rows).toHaveCount(10);
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export', exact: true }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('avenra-demo-payments-90d.csv');
  const path = await download.path();
  expect(path).not.toBeNull();
  const csv = await readFile(path!, 'utf8');
  const exportedRows = csv.trim().split(/\r?\n/);
  expect(exportedRows[0]).toContain('"payment_id"');
  expect(exportedRows.length - 1).toBe(filteredCount);
  for (const row of exportedRows.slice(1)) {
    expect(row).toContain('"Olivia Martin"');
    expect(row).toContain('"EUR","Succeeded"');
  }
  await page.getByRole('textbox', { name: 'Search payments', exact: true }).fill('no-matching-customer');
  await expect(table).toContainText('No payments found');
  await page.getByRole('button', { name: 'Clear payment search', exact: true }).click();
  await expect(table).toContainText('Succeeded');
});

test('a new demo payment can succeed and refund, updating history and gross accepted metrics', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await openWorkspace(page);
  const initialVolume = await processedAmount(page);
  const initialCount = await acceptedCount(page);
  await navigate(page, 'Payments');
  await fillPayment(page, 'Workspace Regression Customer');
  const dialog = page.getByRole('dialog', { name: 'Payment details' });
  await expect(dialog.getByText('Pending', { exact: true })).toBeVisible();
  await dialog.getByRole('button', { name: 'Copy payment ID', exact: true }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toMatch(/^avn_demo_/);
  await dialog.getByRole('button', { name: 'Simulate success', exact: true }).click();
  await expect(dialog.getByText('Succeeded', { exact: true })).toBeVisible();
  await dialog.getByRole('button', { name: 'Close dialog', exact: true }).click();
  await page.getByRole('textbox', { name: 'Search payments', exact: true }).fill('Workspace Regression Customer');
  const table = page.getByRole('table', { name: 'Filtered demo payments', exact: true });
  await expect(table.getByRole('cell', { name: 'Succeeded', exact: true })).toBeVisible();
  await table.getByRole('button', { name: /^avn_demo_/ }).click();
  await dialog.getByRole('button', { name: 'Simulate refund', exact: true }).click();
  await dialog.getByRole('button', { name: 'Confirm demo refund', exact: true }).click();
  await expect(dialog.getByText('Refunded', { exact: true })).toBeVisible();
  await expect(dialog.getByText('Demo refund completed', { exact: true })).toBeVisible();
  await dialog.getByRole('button', { name: 'Close dialog', exact: true }).click();
  await expect(table.getByRole('cell', { name: 'Refunded', exact: true })).toBeVisible();
  await navigate(page, 'Overview');
  expect(await acceptedCount(page)).toBe(initialCount + 1);
  expect(await processedAmount(page)).toBeCloseTo(initialVolume + 149, 2);
  await expect(page.getByText(/Accepted volume includes refunded authorizations/)).toBeVisible();
});

test('routing refuses invalid allocation totals and saves a valid rule with conditions', async ({ page }) => {
  await openWorkspace(page);
  await navigate(page, 'Routing');
  await page.getByRole('spinbutton', { name: 'Stripe allocation percent', exact: true }).fill('65');
  await page.getByRole('button', { name: 'Save rule', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Allocations total 105%');
  await page.getByRole('spinbutton', { name: 'Stripe allocation percent', exact: true }).fill('70');
  await page.getByRole('spinbutton', { name: 'Adyen allocation percent', exact: true }).fill('20');
  await page.getByRole('spinbutton', { name: 'Checkout.com allocation percent', exact: true }).fill('10');
  await page.getByRole('combobox', { name: 'Payment currency', exact: true }).selectOption('EUR');
  await page.getByRole('combobox', { name: 'Customer region', exact: true }).selectOption('Europe');
  await page.getByRole('combobox', { name: 'If a processor is unavailable', exact: true }).selectOption('Checkout.com');
  await page.getByRole('button', { name: 'Save rule', exact: true }).click();
  await expect(page.getByRole('alert')).toHaveCount(0);
  await expect(page.getByRole('img', { name: 'Stripe: 70%, Adyen: 20%, Checkout.com: 10%', exact: true })).toBeVisible();
  await expect(page.getByText('Checkout.com fallback', { exact: true })).toBeVisible();
  await navigate(page, 'Overview');
  await navigate(page, 'Routing');
  await expect(page.getByRole('combobox', { name: 'Payment currency', exact: true })).toHaveValue('EUR');
  await expect(page.getByRole('combobox', { name: 'Customer region', exact: true })).toHaveValue('Europe');
  await page.getByRole('spinbutton', { name: 'Stripe allocation percent', exact: true }).fill('80');
  await page.getByRole('button', { name: 'Discard changes', exact: true }).click();
  await expect(page.getByRole('spinbutton', { name: 'Stripe allocation percent', exact: true })).toHaveValue('70');
});

test('connector changes affect forms and routing, while settings and reset restore the workspace', async ({ page }) => {
  await openWorkspace(page);
  await navigate(page, 'Connectors');
  const paypal = page.getByRole('region', { name: 'PayPal connector', exact: true });
  await paypal.getByRole('button', { name: 'Enable', exact: true }).click();
  await page.getByRole('dialog', { name: 'PayPal', exact: true }).getByRole('button', { name: 'Enable in demo', exact: true }).click();
  await expect(paypal.getByText('Enabled', { exact: true })).toBeVisible();
  // A disabled fallback must be flagged even when its allocation is zero.
  await navigate(page, 'Routing');
  await page.getByRole('spinbutton', { name: 'Stripe allocation percent', exact: true }).fill('85');
  await page.getByRole('spinbutton', { name: 'Adyen allocation percent', exact: true }).fill('0');
  await page.getByRole('button', { name: 'Save rule', exact: true }).click();
  await expect(page.getByRole('img', { name: 'Stripe: 85%, Adyen: 0%, Checkout.com: 15%', exact: true })).toBeVisible();
  await navigate(page, 'Connectors');
  const adyen = page.getByRole('region', { name: 'Adyen connector', exact: true });
  await adyen.getByRole('button', { name: 'Manage', exact: true }).click();
  await page.getByRole('dialog', { name: 'Adyen', exact: true }).getByRole('button', { name: 'Disable in demo', exact: true }).click();
  await navigate(page, 'Routing');
  await expect(page.getByText(/An allocated or fallback connector is disabled/)).toBeVisible();
  await page.getByRole('button', { name: 'Save rule', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Choose an enabled fallback processor');
  await navigate(page, 'Settings');
  await page.getByRole('textbox', { name: /Workspace name/ }).fill('Meridian Collective');
  await page.getByRole('textbox', { name: /Finance email/ }).fill('finance@meridian.example');
  await page.getByRole('combobox', { name: /Reporting and default payment currency/ }).selectOption('USD');
  await page.getByRole('button', { name: 'Save changes', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Workspace settings for Meridian Collective', exact: true })).toBeVisible();
  await navigate(page, 'Overview');
  await expect(page.getByRole('combobox', { name: 'Reporting currency', exact: true })).toHaveValue('USD');
  await navigate(page, 'Payments');
  await page.getByRole('button', { name: 'Create payment', exact: true }).click();
  const create = page.getByRole('dialog', { name: 'Create a demo payment' });
  await expect(create.getByRole('combobox', { name: 'Currency', exact: true })).toHaveValue('USD');
  await create.getByRole('combobox', { name: 'Processor', exact: true }).selectOption('PayPal');
  await expect(create.getByRole('combobox', { name: 'Processor', exact: true }).getByRole('option', { name: 'Adyen', exact: true })).toHaveCount(0);
  await create.getByRole('button', { name: 'Cancel', exact: true }).click();
  await navigate(page, 'Settings');
  await page.getByRole('button', { name: 'Reset demo', exact: true }).click();
  await page.getByRole('dialog', { name: 'Reset your demo?', exact: true }).getByRole('button', { name: 'Reset demo', exact: true }).click();
  await expect(page.getByRole('textbox', { name: /Workspace name/ })).toHaveValue('Northstar Studio');
  await expect(page.getByRole('combobox', { name: /Reporting and default payment currency/ })).toHaveValue('EUR');
  await navigate(page, 'Connectors');
  await expect(paypal.getByText('Available', { exact: true })).toBeVisible();
  await expect(adyen.getByText('Enabled', { exact: true })).toBeVisible();
});

test('mobile navigation is usable and large payments do not overflow the document', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openWorkspace(page);
  await expect(page.getByRole('navigation', { name: 'Merchant workspace' })).toBeHidden();
  await expectNoDocumentOverflow(page);
  for (const section of ['Payments', 'Routing', 'Connectors', 'Settings']) {
    await navigate(page, section);
    await expect(page.getByRole('navigation', { name: 'Merchant workspace' })).toBeHidden();
    await expectNoDocumentOverflow(page);
  }
  await navigate(page, 'Payments');
  await fillPayment(page, 'Large Mobile Payment', '1000000.00');
  const dialog = page.getByRole('dialog', { name: 'Payment details' });
  await dialog.getByRole('button', { name: 'Simulate success', exact: true }).click();
  await expectNoDocumentOverflow(page);
  await dialog.getByRole('button', { name: 'Close dialog', exact: true }).click();
  await navigate(page, 'Overview');
  await expectNoDocumentOverflow(page);
  await page.setViewportSize({ width: 320, height: 720 });
  await expectNoDocumentOverflow(page);
});

test('payment dialogs trap keyboard focus through confirmation changes and close with Escape', async ({ page }) => {
  await openWorkspace(page);
  await navigate(page, 'Payments');
  await page.getByRole('combobox', { name: 'Payment status', exact: true }).selectOption('Succeeded');
  const trigger = page.getByRole('table', { name: 'Filtered demo payments', exact: true }).getByRole('button', { name: /^avn_/ }).first();
  await trigger.click();
  const dialog = page.getByRole('dialog', { name: 'Payment details' });
  const close = dialog.getByRole('button', { name: 'Close dialog', exact: true });
  await expect(close).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('button', { name: 'Simulate refund', exact: true })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect.poll(() => dialog.evaluate(element => element.contains(document.activeElement))).toBe(true);
  await dialog.getByRole('button', { name: 'Confirm demo refund', exact: true }).focus();
  await page.keyboard.press('Tab');
  await expect(close).toBeFocused();
  await page.keyboard.press('Shift+Tab');
  await expect(dialog.getByRole('button', { name: 'Confirm demo refund', exact: true })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});
