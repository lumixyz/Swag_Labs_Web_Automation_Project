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
    
    login: [async({page}, use) => {
        const login = new Login(page);
        await login.getLogin();
        await login.auth();
        await use(login);
    },{auto:true}],

    product: async ({page}, use) => {
        await use(new Product(page));
    },

    cart: async ({page}, use) => {
        await use(new Cart(page));
    },
    
    checkout: async({page}, use) =>{
        await use(new Checkout(page));
    }
})

export const expect = base.expect;
