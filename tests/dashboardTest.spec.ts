import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardpage';

test.describe('Dashboard page', () => {

    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        dashboardPage = new DashboardPage(page);

        await loginPage.navigate('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });

    test('Verify Dashboard Widgets and Logout Functionality', async ({ page }) => {

        await test.step('Login to Application', async () => {
            await loginPage.login('Admin', 'admin123');
            await expect(dashboardPage.dashboardHeading).toBeVisible();
        });

        await test.step('verify All widgets Visible', async () => {

            await expect(dashboardPage.timeAtWorkWidget).toBeVisible();
            await expect(dashboardPage.myActionsWidget).toBeVisible();
            await expect(dashboardPage.quickLaunchWidget).toBeVisible();
            await expect(dashboardPage.buzzLatestPostWidget).toBeVisible();
            await expect(dashboardPage.employeesOnLeaveTodayWidget).toBeVisible();
            await expect(dashboardPage.employeeDistributionBySubUnitWidget).toBeVisible();
            await expect(dashboardPage.employeeDistributionByLocationWidet).toBeVisible();
        });

        await test.step('verify Logout Functionality', async () => {

            await dashboardPage.clickOnUserDropDownIcon();
            await dashboardPage.clickOnLogOutButton();
            await expect(page.url()).toContain('/login');
            await expect(loginPage.loginPageHeading).toBeVisible();
        })

    });

});