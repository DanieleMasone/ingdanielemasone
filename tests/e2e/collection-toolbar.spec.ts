import {expect, test} from '@playwright/test';

const collectionPages = [
  {path: 'experience/', heading: 'Esperienze professionali', summary: /1\u20135 di \d+ esperienze in timeline/},
  {path: 'projects/', heading: 'Progetti', summary: /1\u20136 di \d+ progetti/},
  {path: 'github-projects/', heading: 'Progetti GitHub', summary: /1\u20133 di \d+ repository/},
  {path: 'courses/', heading: 'I miei corsi online', summary: /1\u20136 di \d+ corsi/},
  {path: 'testimonials/', heading: 'Testimonianze', summary: /1\u20136 di \d+ testimonianze/},
  {path: 'certifications/', heading: 'Certificazioni', summary: /1\u20136 di \d+ certificazioni/},
];

for (const route of collectionPages) {
  test(`collection toolbar renders a concise range summary on ${route.path}`, async ({page}) => {
    await page.goto(route.path);

    await expect(page.getByRole('heading', {name: route.heading})).toBeVisible();
    await expect(page.getByTestId('collection-summary')).toHaveText(route.summary);
  });
}

test('collection pagination keeps keyboard focus and announces changed ranges', async ({page}) => {
  await page.goto('courses/');

  const summary = page.getByTestId('collection-summary');
  const pagination = page.getByRole('navigation', {name: 'Paginazione'});
  const nextButton = pagination.getByRole('button', {name: 'Successivo'});
  const liveRegion = page.getByTestId('collection-range-announcement');

  await expect(summary).toHaveText(/1\u20136 di \d+ corsi/);
  await expect(pagination.getByTestId('pagination-info')).toHaveAttribute('aria-current', 'page');
  await expect(liveRegion).toBeEmpty();

  await nextButton.focus();
  await page.keyboard.press('Enter');

  await expect(summary).toHaveText(/7\u2013\d+ di \d+ corsi/);
  await expect(liveRegion).toContainText(/Visualizzazione degli elementi da 7/);
  await expect(nextButton).toBeFocused();
});

test.describe('mobile collection toolbar', () => {
  test.use({viewport: {width: 390, height: 844}, isMobile: true});

  test('GitHub Projects keeps the summary and pagination usable without horizontal overflow', async ({page}) => {
    await page.goto('github-projects/');

    await expect(page.getByRole('heading', {name: 'Progetti GitHub'})).toBeVisible();
    await expect(page.getByTestId('collection-summary')).toHaveText(/1\u20133 di \d+ repository/);
    await expect(page.getByRole('navigation', {name: 'Paginazione'})).toBeVisible();

    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));

    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth + 1);
  });
});
