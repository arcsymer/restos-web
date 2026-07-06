import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

// Fail only on serious/critical accessibility violations.
async function scan(page: import('@playwright/test').Page) {
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  return results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
}

test.describe('accessibility (axe, serious/critical)', () => {
  test('menu page has no serious a11y violations', async ({ page }) => {
    await page.goto('/menu?mock=1');
    await page.getByRole('heading', { level: 2, name: 'Soups' }).waitFor();
    expect(await scan(page)).toEqual([]);
  });

  test('cart page has no serious a11y violations', async ({ page }) => {
    await page.goto('/menu?mock=1');
    await page.getByRole('button', { name: /^Add .* to cart$/ }).first().click();
    await page.getByRole('link', { name: /Cart/ }).click();
    await page.getByRole('heading', { level: 1, name: 'Your cart' }).waitFor();
    expect(await scan(page)).toEqual([]);
  });

  test('reserve page has no serious a11y violations', async ({ page }) => {
    await page.goto('/reserve?mock=1');
    await page.getByRole('button', { name: 'Check availability' }).click();
    await page.getByRole('group', { name: 'Choose a table' }).waitFor();
    expect(await scan(page)).toEqual([]);
  });
});
