import {test, expect} from "../fixtures/base.fixture";



test("Logout test", async ({login, product}) => {
       await login.auth();
       await product.getMenu();
       await product.logout();
       await expect(login.userName()).toBeVisible();         
    })
        