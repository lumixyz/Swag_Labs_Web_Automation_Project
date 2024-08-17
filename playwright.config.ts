import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
require('dotenv').config();

export default defineConfig({
  testDir: 'src/e2e/tests',

  fullyParallel: false,

  maxFailures: process.env.CI ? 10 : 5,
 
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
  }], ['blob']] : [["json", 
    { outputFile: "report.json"}], ["allure-playwright", {outputFolder: "allure-results"}]],

  //shard: process.env.CI ? { total: 10, current: 3 } : undefined,

  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: !!process.env.CI,
    baseURL: 'https://www.saucedemo.com/',
    video: process.env.CI? "off":"on",
    trace: process.env.CI? "off":"on",
    screenshot: process.env.CI? "off":"on",
  },

  /* Configure projects for major browsers */
  projects: [
    {
       name: 'setup',
       testMatch: 'auth.setup.spec.ts',
    },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },

    // {
    //   name: 'Microsoft Edge',
    //   use: {
    //     ...devices['Desktop Edge'],
    //     channel: 'msedge',
    //     storageState: 'playwright/.auth/user.json',
    //   },
    //   dependencies: ['setup'],
    // },

    // {
    //   name: 'firefox',
    //   use: { 
    //     ...devices['Desktop Firefox'], 
    //     storageState: 'playwright/.auth/user.json',
    //   },
    //   dependencies: ['setup'],
    // },
    
    {
      name: 'webkit',
      use: { 
        ...devices['Desktop Safari'],
        storageState: 'playwright/.auth/user.json', 
      },
      dependencies: ['setup'],
    },
  ]
});