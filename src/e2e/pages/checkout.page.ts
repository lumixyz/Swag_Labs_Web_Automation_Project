import Base from './base.page';

export default class Checkout extends Base{

    async getCheckout(){
        await this.page.goto('/checkout-step-one.html');
    }

   //Locators
   fName = '#first-name';
   lName = '#last-name';
   postcalCode = '#postal-code';
   continue = '#continue';
   cancel = '#cancel';
   errMsg = "h3[data-test='error']";
   cartItemList = "#checkout_summary_container > div > div.cart_list > div.cart_item > div>a>div.inventory_item_name";
   cartQuantity = "//*[@id='checkout_summary_container']/div/div[1]/div[4]/div";
   subTotalPrice = "//div[@class = 'summary_subtotal_label']/text()[2]";
   tax = "//div[@class = 'summary_tax_label']/text()[2]";
   totalPrice = "//div[@class = 'summary_total_label']/text()[2]";
   finish = '#finish';
   backHome = '#back-to-products';
   checkoutCompleteMsg = '#checkout_complete_container > h2';
 
   //Actions
    async setFName(fname: string){
        await this.page.locator(this.fName).fill(fname);
    }

    async setLName(lname: string){
        await this.page.locator(this.lName).fill(lname);
    }

    async setPostCode(postcode: string){
        await this.page.locator(this.postcalCode).fill(postcode);
    }

    async clickContinue(){
        await this.page.locator(this.continue).click();
    }

    async clickCancel(){
        await this.page.locator(this.cancel).click();
    }

    async getErrMsg(){
       return this.page.locator(this.errMsg);
    }

    async getCartItems(){
        return this.page.locator(this.cartItemList);
     }

     async getSubTotal(){
        return this.page.locator(this.subTotalPrice);
     }
    
     async getTax(){
        return this.page.locator(this.tax);
     }

     async getTotal(){
        return this.page.locator(this.totalPrice);
     }

     async goHome(){
        await this.page.locator(this.backHome).click();
    }

    async clickFinish(){
        await this.page.locator(this.finish).click();
    }

    async getCompletionMsg(){
        return this.page.locator(this.checkoutCompleteMsg);
     }

} 