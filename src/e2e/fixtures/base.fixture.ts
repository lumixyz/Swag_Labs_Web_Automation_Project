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
    login: async ({page}, use) => {
        await use (new Login(page));
    },

    product: async ({page}, use) => {
        const product = new Product(page);
        await product.getProducts();
        await product.getMenu();
        await product.resetApp();
        await use(product);
    },

    cart: async ({product, page}, use) => {
        await use (new Cart(page));
    },
    
    checkout: async({cart, page}, use) =>{
        await use(new Checkout(page));
    }
})

export const expect = base.expect;
