import{test, expect} from "../fixtures/axe.fixture.ts";

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login page accessibility', () => { 
  test('should not have any automatically detectable accessibility issues', async ({ page, makeAxeBuilder}) => {
    await page.goto("/"); 

    const accessibilityScanResults = await makeAxeBuilder().analyze();

    expect(accessibilityScanResults.violations).toEqual([]); 
  });
});