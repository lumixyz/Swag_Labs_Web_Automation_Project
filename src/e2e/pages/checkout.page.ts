import Base from './base.page';

export default class Checkout extends Base{

    async getCheckout(){
        await this.page.goto('/checkout-step-one.html');
    }

   //Locators
   title = () => this.page.locator('//*[@id="header_container"]/div[2]/span');
   fName = () => this.page.locator('#first-name');
   lName = () => this.page.locator('#last-name');
   postcalCode = () => this.page.locator('#postal-code');
   continue = () => this.page.locator('#continue');
   cancel = () => this.page.locator('#cancel');
   errMsg = () => this.page.locator("h3[data-test='error']");
   cartItemList = () => this.page.locator("#checkout_summary_container > div > div.cart_list > div.cart_item > div>a>div.inventory_item_name");
   cartQuantity = () => this.page.locator("//*[@id='checkout_summary_container']/div/div[1]/div[4]/div");
   subTotalPrice = () => this.page.locator("//div[@class = 'summary_subtotal_label']");
   tax = () => this.page.locator("//div[@class = 'summary_tax_label']");
   totalPrice = () => this.page.locator("//div[@class = 'summary_total_label']");
   finish = () => this.page.locator('#finish');
   backHome = () => this.page.locator('#back-to-products');
   checkoutCompleteMsg = () => this.page.locator('#checkout_complete_container > h2');
 
   //Actions
   async getTitle(){
        return this.title();
   } 
   
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

    async getSubTotal() {
        return await this.subTotalPrice().textContent();
    }
    
    async getTax() {
        return await this.tax().textContent();
    }
    
    async getTotal() {
        return await this.totalPrice().textContent();
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