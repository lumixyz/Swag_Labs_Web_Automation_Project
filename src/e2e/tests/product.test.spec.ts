import {test, expect} from "../fixtures/base.fixture";
import * as productData from "../utils/testData/product.data.json";
import * as messages from "../utils/testData/messages.data.json";


test.describe('Product Tests', () =>{
    for(const data of productData.valid){
        test.describe('Add & remove items on product page', () =>{
            test(`Add product to cart ${data.id}`, async ({login, product}) => {
                await login.auth();
                await product.resetApp();
                await product.addorRemFromCartOnHome(data.item);
                expect(product.addToCartBtn(data.item)).toHaveText(messages.remove_from_cart_text);
            })

            test(`Remove product to cart ${data.id}`, async ({login, product}) => {
                await login.auth();
                await product.resetApp();
                await product.addorRemFromCartOnHome(data.item);
                expect(product.addToCartBtn(data.item)).toHaveText(messages.remove_from_cart_text);
                await product.addorRemFromCartOnHome(data.item);
                expect(product.addToCartBtn(data.item)).toHaveText(messages.add_to_cart_text);
            })
        }) 
    }

    test.describe("Filter products",() =>{
        test("Filter products by price: highest to lowest price", async ({login, product}) => {
            await login.auth();
            await product.filterBy('Price (high to low)');
            expect(await product.checkFilterByPriceWorks('Price (high to low)')).toEqual(true);
        })

        test("Filter products by price: lowest to highest price", async ({login, product}) => {
            await login.auth();
            await product.filterBy('Price (low to high)');
            expect(await product.checkFilterByPriceWorks('Price (low to high)')).toEqual(true);
        })
        
        test("Filter products by name: a - z", async ({login, product}) => {
            await login.auth();
            await product.filterBy('Name (A to Z)');
            expect(await product.checkFilterByNameWorks('Name (A to Z)')).toEqual(true);
        })

        test("Filter products by name: z - a", async ({login, product}) => {
            await login.auth();
            await product.filterBy('Name (Z to A)');
            expect(await product.checkFilterByNameWorks('Name (Z to A)')).toEqual(true);
        })
    })
})