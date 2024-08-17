import{test, expect} from "../fixtures/axe.fixture.ts";

test.describe('Product page accessibility', () => { 
  test('should not have any automatically detectable accessibility issues', async ({ page, makeAxeBuilder}, testInfo) => {
    await page.goto("/inventory.html"); 

    const accessibilityScanResults = await makeAxeBuilder().analyze();

    expect(accessibilityScanResults.violations).toEqual([]); 
  });
});

test.describe('Navigation menu accessibility', () => { 
    test('should not have any automatically detectable accessibility issues', async ({ page, product, makeAxeBuilder}, testInfo) => {
      await page.goto("/inventory.html");
      await product.getMenu();
  
      const accessibilityScanResults = await makeAxeBuilder().analyze();
  
      expect(accessibilityScanResults.violations).toEqual([]); 
    });
  });