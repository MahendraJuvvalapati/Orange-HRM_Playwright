import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardpage';
import { AdminPage } from '../pages/adminPage';
import { LeftNavigator } from '../pages/leftNavigator';

test.describe('Admin page', () => {

    test.beforeEach(async ({ page }) => {

        const loginPage = new LoginPage(page);

        test.step('Login to Application', async () => {
            await loginPage.navigate('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
            await loginPage.login('Admin', 'admin123');
        })
    });

    test('E2E Admin creation and deletion', async ({ page }) => {

        test.setTimeout(400000);
        const dashboardPage = new DashboardPage(page);
        const leftNavigator = new LeftNavigator(page);
        const adminPage = new AdminPage(page);

        await test.step('Create new admin', async () => {
            await expect(dashboardPage.dashboardHeading).toBeVisible();
            await leftNavigator.navigateToAdminPage();
            await adminPage.clickOnAddButton();
            await adminPage.selectUserRole();
            await adminPage.enterEmployeeName('a');
            await adminPage.selectStatus();
            await adminPage.enterUsername('Mahendra');
            await adminPage.enterPassword('Mahe@1234')
            await adminPage.enterConfirmPassword('Mahe@1234');
            await adminPage.clickOnSaveButton();
            await expect(adminPage.successMessage).toBeVisible();
        });

        await test.step('Search User and Delete', async () => {

            await adminPage.enterUsernameIntoSearch('Mahendra');
            await adminPage.clickOnSearchButton();
            await adminPage.verifyUsernameVisible('Mahendra');
            await adminPage.clickOnDeleteIcon();
            await adminPage.clickOnConfirmDeleteButton();
            await expect(adminPage.successMessage).toBeVisible();
        })

    });

});