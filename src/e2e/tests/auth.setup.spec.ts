import {test} from "../fixtures/base.fixture";

const authFile = 'playwright/.auth/user.json';

test("authenticate", async ({login, page}) => {
  await login.getLogin();
  await login.setUname("standard_user");
  await login.setPassword("secret_sauce");
  await login.clickLoginBtn();
  await page.context().storageState({ path: authFile });
})