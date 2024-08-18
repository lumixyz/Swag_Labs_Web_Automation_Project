import Base from './base.page';

export default class Login extends Base{

    async getLogin(){
        await this.page.goto('/');
    }

   //Locators
   userName = () => this.page.locator('#user-name');
   password = () => this.page.locator('#password');
   loginBtn = () => this.page.locator('#login-button');
   loginErr = () => this.page.locator("//*[@id='login_button_container']/div/form/div[3]/h3");
   pageTitle = () => this.page.locator('.title');

   //Actions
    async setUname(username: string){
        await this.userName().fill(username);
    }

    async setPassword(password: string){
        await this.password().fill(password);
    }

    async clickLoginBtn(){
        await this.loginBtn().click();
    }

    async getLoginErr(){
        return this.loginErr();
    }

    //auth
    async auth(){
        await this.setUname('standard_user');
        await this.setPassword('secret_sauce');
        await this.clickLoginBtn();
    } 

} 