import {test, expect} from "../fixtures/base.fixture";



test("Logout test", async ({product, login}) => {
       await product.logout();
       await expect(login.userName()).toBeVisible();         
    })
        