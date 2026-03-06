import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardpage';
import { LeftNavigator } from '../pages/leftNavigator';
import { PIMPage } from '../pages/pimPage';

test.describe('PIM Page', () => {

    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await loginPage.login('Admin', 'admin123');
    });

    test('E2e PIM employee creation and deletion', async ({ page }) => {

        const dashboardPage = new DashboardPage(page);
        const leftNavigator = new LeftNavigator(page);
        const pimPage = new PIMPage(page);

        await test.step('Create a New employee', async () => {
            await expect(dashboardPage.dashboardHeading).toBeVisible();
            await leftNavigator.navigateToPIMPage();
            await expect(pimPage.pimHeading).toBeVisible();
            await pimPage.clickAddButton();
            await pimPage.enterFirstName('Mahendra');
            await pimPage.enterLastName('J');
            await pimPage.clickSaveButton(0);
            await pimPage.selectBloodType();
            await pimPage.clickSaveButton(1);
            await expect(pimPage.successMessage).toBeVisible();
        });

        await test.step('Search employee and Delete', async () => {
            await leftNavigator.navigateToPIMPage();
            await expect(pimPage.pimHeading).toBeVisible();
            await pimPage.enterEmpNameInSearchInput('Mahendra');
            await pimPage.clickSearchButton();
            await expect(pimPage.empNameText).toBeVisible();
            await pimPage.clickDeleteIcon();
            await pimPage.clickConfirmDeleteIcon();
            await expect(pimPage.successMessage).toBeVisible();
        });

    });
});