import {Page} from '@playwright/test';

export default class Base{

    page: Page;

    constructor(page:Page ){
        this.page = page
    }

    //Utility Methods
      async titleCase(str: string) {
        return str
          .toLowerCase()
          .split(' ')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
     }

    refactorItemName(item: string){
      return item.split(' ').join('-').toLowerCase();
    }
}
