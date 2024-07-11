import Base from './base.page';

export default class Checkout extends Base{

    async getCheckout(){
        await this.page.goto('/checkout-step-one.html');
    }

   //Locators
   fName = () => this.page.locator('#first-name');
   lName = () => this.page.locator('#last-name');
   postcalCode = () => this.page.locator('#postal-code');
   continue = () => this.page.locator('#continue');
   cancel = () => this.page.locator('#cancel');
   errMsg = () => this.page.locator("h3[data-test='error']");
   cartItemList = () => this.page.locator("#checkout_summary_container > div > div.cart_list > div.cart_item > div>a>div.inventory_item_name");
   cartQuantity = () => this.page.locator("//*[@id='checkout_summary_container']/div/div[1]/div[4]/div");
   subTotalPrice = () => this.page.locator("//div[@class = 'summary_subtotal_label']/text()[2]");
   tax = () => this.page.locator("//div[@class = 'summary_tax_label']/text()[2]");
   totalPrice = () => this.page.locator("//div[@class = 'summary_total_label']/text()[2]");
   finish = () => this.page.locator('#finish');
   backHome = () => this.page.locator('#back-to-products');
   checkoutCompleteMsg = () => this.page.locator('#checkout_complete_container > h2');
 
   //Actions
    async setFName(fname: string){
        await this.fName().fill(fname);
    }

    async setLName(lname: string){
        await this.lName().fill(lname);
    }

    async setPostCode(postcode: string){
        await this.postcalCode().fill(postcode);
    }

    async clickContinue(){
        await this.continue().click();
    }

    async clickCancel(){
        await this.cancel().click();
    }

    async getErrMsg(){
       return this.errMsg();
    }

    async getCartItems(){
        return this.cartItemList();
     }

     async getSubTotal(){
        return this.subTotalPrice();
     }
    
     async getTax(){
        return this.tax();
     }

     async getTotal(){
        return this.totalPrice();
     }

     async goHome(){
        await this.backHome().click();
    }

    async clickFinish(){
        await this.finish().click();
    }

    async getCompletionMsg(){
        return this.checkoutCompleteMsg();
     }

} 