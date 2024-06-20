import Base from './base.page';

export default class Product extends Base{

    async getProducts(){
        await this.page.goto('/inventory.html');
    }

   //Locators
   menu = '#react-burger-menu-btn';
   pageTitle = '.title';
   filter = '.product_sort_container';
   cart = '.shopping_cart_link';
   itemsList = "//div[@class='inventory_list']//a[contains(@data-test, 'title')]";
   addToCartBtnList = "//div[@class='inventory_list']//button";
   priceList = "//div[@class='inventory_item_price']";


   //Actions
    async setUname(username: string){
        await this.page.locator(this.menu).fill(username);
    }
}