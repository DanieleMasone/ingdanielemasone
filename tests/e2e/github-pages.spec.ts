import {expect, test} from '@playwright/test';

test('route-level deep links can be opened and refreshed with the GitHub Pages base path', async ({page}) => {
  await page.goto('projects/');

  await expect(page).toHaveURL(/\/ingdanielemasone\/projects\/$/);
  await expect(page.getByRole('heading', {name: 'Progetti'})).toBeVisible();

  await page.reload();

  await expect(page.getByRole('heading', {name: 'Progetti'})).toBeVisible();
});

test('internal navigation preserves the /ingdanielemasone/ base path', async ({page}) => {
  await page.goto('./');
  await page.getByRole('link', {name: /Guarda i progetti/i}).click();

  await expect(page).toHaveURL(/\/ingdanielemasone\/projects\/$/);
  await expect(page.getByRole('heading', {name: 'Progetti'})).toBeVisible();
});

test('browser back and forward work across route transitions', async ({page}) => {
  await page.goto('./');
  await page.getByRole('link', {name: /Guarda i progetti/i}).click();
  await expect(page.getByRole('heading', {name: 'Progetti'})).toBeVisible();

  await page.goBack();
  await expect(page).toHaveURL(/\/ingdanielemasone\/$/);
  await expect(page.getByRole('heading', {level: 1, name: 'Daniele Masone'})).toBeVisible();

  await page.goForward();
  await expect(page).toHaveURL(/\/ingdanielemasone\/projects\/$/);
  await expect(page.getByRole('heading', {name: 'Progetti'})).toBeVisible();
});
