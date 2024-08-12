import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */

// Read from ".env" file.
dotenv.config({ path: path.resolve(__dirname, '.env') });

// Alternatively, read from "../my.env" file.
dotenv.config({ path: path.resolve(__dirname, '..', 'my.env') });

export default defineConfig({
  testDir: 'src/e2e/tests',
  /* Run tests in files in parallel */
  // path to the global setup files.
  //globalSetup: require.resolve('./global-setup'),

  // path to the global teardown files.
  //globalTeardown: require.resolve('./global-teardown'),
  
  shard: { total: 10, current: 3 },
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',

  fullyParallel: !true,
  maxFailures: process.env.CI ? 10 : undefined,
  
  //30 seconds timeout
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
    { outputFile: "report.json"}], ["html", 
    {open: "on-failure"}]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    //baseURL: process.env.STAGING === '1' ? 'http://staging.example.test/' : 'http://example.test/',
    headless: process.env.CI? true : false,
    baseURL: 'https://www.saucedemo.com/',
    video: process.env.CI? "off":"on",
    trace: process.env.CI? "off":"on-first-retry",
    screenshot: process.env.CI? "off":"on",
  },

  /* Configure projects for major browsers */
  projects: [

    //Playwright will run all projects by default; to run only one: npx playwright test --project=firefoxs
    {
      name: 'setup',
      testMatch: '**/*.setup.ts',
    },
    
    {
      name: 'Smoke',
      testMatch: /.*smoke.spec.ts/,
      retries: 0,
    },
    {
      name: 'Default',
      testIgnore: /.*smoke.spec.ts/,
      retries: 2,
    },
    
    {
      name: 'staging',
      use: {
        baseURL: 'staging.example.com',
      },
      retries: 2,
    },
    {
      name: 'production',
      use: {
        baseURL: 'production.example.com',
      },
      retries: 0,
    },
    
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        baseURL: "xyz"
      },
      retries: 2,
      dependencies: ['setup'],
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    {
      name: 'Microsoft Edge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge'
      },
    },
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome'
      },
    },
  ],

  // Run your local dev server before starting the tests.
  webServer: {
    command: 'npm run start',
    url: 'http://127.0.0.1:3000',
    reuseExistingServer: !process.env.CI,
  }
});
