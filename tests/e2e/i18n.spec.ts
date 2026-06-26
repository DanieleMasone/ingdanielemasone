import {expect, test} from '@playwright/test';

const languages = [
  {code: 'it', nativeLabel: 'Italiano', selectLabel: 'Seleziona lingua', eyebrow: 'Portfolio e CV online'},
  {code: 'en', nativeLabel: 'English', selectLabel: 'Select language', eyebrow: 'Portfolio and online CV'},
  {code: 'fr', nativeLabel: 'Français', selectLabel: 'Choisir la langue', eyebrow: 'Portfolio et CV en ligne'},
  {code: 'de', nativeLabel: 'Deutsch', selectLabel: 'Sprache auswählen', eyebrow: 'Portfolio und Online-CV'},
  {code: 'es', nativeLabel: 'Español', selectLabel: 'Seleccionar idioma', eyebrow: 'Portfolio y CV online'},
];

test('language switcher updates visible content and document language for every supported locale', async ({page}) => {
  await page.goto('./');

  let currentLanguage = languages[0];
  await expect(page.locator('html')).toHaveAttribute('lang', currentLanguage.code);
  await expect(page.getByText(currentLanguage.eyebrow)).toBeVisible();

  for (const targetLanguage of [...languages.slice(1), languages[0]]) {
    await page.getByRole('button', {
      name: `${currentLanguage.selectLabel}: ${currentLanguage.nativeLabel}`,
    }).click();
    await page.getByRole('button', {name: targetLanguage.nativeLabel, exact: true}).click();

    await expect(page.locator('html')).toHaveAttribute('lang', targetLanguage.code);
    await expect(page.getByText(targetLanguage.eyebrow)).toBeVisible();
    await expect(page).toHaveTitle(/Daniele Masone/i);

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('lang', targetLanguage.code);
    await expect(page.getByText(targetLanguage.eyebrow)).toBeVisible();
    currentLanguage = targetLanguage;
  }
});
