import Base from './base.page';

export default class Login extends Base{

    async getLogin(){
        await this.page.goto('/');
    }

   //Locators
   userName = '#user-name';
   password = '#password';
   loginBtn = '#login-button';


   //Actions
    async setUname(username: string){
        await this.page.locator(this.userName).fill(username);
    }

    async setPassword(password: string){
        await this.page.locator(this.password).fill(password);
    }

    async clickLoginBtn(){
        await this.page.locator(this.password).click();
    }

} 