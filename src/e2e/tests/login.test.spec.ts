import {test, expect} from "../fixtures/base.fixture";
import * as loginData from "../utils/testData/login.data.json";
import * as messages from "../utils/testData/messages.data.json";

test.beforeEach(async ({login})=>{
    await login.getLogin();
})

test.describe('Login Tests', () =>{
    for(const data of loginData.valid){
        test.describe('Login valid tests', () =>{
            test(`Valid login ${data.id}`, async ({login}) => {
                await login.setUname(data.username);
                await login.setPassword(data.password);
                await login.clickLoginBtn();
                await expect(login.pageTitle()).toContainText(messages.login_success);
            })
        })
    }

    for(const data of loginData.invalid){
        test.describe('Login invalid tests', () =>{
            test(`Invalid credentials login ${data.id}`, async ({login}) => {
                await login.setUname(data.username);
                await login.setPassword(data.password);
                await login.clickLoginBtn();
                await expect(login.loginErr()).toContainText(messages.login_error);
            })


            test(`Empty password login ${data.id}`, async ({login}) => {
                await login.setUname(data.username);
                await login.clickLoginBtn();
                await expect(login.loginErr()).toContainText(messages.password_required);
            })


            test(`Empty username login ${data.id}`, async ({login}) => {
                await login.setPassword(data.password);
                await login.clickLoginBtn();
                await expect(login.loginErr()).toContainText(messages.username_required);
            })

        })
    }
})