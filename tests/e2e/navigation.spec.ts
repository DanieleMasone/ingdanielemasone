import {expect, test} from '@playwright/test';

const rawI18nKeyPattern = /\b(?:[a-z]+_page|home_|seo\.|github_projects_page|trading_|certifications_page|testimonials_page)\b/;

test('home page loads from the GitHub Pages base path', async ({page}) => {
  await page.goto('./');

  await expect(page).toHaveURL(/\/ingdanielemasone\/$/);
  await expect(page.getByRole('heading', {level: 1, name: 'Daniele Masone'})).toBeVisible();
  await expect(page.getByRole('link', {name: /Guarda i progetti/i})).toBeVisible();
});

test('desktop portfolio navigation reaches major public pages without raw i18n keys', async ({page}) => {
  const routes = [
    {link: 'Esperienza', heading: 'Esperienze professionali', path: 'experience'},
    {link: 'Progetti', heading: 'Progetti', path: 'projects'},
    {link: 'Progetti GitHub', heading: 'Progetti GitHub', path: 'github-projects'},
    {link: 'Corsi', heading: 'I miei corsi online', path: 'courses'},
    {link: 'Certificazioni', heading: 'Certificazioni', path: 'certifications'},
    {link: 'Testimonianze', heading: 'Testimonianze', path: 'testimonials'},
    {link: 'Trading', heading: 'La mia attività di Trading', path: 'trading'},
  ];

  for (const route of routes) {
    await page.goto('./');
    await page.getByRole('button', {name: 'Portfolio'}).click();

    const portfolioMenu = page.getByRole('group', {name: /Navigazione portfolio/i});
    await expect(portfolioMenu).toBeVisible();
    await portfolioMenu.getByRole('link', {name: route.link, exact: true}).click();

    await expect(page).toHaveURL(new RegExp(`/ingdanielemasone/${route.path}/$`));
    await expect(page.getByRole('heading', {name: route.heading})).toBeVisible();
    await expect(page.locator('body')).not.toContainText(rawI18nKeyPattern);
  }
});

test.describe('mobile navigation', () => {
  test.use({viewport: {width: 390, height: 844}, isMobile: true});

  test('mobile menu opens and navigates under the base path', async ({page}) => {
    await page.goto('./');

    await page.getByRole('button', {name: /Apri menu di navigazione/i}).click();
    await expect(page.getByRole('navigation', {name: /Navigazione mobile/i})).toBeVisible();

    await page.getByRole('button', {name: 'Portfolio'}).click();
    await page.getByRole('group', {name: /Navigazione portfolio/i})
      .getByRole('link', {name: 'Progetti GitHub', exact: true})
      .click();

    await expect(page).toHaveURL(/\/ingdanielemasone\/github-projects\/$/);
    await expect(page.getByRole('heading', {name: 'Progetti GitHub'})).toBeVisible();
  });
});
