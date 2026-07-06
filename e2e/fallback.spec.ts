import { expect, test } from '@playwright/test';

test.describe('transparent mock fallback', () => {
  test('with no backend reachable, the app auto-switches to mock and still works', async ({
    page,
  }) => {
    // no ?mock=1 — the app starts in "live" mode, the first /api call to
    // localhost:8080 fails (nothing listening), and the interceptor flips to mock
    await page.goto('/menu');

    // the menu still renders from the in-browser mock backend
    await expect(page.getByRole('heading', { level: 2, name: 'Soups' })).toBeVisible();

    // and the header mode chip reflects the automatic switch
    await expect(page.getByRole('button', { name: /Backend mode: mock/ })).toBeVisible();
  });
});
