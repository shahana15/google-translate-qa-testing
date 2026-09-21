// @ts-check
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: { timeout: 8000 },
  fullyParallel: false,        // Google Translate is a live third-party site;
  workers: 1,                  // run serially to avoid rate limiting / flakiness.
  retries: 1,                  // one retry cushions transient network/UI hiccups.
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: 'https://translate.google.com/',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10000,
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // Uncomment to widen coverage once the chromium run is stable:
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit',  use: { ...devices['Desktop Safari'] } },
  ],
});
