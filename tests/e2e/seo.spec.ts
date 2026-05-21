import {expect, test} from '@playwright/test';

const publicRoutes = [
  {path: './', canonical: 'https://danielemasone.github.io/ingdanielemasone/', title: /Daniele Masone/i},
  {path: 'projects/', canonical: 'https://danielemasone.github.io/ingdanielemasone/projects/', title: /Progetti/i},
  {path: 'github-projects/', canonical: 'https://danielemasone.github.io/ingdanielemasone/github-projects/', title: /Progetti GitHub/i},
];

for (const route of publicRoutes) {
  test(`public route exposes SEO metadata for ${route.path}`, async ({page}) => {
    await page.goto(route.path);

    await expect(page).toHaveTitle(route.title);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', route.canonical);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /index,\s*follow/i);
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute('content', route.canonical);
  });
}

test('privacy and cookie pages keep their noindex robots metadata', async ({page}) => {
  const legalRoutes = [
    {path: 'privacy/', canonical: 'https://danielemasone.github.io/ingdanielemasone/privacy/'},
    {path: 'cookie-policy/', canonical: 'https://danielemasone.github.io/ingdanielemasone/cookie-policy/'},
  ];

  for (const route of legalRoutes) {
    await page.goto(route.path);

    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', route.canonical);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex,\s*follow/i);
  }
});
