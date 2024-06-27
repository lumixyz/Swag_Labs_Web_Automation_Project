import Base from './base.page';

export default class Product extends Base{

    async getProducts(){
        await this.page.goto('/inventory.html');
    }

   //Locators
   menu = '#react-burger-menu-btn';
   menuList = ".bm-item-list>a";
   closeMenuBtn = '#react-burger-cross-btn';
   pageTitle = '.title';
   filter = '.product_sort_container';
   cart = '.shopping_cart_link';
   itemsList = "//div[@class='inventory_list']//a[contains(@data-test, 'title')]//div";
   addToCartBtnList = "//div[@class='inventory_list']//button";
   priceList = "//div[@class='inventory_item_price']/text()[2]";


   //Actions
    async getMenu(){
        await this.page.locator(this.menu).click();
    }

    async getAllItems(){
        await this.page.locator(this.menuList).first().click();
    }

    async getAboutPage(){
        await this.page.locator(this.menuList).nth(2).click();
    }

    async logout(){
        await this.page.locator(this.menuList).nth(3).click();
    }

    async resetApp(){
        await this.page.locator(this.menuList).last().click();
    }

    async closeMenu(){
        await this.page.locator(this.closeMenuBtn).click();
    }

    async goToCart(){
        await this.page.locator(this.cart).click();
    }

    async filterBy(filterText: string){
        await this.page.locator(this.filter).selectOption(filterText);
    }

    async getItem(name: string){
        await this.getMultiEles(this.itemsList, name);
    }

    async addToCartFromHome(item: string){
        let itemText = item.split(' ').join('-').toLowerCase();
        await this.page
        .locator("//div[@class='inventory_list']//button[contains(@name," + "'" + itemText + "'" + ")]").click();
    }

    async checkFilterByPriceWorks(filterText: string){
        let prices = await this.page.locator(this.priceList).allInnerTexts();
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
        let names = await this.page.locator(this.itemsList).allTextContents();
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