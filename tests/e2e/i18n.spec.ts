import {expect, test} from '@playwright/test';

test('language switcher changes visible content and document language between Italian and English', async ({page}) => {
  await page.goto('./');

  await expect(page.locator('html')).toHaveAttribute('lang', /it/i);
  await expect(page.getByText('Portfolio e CV online')).toBeVisible();

  await page.getByRole('button', {name: /Seleziona lingua: Italiano/i}).click();
  await page.getByRole('button', {name: 'English'}).click();

  await expect(page.locator('html')).toHaveAttribute('lang', /en/i);
  await expect(page.getByText('Portfolio and online CV')).toBeVisible();
  await expect(page).toHaveTitle(/Daniele Masone/i);

  await page.getByRole('button', {name: /Select language: English/i}).click();
  await page.getByRole('button', {name: 'Italiano'}).click();

  await expect(page.locator('html')).toHaveAttribute('lang', /it/i);
  await expect(page.getByText('Portfolio e CV online')).toBeVisible();
});
