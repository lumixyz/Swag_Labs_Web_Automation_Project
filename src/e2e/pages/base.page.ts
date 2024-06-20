import {Page} from '@playwright/test';

export default class Base{

    page: Page;

    constructor(page:Page ){
        this.page = page
    }

    //Common Actions
    getEle(element: string){
        return this.page.locator(element);
      }
}
