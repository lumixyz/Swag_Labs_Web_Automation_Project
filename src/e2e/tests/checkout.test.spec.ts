import {test, expect} from "../fixtures/base.fixture";


test.describe('Checkout details', () =>{
    test("Set personal information and get overview", async ({product, cart, checkout}) => {
        await product.proceedToShop("Sauce Labs Backpack");
        await cart.getCheckout();
       await checkout.setFName("Anna");
       await checkout.setLName("Banner");
       await checkout.setPostCode("901234");
       await checkout.clickContinue();
       expect(await checkout.getTitle()).toHaveText('Checkout: Overview');

       //Review purchase order
       expect(await cart.checkItemInCart("Sauce Labs Backpack")).toEqual(true);
       await checkout.clickFinish();
       expect(await checkout.getCompletionMsg()).toHaveText("Thank you for your order!");
    })

}) 
