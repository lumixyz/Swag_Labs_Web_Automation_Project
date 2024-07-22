import {test, expect} from "../fixtures/base.fixture";
import * as productData from "../utils/testData/product.data.json";
import * as messages from "../utils/testData/messages.data.json";

test.describe('Product Tests', () =>{
    for(const data of productData.valid){
        test.describe('Valid product page tests', () =>{
            test(`Add product to cart ${data.id}`, async ({login, product}) => {
                await login.auth();
                await product.resetApp();
                await product.addToCartFromHome(data.item);
                expect(product.addToCartBtn(data.item)).toHaveText(messages.remove_from_cart_text);
            })
        }) 
    }

    test.describe("Filter products by price",() =>{
        test("Filter products from highest to lowest price", async ({login, product}) => {
            await login.auth();
        })
    })
})