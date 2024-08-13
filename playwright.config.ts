import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';


// Read from ".env" file.
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: 'src/e2e/tests',

  fullyParallel: false,
  maxFailures: process.env.CI ? 10 : undefined,

  timeout: 1*30*1000,
  expect: {
    timeout: 5000,
    toHaveScreenshot: { 
      maxDiffPixels: 100, 
    },
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
  }], ["dot"]] : [["line"], ["allure-playwright"], ["json", 
    { outputFile: "report.json"}]],

  shard: { total: 10, current: 3 },
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: !!process.env.CI,
    baseURL: 'https://www.saucedemo.com/',
    video: process.env.CI? "off":"on",
    trace: process.env.CI? "off":"on-first-retry",
    screenshot: process.env.CI? "off":"on",
  },

  /* Configure projects for major browsers */
  projects: [
    
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome']},
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox']},
    // },

    // {
    //   name: 'Google Chrome',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     channel: 'chrome'
    //   }},
  ],
});
