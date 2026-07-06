import { expect, test } from '@playwright/test';

test.describe('ordering flow (mock mode)', () => {
  test('browse the menu, add a dish, and place an order', async ({ page }) => {
    await page.goto('/menu?mock=1');

    await expect(page.getByRole('heading', { level: 1, name: 'Menu' })).toBeVisible();
    // the seeded menu has all five categories
    await expect(page.getByRole('heading', { level: 2, name: 'Soups' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 2, name: 'Desserts' })).toBeVisible();

    // add the first dish twice
    const firstAdd = page.getByRole('button', { name: /^Add .* to cart$/ }).first();
    await firstAdd.click();
    await firstAdd.click();

    // cart badge in the header reflects the count
    await expect(page.getByRole('navigation').getByText('2', { exact: true })).toBeVisible();

    await page.getByRole('link', { name: /Cart/ }).click();
    await expect(page.getByRole('heading', { level: 1, name: 'Your cart' })).toBeVisible();

    await page.getByRole('button', { name: 'Place order' }).click();
    await expect(page.getByText('Order received!')).toBeVisible();
    await expect(page.getByText(/Number BMN-\d{4}/)).toBeVisible();
  });
});
