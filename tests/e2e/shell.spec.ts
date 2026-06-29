import {expect, test} from '@playwright/test';

const routes = [
  './',
  'experience/',
  'projects/',
  'github-projects/',
  'courses/',
  'certifications/',
  'trading/',
  'testimonials/',
  'privacy/',
  'cookie-policy/',
  'missing-portfolio-route/',
];

const visibleNameOccurrences = async (page) => page.evaluate((name) => (
  [...document.querySelectorAll('body *')].filter((element) => {
    const style = window.getComputedStyle(element);
    return element.children.length === 0
      && element.textContent?.includes(name)
      && style.display !== 'none'
      && style.visibility !== 'hidden';
  }).length
), 'Daniele Masone');

test('home and internal routes keep distinct visible identity responsibilities', async ({page}) => {
  await page.goto('./');
  await expect(page.getByRole('heading', {level: 1, name: 'Daniele Masone'})).toBeVisible();
  await expect(page.getByRole('heading', {level: 2, name: 'Daniele Masone'})).toHaveCount(0);
  expect(await visibleNameOccurrences(page)).toBe(3);

  await page.goto('projects/');
  expect(await visibleNameOccurrences(page)).toBe(2);
});

test('desktop shell is present and overflow-free on every public and fallback route', async ({page}) => {
  for (const route of routes) {
    await page.goto(route);
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();
    await expect(page.getByRole('link', {name: /Homepage di Daniele Masone/i})).toBeVisible();

    const overflow = await page.evaluate(() => (
      document.documentElement.scrollWidth - document.documentElement.clientWidth
    ));
    expect(overflow, `horizontal overflow on ${route}`).toBeLessThanOrEqual(1);
  }
});

test('mobile shell reflows across every route and supports long German labels', async ({page}) => {
  test.setTimeout(90_000);
  await page.setViewportSize({width: 375, height: 812});
  await page.goto('./');
  await page.getByRole('button', {name: /Apri menu di navigazione/i}).click();
  await page.getByRole('button', {name: /Seleziona lingua/i}).click();
  await page.getByRole('button', {name: 'Deutsch', exact: true}).click();

  for (const route of routes) {
    await page.goto(route);
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();

    const overflow = await page.evaluate(() => (
      document.documentElement.scrollWidth - document.documentElement.clientWidth
    ));
    expect(overflow, `mobile horizontal overflow on ${route}`).toBeLessThanOrEqual(1);
  }
});

test('footer resources preserve the Pages base path and social icons are decorative', async ({page}) => {
  await page.goto('./');

  const footerNavigation = page.getByRole('navigation', {name: 'Link del piè di pagina'});
  await expect(footerNavigation.getByRole('link', {name: 'Documentazione'}))
    .toHaveAttribute('href', '/ingdanielemasone/docs/');
  await expect(footerNavigation.getByRole('link', {name: 'Copertura test'}))
    .toHaveAttribute('href', '/ingdanielemasone/test-coverage/');

  const socialNavigation = page.getByRole('navigation', {name: 'Link social'});
  const socialLinks = socialNavigation.getByRole('link');
  await expect(socialLinks).toHaveCount(6);
  await expect(socialNavigation.locator('svg[aria-hidden="true"]')).toHaveCount(6);
});
