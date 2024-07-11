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
   filter = () => this.page.locator('.product_sort_container');
   cart = () => this.page.locator('.shopping_cart_link');
   itemsList = () => this.page.locator("//div[@class='inventory_list']//a[contains(@data-test, 'title')]//div");
   addToCartBtnList = () => this.page.locator("//div[@class='inventory_list']//button");
   priceList = () => this.page.locator("//div[@class='inventory_item_price']/text()[2]");


   //Actions
    async getMenu(){
        await this.menu().click();
    }

    async getAllItems(){
        await this.menuList().filter({hasText: "all items"}).click();
    }

    async getAboutPage(){
        await this.menuList().filter({hasText: "about"}).click();
    }

    async logout(){
        await this.menuList().filter({hasText: "logout"}).click();
    }

    async resetApp(){
        await this.menuList().filter({hasText: "reset app state"}).click();
    }

    async closeMenu(){
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

    async addToCartFromHome(item: string){
        let itemText = item.split(' ').join('-').toLowerCase();
        await this.page
        .locator("//div[@class='inventory_list']//button[contains(@name," + "'" + itemText + "'" + ")]").click();
    }

    async checkFilterByPriceWorks(filterText: string){
        let prices = await this.priceList().allInnerTexts();
        let boolVal = true;

        switch(filterText.toLowerCase()) {
            case 'price (low to high)':
                for(let i = 0; i < prices.length-1; i++){
                        if (prices[i] > prices[i+1]){
                            boolVal = false;
                            break;
                        }
                 } 
              break;
            case 'price (high to low)':
                for(let i = 0; i < prices.length-1; i++){
                        if (prices[i] < prices[i+1]){
                            boolVal = false;
                            break;
                        }   
                } 
              break;
          }

          return boolVal;
    }

    async checkFilterByNameWorks(filterText: string){
        let names = await this.itemsList().allTextContents();
        let boolVal = true;

        switch(filterText.toLowerCase()) {
            case 'name (a to z)':
                for(let i = 0; i < names.length-1; i++){
                        if (names[i] > names[i+1]){
                            boolVal = false;
                            break;
                        }
                 } 
              break;
            case 'name (z to a)':
                for(let i = 0; i < names.length-1; i++){
                        if (names[i] < names[i+1]){
                            boolVal = false;
                            break;
                        }   
                } 
              break;
          }

          return boolVal;
    }
    
}