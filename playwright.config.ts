import {defineConfig, devices} from '@playwright/test';

const previewHost = '127.0.0.1';
const previewPort = Number(process.env.PLAYWRIGHT_PORT ?? 4173);
const githubPagesBasePath = '/ingdanielemasone/';
const previewBaseUrl = `http://${previewHost}:${previewPort}${githubPagesBasePath}`;

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 30_000,
  expect: {
    timeout: 7_500,
  },
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [
    ['list'],
    ['html', {open: 'never'}],
  ],
  use: {
    ...devices['Desktop Chrome'],
    baseURL: previewBaseUrl,
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: process.env.CI ? 'retain-on-failure' : 'off',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        viewport: {width: 1440, height: 900},
      },
    },
  ],
});
