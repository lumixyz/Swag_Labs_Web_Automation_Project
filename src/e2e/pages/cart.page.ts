import Base from './base.page';

export default class Cart extends Base{

    async getCart(){
        await this.page.goto('/cart.html');
    }

   //Locators
   continueShopping = '#continue-shopping';
   checkout = '#checkout';
   pageTitle = '.title';
   cartIconNo = '.shopping_cart_badge';
   removeBtnList = "//button[contains(@id, 'remove-')]";
   priceList = "//div[@class='inventory_item_price']/text()[2]";

   //Actions
   async getCheckout(){
    await this.page.locator(this.checkout).click();
   }

   async getProductsPage(){
    await this.page.locator(this.continueShopping).click();
   }
   
   async removeItem(itemName: string){
        let itemText = "remove-" + itemName.split(' ').join('-').toLowerCase();
        await this.page.locator("//button[contains(@id, " + "'" + itemText + "'" + ")]").click();
    }

    async checkItemInCart(itemName: string){
        let item = (await this.titleCase(itemName)).toString();
        let boolVal = await this.page.locator("//div[normalize-space()=" + "'" + item +"'" + "]").isVisible();
        if(boolVal){
            return true
        }else{return false};
    }

    async getCartBadge(){
        return this.page.locator(this.cartIconNo); //assert on the text content of the ele
    }

} 