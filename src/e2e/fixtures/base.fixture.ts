import {test as base} from '@playwright/test';
import Login from '../pages/login.page';
import Product from '../pages/product.page';
import Cart from '../pages/cart.page';
import Checkout from '../pages/checkout.page';


type TestFixtures = {
    auth : Login,
    login : Login,
    product : Product,
    cart: Cart,
    checkout: Checkout,
}


export const test = base.extend<TestFixtures>({
    
    auth: async({page}, use) => {
        const login = new Login(page);
        await login.getLogin();
        await login.setUname('standard_user');
        await login.setPassword('secret_sauce');
        await login.clickLoginBtn();
        await use(login); 
        console.log("teardown auth");
    }, 

    login: async({page}, use) => {
        const login = new Login(page);
        await login.getLogin();
        await use(login);
    },

    product: async ({page, auth}, use) => {
        await use(new Product(page));
    },

    cart: async ({page, auth}, use) => {
        const cart = new Cart(page);
        await cart.getCheckout();
        await use(cart);
    },
    
    checkout: async({page, auth}, use) =>{
        const checkout = new Checkout(page);
        await checkout.getCheckout();
        await use(checkout);
    }
})

export const expect = base.expect;
