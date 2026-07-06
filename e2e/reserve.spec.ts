import { expect, test } from '@playwright/test';

test.describe('reservations flow (mock mode)', () => {
  test('check availability, pick a table, and reserve', async ({ page }) => {
    await page.goto('/reserve?mock=1');

    await page.getByRole('button', { name: 'Check availability' }).click();
    await expect(page.getByRole('group', { name: 'Choose a table' })).toBeVisible();

    await page.getByRole('radio').first().check();
    await page.getByLabel('Name').fill('Anna Kowalska');
    await page.getByLabel('Phone').fill('+48 600 100 200');
    await page.getByRole('button', { name: 'Reserve', exact: true }).click();

    await expect(page.getByText('Reservation confirmed!')).toBeVisible();
  });

  test('a party too large for any table shows the empty-state message', async ({ page }) => {
    await page.goto('/reserve?mock=1');

    // largest table seats 8; triple-click selects the field, then real key
    // presses drive Angular's number ValueAccessor (fill() alone doesn't)
    const party = page.getByLabel('Party size');
    await party.click({ clickCount: 3 });
    await page.keyboard.type('12');
    await expect(party).toHaveValue('12');
    await page.getByRole('button', { name: 'Check availability' }).click();

    await expect(page.getByText(/No free table fits that party/)).toBeVisible();
  });

  test('client-side validation blocks an incomplete reservation', async ({ page }) => {
    await page.goto('/reserve?mock=1');

    await page.getByRole('button', { name: 'Check availability' }).click();
    await page.getByRole('radio').first().check();
    // leave name + phone empty
    await page.getByRole('button', { name: 'Reserve', exact: true }).click();

    await expect(page.getByText('Tell us your name.')).toBeVisible();
    await expect(page.getByText('Reservation confirmed!')).toHaveCount(0);
  });
});
