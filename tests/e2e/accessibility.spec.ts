import {expect, test} from '@playwright/test';

test('keyboard users can reach and use the skip link', async ({page}) => {
  await page.goto('./');

  const skipLink = page.getByRole('link', {name: 'Vai al contenuto principale'});
  await page.keyboard.press('Tab');
  await expect(skipLink).toBeFocused();

  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
});

test('desktop header controls are keyboard reachable', async ({page}) => {
  await page.goto('./');

  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', {name: /Homepage di Daniele Masone/i})).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', {name: 'Home', exact: true})).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.getByRole('button', {name: 'Portfolio'})).toBeFocused();
});

test.describe('mobile keyboard navigation', () => {
  test.use({viewport: {width: 390, height: 844}, isMobile: true});

  test('mobile menu opens and closes from the keyboard-accessible control', async ({page}) => {
    await page.goto('./');

    const menuButton = page.getByRole('button', {name: /Apri menu di navigazione/i});
    await menuButton.focus();
    await page.keyboard.press('Enter');

    await expect(page.getByRole('navigation', {name: /Navigazione mobile/i})).toBeVisible();
    await expect(page.getByRole('button', {name: /Chiudi menu di navigazione/i})).toBeFocused();

    await page.keyboard.press('Enter');
    await expect(page.getByRole('navigation', {name: /Navigazione mobile/i})).toBeHidden();
  });
});

test('trading chart exposes a non-visual data table fallback', async ({page}) => {
  await page.goto('trading/');

  await expect(page.getByRole('heading', {name: 'La mia attività di Trading'})).toBeVisible();
  await expect(page.getByRole('img', {name: /Performance - Vista Mensile/i})).toBeVisible();
  await expect(page.getByRole('table', {name: /Performance - Vista Mensile/i})).toBeAttached();
});

test('structured experience and project descriptions expand with semantic lists', async ({page}) => {
  await page.goto('experience/');

  const currentExperience = page.getByTestId('experience-card').first();
  const experienceToggle = currentExperience.getByRole('button', {name: 'Mostra tutto'});
  await experienceToggle.click();
  await expect(currentExperience.getByRole('button', {name: 'Mostra meno'}))
    .toHaveAttribute('aria-expanded', 'true');
  await expect(currentExperience.getByRole('heading', {level: 3, name: 'Focus principali'})).toBeVisible();
  await expect(currentExperience.getByRole('listitem')).toHaveCount(8);

  await page.goto('projects/');

  const currentProject = page.getByTestId('project-card').first();
  const projectToggle = currentProject.getByRole('button', {name: 'Mostra tutto'});
  await projectToggle.click();
  await expect(currentProject.getByRole('button', {name: 'Mostra meno'}))
    .toHaveAttribute('aria-expanded', 'true');
  await expect(currentProject.getByRole('heading', {level: 3, name: 'Responsabilità principali'})).toBeVisible();
  await expect(currentProject.getByRole('listitem')).toHaveCount(7);
});

test('changed legal and disclosure surfaces reflow without horizontal overflow', async ({page}) => {
  await page.emulateMedia({reducedMotion: 'reduce'});

  const routes = ['privacy/', 'cookie-policy/', 'courses/', 'trading/'];
  const viewports = [
    {width: 1440, height: 900},
    {width: 768, height: 1024},
    {width: 390, height: 844},
  ];

  for (const viewport of viewports) {
    await page.setViewportSize(viewport);

    for (const route of routes) {
      await page.goto(route);
      await expect(page.locator('main')).toBeVisible();

      const overflow = await page.evaluate(() => (
        document.documentElement.scrollWidth - document.documentElement.clientWidth
      ));
      expect(overflow).toBeLessThanOrEqual(1);
    }
  }

  await page.setViewportSize({width: 640, height: 900});
  await page.goto('privacy/');
  await page.addStyleTag({content: 'html { font-size: 200% !important; }'});

  const enlargedTextOverflow = await page.evaluate(() => (
    document.documentElement.scrollWidth - document.documentElement.clientWidth
  ));
  expect(enlargedTextOverflow).toBeLessThanOrEqual(1);
  await expect(page.getByRole('navigation', {name: /Link del piè di pagina/i})).toBeVisible();
});
