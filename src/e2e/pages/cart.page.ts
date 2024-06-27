import Base from './base.page';

export default class Cart extends Base{

    async getCart(){
        await this.page.goto('/cart.html');
    }

   //Locators
   continueShopping = '#continue-shopping';
   checkout = '#checkout';
   pageTitle = '.title';
   removeBtnList = "//button[contains(@id, 'remove-')]";


   //Actions
    async removeItem(itemName: string){
        let itemText = "remove-" + itemName.split(' ').join('-').toLowerCase();
        await this.page.locator("//button[contains(@id, " + "'" + itemText + "'" + ")]").click();
    }

    async checkItemInCart(item: string){
        let boolVal = await this.page.locator("//div[normalize-space()=" + "'" + item +"'" + "]").isVisible();
        if(boolVal) return true;
    }

} 