import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { DashboardPage } from '../pages/dashboardpage';
import { LeftNavigator } from '../pages/leftNavigator';
import { BuzzPage } from '../pages/buzzPage';
import path from 'node:path';

const videoUrl = 'https://youtu.be/g5oUluD9ScA?si=dyHtTn7KJ07bURit';
const buzzPhotoPath = path.join(__dirname, '../test-data/buzzImage.png');

test.describe('Buzz page', () => {

    test.beforeEach(async ({ page }) => {

        const loginPage = new LoginPage(page);
        const dashboardPage = new DashboardPage(page);

        await test.step('Login to Application', async () => {
            await loginPage.navigate('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
            await loginPage.login('Admin', 'admin123');
            await expect(dashboardPage.dashboardHeading).toBeVisible();
        })
    });

    test('E2E Buzz creation and deletion', async ({ page }) => {

        test.setTimeout(40000);
        const leftNavigator = new LeftNavigator(page);
        const buzzPage = new BuzzPage(page);


        await test.step('Navigating to Buzz page, Create and Delete Buzz text', async () => {
            await leftNavigator.navigateToBuzzPage();
            await expect(buzzPage.buzzHeading).toBeVisible();
            await buzzPage.enterBuzzText("Hii Everyone!, This is Mahendra");
            await buzzPage.clickOnPostButton();
            await expect(buzzPage.successMessage).toBeVisible();
            await buzzPage.clickOnThreeDotMenu();
            await buzzPage.clickOnDeletePost();
            await buzzPage.clickOnConfirmDeleteButton();
            await expect(buzzPage.successMessage).toBeVisible();

        })

        await test.step(' Create buzz adding photo and Delete Buzz ', async () => {
            await buzzPage.clickOnSharePhotosButton();
            await buzzPage.uploadPhoto(buzzPhotoPath);
            await buzzPage.clickOnShareButton();
            await expect(buzzPage.successMessage).toBeVisible();
            await buzzPage.clickOnThreeDotMenu();
            await buzzPage.clickOnDeletePost();
            await buzzPage.clickOnConfirmDeleteButton();
            await expect(buzzPage.successMessage).toBeVisible();

        })
        await test.step(' Create buzz adding url and Delete Buzz ', async () => {
            await buzzPage.clickOnShareVideoButton();
            await buzzPage.enterVideoUrlInput(videoUrl);
            await buzzPage.clickOnShareButton();
            await expect(buzzPage.successMessage).toBeVisible();
            await buzzPage.clickOnThreeDotMenu();
            await buzzPage.clickOnDeletePost();
            await buzzPage.clickOnConfirmDeleteButton();
            await expect(buzzPage.successMessage).toBeVisible();

        })

    });

});