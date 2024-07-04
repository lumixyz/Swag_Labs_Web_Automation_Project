import {Page} from '@playwright/test';

export default class Base{

    page: Page;

    constructor(page:Page ){
        this.page = page
    }

    //Utility Methods
    getEle(locator: string){
        return this.page.locator(locator);
      }

      async getMultiEles(multiLocator: string, eleText: string){
        const elements = await this.page.$$(multiLocator);
        for(const ele of elements){
            if (await ele.textContent() == eleText) ele.click();
        }
      }

      async titleCase(str: string) {
        return str
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
     }
}
