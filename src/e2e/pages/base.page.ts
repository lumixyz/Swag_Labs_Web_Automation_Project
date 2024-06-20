import {Page} from '@playwright/test';

export default class Base{

    page: Page;

    constructor(page:Page ){
        this.page = page
    }

    //Common Actions
    getEle(locator: string){
        return this.page.locator(locator);
      }

      async getMultiEles(multiLocator: string, eleText: string){
        const elements = await this.page.$$(multiLocator);
        for(const ele of elements){
            if (await ele.textContent() == eleText) ele.click();
        }
      }
}
