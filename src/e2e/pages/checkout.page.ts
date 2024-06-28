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
   cancel = '#continue';
   errMsg = "h3[data-test='error']";


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
    
} 