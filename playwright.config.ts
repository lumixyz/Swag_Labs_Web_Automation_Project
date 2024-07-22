import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

export default defineConfig({
  testDir: 'src/e2e/tests',
  /* Run tests in files in parallel */
  fullyParallel: !true,
  //30 seconds timeout
  timeout: 1*30*1000,
  expect: {
    timeout: 5000
  },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 2,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: process.env.CI? [ ["junit", {
    outputFile: "results.xml"
  }]] : [["json", 
    { outputFile: "report.json"}], ["html", 
    {open: "on-failure"}]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: process.env.CI? true : false,
    baseURL: 'https://www.saucedemo.com/',
    video: process.env.CI? "off":"on",
    trace: process.env.CI? "off":"on",
    screenshot: process.env.CI? "off":"on",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ]
});
