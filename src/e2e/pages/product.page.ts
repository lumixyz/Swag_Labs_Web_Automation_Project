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
   priceList = "//div[@class='inventory_item_price']";


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

    async getCart(){
        await this.page.locator(this.cart).click();
    }

    //values: az, za, hilo, lohi
    async filterBy(value: string){
        await this.page.locator(this.filter).selectOption({value: value});
    }

    async getItem(name: string){
        this.getMultiEles(this.itemsList, name);
    }

    
    
}