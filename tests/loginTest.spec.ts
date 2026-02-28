import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';

test.describe('Login Feature', () => {

  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  });

  test('Login with valid credentials', async ({ page }) => {

    await expect(loginPage.loginPageHeading).toBeVisible();

    await loginPage.login('Admin', 'admin123');

    await expect(page).toHaveURL(/dashboard/);
  });

  test('Login with invalid credentials', async ({ page }) => {

    await expect(loginPage.loginPageHeading).toBeVisible();

    await loginPage.login('invalidUser', 'wrongPassword');

    await expect(loginPage.invalidCredsMessage).toBeVisible();
  });

  test('Login without credentials', async ({ page }) => {

    await expect(loginPage.loginPageHeading).toBeVisible();

    await loginPage.clickLogin();

    await expect(loginPage.requiredText).toBeVisible();
  })


});