import {test, expect} from "../fixtures/base.fixture";

const items = {
    "Sauce Labs Backpack" : "1",
    "Sauce Labs Bolt T-Shirt" : "2",
    "Sauce Labs Fleece Jacket" : "3"
}

const reversedItems = Object.entries(items).reverse();

test.describe('Items in cart', () =>{
    test("Item is in cart", async ({login, product, cart}) => {
        //await login.auth();
        await product.resetApp();
        await product.addorRemFromCartOnHome("Sauce Labs Backpack");
        await product.goToCart();
        let visible = await cart.checkItemInCart("Sauce Labs Backpack");
        expect(visible).toEqual(true);
    })

    test("Removed items are no longer in cart", async ({login, product, cart}) => {
        await login.auth();
        await product.resetApp();
        await product.addorRemFromCartOnHome("Sauce Labs Bolt T-Shirt");
        await product.goToCart();
        expect(await cart.checkItemInCart("Sauce Labs Bolt T-Shirt")).toEqual(true);
        await cart.removeItem("Sauce Labs Bolt T-Shirt");
        expect(await cart.checkItemInCart("Sauce Labs Bolt T-Shirt")).toEqual(false);
    })

}) 

test.describe('Cart icon is updated', () =>{ 
    test("Cart icon number increases when items are added", async ({login, product, cart}) => {
        await login.auth();
        await product.resetApp();
        for(const item in items){
            await product.addorRemFromCartOnHome(item);
            expect(await cart.getCartBadgeNo()).toHaveText(items[item]);
        }
    })

    test("Cart icon number decreases when items are removed", async ({login, product, cart}) => {
        await login.auth();
        await product.resetApp();
        for(const item in items){
            await product.addorRemFromCartOnHome(item);
            expect(await cart.getCartBadgeNo()).toHaveText(items[item]);
        }

        await product.goToCart();

        for (let i = 0; i < reversedItems.length; i++) {
            await cart.removeItem(reversedItems[i][0]);
            
            if (i < reversedItems.length - 1) {
                expect(await cart.getCartBadgeNo()).toHaveText(reversedItems[i+1][1]);
            } else {
                expect(await cart.getCartBadgeNo()).toBeHidden(); 
            }
        }
    })

}) 

test.describe('Go to Checkout', () =>{ 
    test("Go to cart", async ({login, product, cart, checkout}) => {
        await login.auth();
        await product.resetApp();
        for(const item in items){
            await product.addorRemFromCartOnHome(item);
            expect(await cart.getCartBadgeNo()).toHaveText(items[item]);
        }
        await product.goToCart();
        await cart.getCheckout();
        expect(await checkout.getTitle()).toHaveText("Checkout: Your Information");
    })
}) 
