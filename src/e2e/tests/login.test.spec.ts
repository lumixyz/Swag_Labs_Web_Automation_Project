import {test, expect} from "../fixtures/base.fixture";
import {loginData} from "../utils/testData/login.data";
import {messages} from "../utils/testData/messages.data";


test.describe('Login Tests', () =>{
    for(const data of loginData.valid){
        test.describe('Login valid tests', () =>{
            test(`Valid login ${data.id}`, async ({login, product}) => {
                await login.setUname(data.username);
                await login.setPassword(data.password);
                await login.clickLoginBtn();
                await expect(product.getEle(product.pageTitle)).toContainText(messages.login_success);
            })
        })
    }

    for(const data of loginData.invalid){
        test.describe('Login invalid tests', () =>{
            test(`Invalid credentials login ${data.id}`, async ({login}) => {
                await login.setUname(data.username);
                await login.setPassword(data.password);
                await login.clickLoginBtn();
                await expect(login.getEle(login.loginErr)).toContainText(messages.login_error);
            })


            test(`Empty password login ${data.id}`, async ({login}) => {
                await login.setUname(data.username);
                await login.clickLoginBtn();
                await expect(login.getEle(login.loginErr)).toContainText(messages.password_required);
            })


            test(`Empty username login ${data.id}`, async ({login}) => {
                await login.setPassword(data.password);
                await login.clickLoginBtn();
                await expect(login.getEle(login.loginErr)).toContainText(messages.username_required);
            })

        })
    }
})