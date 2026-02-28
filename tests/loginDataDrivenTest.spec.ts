import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage.ts';
import { JSONHelper } from '../utils/jsonutil.ts';

const loginData = JSONHelper.readJSON('loginData.json');

test.describe('Login Data Driven Tests', () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  loginData.forEach((data: any) => {

    test(`Login test with ${data.username} / ${data.password}`, async ({ page }) => {

      await loginPage.navigate('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
      await loginPage.login(data.username, data.password);

      if (data.expectedResult === 'success') {
        await expect(page).toHaveURL(/dashboard/);
      } else {
        await expect(loginPage.invalidCredsMessage).toBeVisible();
      }
    });

  });

});