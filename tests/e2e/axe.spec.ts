import AxeBuilder from '@axe-core/playwright';
import {expect, test, type Page} from '@playwright/test';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'];

async function expectNoAxeViolations(page: Page) {
  const {violations} = await new AxeBuilder({page}).withTags(wcagTags).analyze();
  const details = violations.flatMap(({id, impact, helpUrl, nodes}) => [
    `${id} (${impact}): ${helpUrl}`,
    ...nodes.map(({target, failureSummary}) => `  ${target.join(' > ')}: ${failureSummary}`),
  ]).join('\n');

  expect(violations.map(({id}) => id), details).toEqual([]);
}

test.use({colorScheme: 'light', reducedMotion: 'reduce'});

test('Home passes automated WCAG checks in light mode', async ({page}) => {
  await page.goto('./');
  await expect(page.getByRole('heading', {level: 1, name: 'Daniele Masone'})).toBeVisible();
  await expect(page.getByRole('link', {name: /Esplora i progetti GitHub/i})).toBeVisible();
  await expectNoAxeViolations(page);
});

test('GitHub Projects passes automated WCAG checks in dark mode', async ({page}) => {
  await page.emulateMedia({colorScheme: 'dark'});
  await page.goto('github-projects/');
  await expect(page.locator('html')).toHaveClass(/\bdark\b/);
  await expect(page.getByRole('heading', {level: 1, name: 'Progetti GitHub'})).toBeVisible();
  await expect(page.getByText(/1\u20133 di \d+ repository/)).toBeVisible();
  await expectNoAxeViolations(page);
});

test('the open mobile navigation passes automated WCAG checks', async ({page}) => {
  await page.setViewportSize({width: 390, height: 844});
  await page.goto('./');
  await expect(page.getByRole('heading', {level: 1, name: 'Daniele Masone'})).toBeVisible();
  await page.getByRole('button', {name: /Apri menu di navigazione/i}).click();
  const mobileNavigation = page.getByRole('navigation', {name: /Navigazione mobile/i});
  await expect(mobileNavigation).toBeVisible();
  await expect(mobileNavigation).toHaveCSS('opacity', '1');
  await expectNoAxeViolations(page);
});
