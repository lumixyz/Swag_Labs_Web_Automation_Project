import {test, expect} from "../fixtures/base.fixture";

test.describe("Verify product images appear as they should", () =>{
    test("Products Page", async ({product, page}) => {
        await expect(page).toHaveScreenshot("products.png");
    });

    
    test("Site Title", async ({product, page}) => {
        expect(await page.textContent("//*[@id='header_container']/div[1]/div[2]/div"))
        .toMatchSnapshot("swag-labs.txt");
    });

    test("Cart Page", async ({product, page}) => {
        await product.goToCart();
        await expect(page).toHaveScreenshot("cart.png");
    });
})


test.describe("Products screenshots", () =>{
    test("Products Screenshots", async ({product, page}) => {
        await page.screenshot({ path: "src/e2e/utils/screenShots/products_screenshot.png" });
        await page.screenshot({ path: "src/e2e/utils/screenShots/products_fullpage_screenshot.png", fullPage: true });
        await page.locator("#item_4_img_link > img").screenshot({ path: "src/e2e/utils/screenShots/backpack_screenshot.png" });
    });
})