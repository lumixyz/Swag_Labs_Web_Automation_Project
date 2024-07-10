import Base from './base.page';

export default class Login extends Base{

    async getLogin(){
        await this.page.goto('/');
    }

   //Locators
   userName = '#user-name';
   password = '#password';
   loginBtn = '#login-button';
   loginErr = "//*[@id='login_button_container']/div/form/div[3]/h3";


   //Actions
    async setUname(username: string){
        await this.page.locator(this.userName).fill(username);
    }

    async setPassword(password: string){
        await this.page.locator(this.password).fill(password);
    }

    async clickLoginBtn(){
        await this.page.locator(this.loginBtn).click();
    }

    async getLoginErr(){
        return this.page.locator(this.loginErr);
    }

} 