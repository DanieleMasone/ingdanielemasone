import {expect, test} from '@playwright/test';

const appRoutes = [
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

test('public routes use only first-party requests and expected browser storage', async ({context, page}) => {
  await context.clearCookies();
  await page.addInitScript(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });

  const contactedOrigins = new Set<string>();
  page.on('request', (request) => contactedOrigins.add(new URL(request.url()).origin));

  for (const route of appRoutes) {
    await page.goto(route);
    await expect(page.locator('main')).toBeVisible();
  }

  const firstPartyOrigin = new URL(page.url()).origin;
  expect([...contactedOrigins]).toEqual([firstPartyOrigin]);
  expect(await context.cookies()).toEqual([]);

  const browserState = await page.evaluate(async () => ({
    localStorageKeys: Object.keys(window.localStorage).sort(),
    sessionStorageKeys: Object.keys(window.sessionStorage).sort(),
    cacheKeys: 'caches' in window ? await window.caches.keys() : [],
    indexedDbNames: 'databases' in indexedDB
      ? (await indexedDB.databases()).map((database) => database.name).filter(Boolean)
      : [],
    serviceWorkerCount: 'serviceWorker' in navigator
      ? (await navigator.serviceWorker.getRegistrations()).length
      : 0,
  }));

  expect(browserState.localStorageKeys).toEqual(['i18nextLng']);
  expect(browserState.sessionStorageKeys).toEqual([]);
  expect(browserState.cacheKeys).toEqual([]);
  expect(browserState.indexedDbNames).toEqual([]);
  expect(browserState.serviceWorkerCount).toBe(0);
});

test('language and theme actions persist only their documented preference keys', async ({context, page}) => {
  await context.clearCookies();
  await page.addInitScript(() => {
    window.localStorage.clear();
    window.sessionStorage.clear();
  });
  await page.goto('./');

  await page.getByRole('button', {name: /Seleziona lingua/i}).click();
  await page.getByRole('button', {name: /English/i}).click();
  await page.getByRole('button', {name: /Switch to dark mode|Switch to light mode/i}).click();

  const storage = await page.evaluate(() => Object.fromEntries(
    Object.keys(window.localStorage).sort().map((key) => [key, window.localStorage.getItem(key)])
  ));

  expect(Object.keys(storage)).toEqual(['i18nextLng', 'theme']);
  expect(storage.i18nextLng).toBe('en');
  expect(['dark', 'light']).toContain(storage.theme);
  expect(await context.cookies()).toEqual([]);
});

test('legal notices remain reachable from the footer on normal and fallback routes', async ({page}) => {
  for (const route of ['./', 'missing-portfolio-route/']) {
    await page.goto(route);

    const legalNavigation = page.getByRole('navigation', {name: /Informazioni legali/i});
    await expect(legalNavigation.getByRole('link', {name: 'Privacy Policy'})).toHaveAttribute(
      'href',
      '/ingdanielemasone/privacy/'
    );
    await expect(legalNavigation.getByRole('link', {name: /Policy Cookie e Local Storage/i})).toHaveAttribute(
      'href',
      '/ingdanielemasone/cookie-policy/'
    );
  }
});
