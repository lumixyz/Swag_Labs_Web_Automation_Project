import {test as base} from '@playwright/test';
import Login from '../pages/login.page';
import Product from '../pages/product.page';
import Cart from '../pages/cart.page';
import Checkout from '../pages/checkout.page';
import Auth from '../pages/auth.page';


type TestFixtures = {
    login : Login,
    product : Product,
    cart: Cart,
    checkout: Checkout,
    auth: Auth
}


export const test = base.extend<TestFixtures>({
    
    auth: async ({page}, use) => {
        const auth = new Auth(page);
        await auth.getLogin();
        await auth.auth();
        await use(auth);
    },

    login: async ({page}, use) => {
        await use (new Login(page));
    },

    product: async ({auth, page}, use) => {
        const product = new Product(page);
        await product.getMenu();
        await product.resetApp();
        await use(product);
    },

    cart: async ({product, page}, use) => {
        await use(new Cart(page));
    },
    
    checkout: async({cart, page}, use) =>{
        await use(new Checkout(page));
    }
})

export const expect = base.expect;
