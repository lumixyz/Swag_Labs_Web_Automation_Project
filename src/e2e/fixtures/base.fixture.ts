import {test as base} from '@playwright/test';
import Login from '../pages/login.page';
import Product from '../pages/product.page';
import Cart from '../pages/cart.page';
import Checkout from '../pages/checkout.page';


type TestFixtures = {
    login : Login,
    product : Product,
    cart: Cart,
    checkout: Checkout,
}


export const test = base.extend<TestFixtures>({
    
    login: async({page}, use) => {
        const login = new Login(page);
        await login.getLogin();
        await use(login);
    },

    product: async ({page}, use) => {
        await use(new Product(page));
    },

    cart: async ({page}, use) => {
        const cart = new Cart(page);
        await cart.getCheckout();
        await use(cart);
    },
    
    checkout: async({page}, use) =>{
        const checkout = new Checkout(page);
        await checkout.getCheckout();
        await use(checkout);
    }
})

export const expect = base.expect;
