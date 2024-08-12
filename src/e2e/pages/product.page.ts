import Base from './base.page';

export default class Product extends Base{

    async getProducts(){
        await this.page.goto('/inventory.html');
    }

   //Locators
   menu = () => this.page.locator( '#react-burger-menu-btn');
   menuList = () => this.page.locator(".bm-item-list>a");
   closeMenuBtn = () => this.page.locator('#react-burger-cross-btn');
   pageTitle = () => this.page.locator('.title');
   filter = () => this.page.locator('//*[@id="header_container"]/div[2]/div/span/select');
   cart = () => this.page.locator('.shopping_cart_link');
   itemsList = () => this.page.locator("//div[@class='inventory_list']//a[contains(@data-test, 'title')]//div");
   addToCartBtnList = () => this.page.locator("//div[@class='inventory_list']//button");
   priceList = () => this.page.locator('//*[@id= "inventory_container"]/div/div/div[2]/div[2]/div');
   
   //Actions
    async getMenu(){
        await this.menu().click();
    }

    async getAllItems(){
        await this.getMenu();
        await this.menuList().filter({hasText: "all items"}).click();
    }

    async getAboutPage(){
        await this.getMenu();
        await this.menuList().filter({hasText: "about"}).click();
    }

    async logout(){
        await this.getMenu();
        await this.menuList().filter({hasText: "logout"}).click();
    }

    async resetApp(){
        await this.getMenu();
        await this.menuList().filter({hasText: "reset app state"}).click();
    }

    async closeMenu(){
        await this.getMenu();
        await this.closeMenuBtn().click();
    }

    async goToCart(){
        await this.cart().click();
    }

    async filterBy(filterText: string){
        await this.filter().selectOption(filterText);
    }

    async getItem(name: string){
        this.itemsList().filter({hasText: name}).click();
    } 

    async addorRemFromCartOnHome(item: string){
        let itemText: string = this.refactorItemName(item);
        await this.page
        .locator("//div[@class='inventory_list']//button[contains(@name," + "'" + itemText + "'" + ")]").click();
    }

    addToCartBtn(item: string){
        let Text: string = this.refactorItemName(item);
        return this.page.locator("//div[@class='inventory_list']//button[contains(@name," + "'" + Text + "'" + ")]");
    }

    async checkFilterByPriceWorks(filterText: string){
        if(filterText.toLowerCase() !=='price (high to low)' && filterText.toLowerCase() !== 'price (low to high)')
            {return  "Enter valid filter text";}
        
        const prices = await this.priceList().evaluateAll(
            list => list.map(
                ele => {
                    let val = ele.textContent!.trim().substring(1);
                    return parseFloat(val);
                }
            )
        );

        console.log(prices);

        switch(filterText.toLowerCase()) {
            case 'price (low to high)':
                for(let i = 0; i < prices.length-1; i++){
                        if (prices[i] > prices[i+1]){
                            return false;
                        }
                 } 
              break;
            case 'price (high to low)':
                for(let i = 0; i < prices.length-1; i++){
                        if (prices[i] < prices[i+1]){
                            return false;
                        }   
                } 
              break;
          }
          return true;
    }

    async checkFilterByNameWorks(filterText: string){
        if(filterText.toLowerCase() !=='name (a to z)' && filterText.toLowerCase() !== 'name (z to a)')
            {return  "Enter valid filter text";}
        
        let names = await this.itemsList().allTextContents();
        console.log(names);

        switch(filterText.toLowerCase()) {
            case 'name (a to z)':
                for(let i = 0; i < names.length-1; i++){
                        if (names[i] > names[i+1]){
                           return false;
                        }
                 } 
              break;
            case 'name (z to a)':
                for(let i = 0; i < names.length-1; i++){
                        if (names[i] < names[i+1]){
                            return false;
                        }   
                } 
              break;
          }
          return true;
    }
 
    
    async proceedToShop(item:string){
        await this.resetApp();
        await this.addorRemFromCartOnHome(item);
        await this.goToCart();
    }
}