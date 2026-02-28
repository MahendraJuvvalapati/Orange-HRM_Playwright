import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { ForgotPassword } from '../pages/forgotPassword';

test.describe('Forgot Password Feature', () => {

    let loginPage: LoginPage;
    let forgotPassword: ForgotPassword;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });


    test('Verify succesful password reset', async ({ page }) => {

        await loginPage.clickForgotPassword();

        forgotPassword = new ForgotPassword(page);
        await expect(forgotPassword.resetPasswordHeading).toBeVisible();

        await forgotPassword.enterUsername('Mahendra');
        await forgotPassword.clickResetPasswordBtn();

        await expect(forgotPassword.succesfullReset).toBeVisible();
    })

    test('verfiy cancel forgot password', async ({ page }) => {

        await loginPage.clickForgotPassword();
        forgotPassword = new ForgotPassword(page);
        await expect(forgotPassword.resetPasswordHeading).toBeVisible();

        await forgotPassword.enterUsername('Mahendra');
        await forgotPassword.clickCancelButton();

        await expect(loginPage.loginPageHeading).toBeVisible();
    })



});