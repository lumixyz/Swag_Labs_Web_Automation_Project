import {test, expect} from "../fixtures/base.fixture";

test.describe("Verify product images appear as they should", () =>{
    test("Products Page", async ({login, page}) => {
        await login.auth();
        await expect(page).toHaveScreenshot("products.png");
    });

    
    test("Site Title", async ({ login, page }) => {
        await login.auth();
        expect(await page.textContent("//*[@id='header_container']/div[1]/div[2]/div"))
        .toMatchSnapshot("swag-labs.txt");
    });

    test("Cart Page", async ({login, product, page}) => {
        await login.auth();
        await product.goToCart();
        await expect(page).toHaveScreenshot("cart.png");
    });
})


test.describe("Products screenshots", () =>{
    test("Products Screenshots", async ({login, page}) => {
        await login.auth();
        await page.screenshot({ path: "src/e2e/utils/screenShots/products_screenshot.png" });
        await page.screenshot({ path: "src/e2e/utils/screenShots/products_fullpage_screenshot.png", fullPage: true });
        await page.locator("#item_4_img_link > img").screenshot({ path: "src/e2e/utils/screenShots/backpack_screenshot.png" });
    });
})