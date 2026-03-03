import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class BuzzPage extends BasePage {

    readonly buzzHeading: Locator;
    readonly buzzTextInput: Locator;
    readonly postButton: Locator;
    readonly sharePhotosButton: Locator;
    readonly shareVideoButton: Locator;
    readonly addPhotoBtn: Locator;
    readonly shareButton: Locator;
    readonly videoUrlInput: Locator;
    readonly latestPostText: Locator;
    readonly threeDotMenu: Locator;
    readonly deletePost: Locator;
    readonly confirmDeleteButton: Locator;
    readonly successMessage: Locator;


    constructor(page: Page) {
        super(page);

        this.buzzHeading = page.getByRole('heading', { name: 'Buzz' });
        this.buzzTextInput = page.getByPlaceholder("What's on your mind?");
        this.successMessage = page.getByText('Success', { exact: true });
        this.postButton = page.getByRole('button', { name: 'Post', exact: true });
        this.sharePhotosButton = page.getByRole('button', { name: 'Share Photos' });
        this.shareButton = page.getByRole('button', { name: 'Share', exact: true });
        this.shareVideoButton = page.getByRole('button', { name: 'Share Video' });
        this.addPhotoBtn = page.locator('input[type="file"]');
        this.videoUrlInput = page.getByPlaceholder('Paste Video URL');
        this.latestPostText = page.locator('div.orangehrm-buzz-post-body').locator('p').nth(0);
        this.deletePost = page.getByText('Delete Post', { exact: true });
        this.threeDotMenu = page.locator('i.oxd-icon.bi-three-dots').first();
        this.confirmDeleteButton = page.getByRole('button', { name: 'Yes, Delete' });
    }

    async clickOnPostButton() {
        this.click(this.postButton);
    }
    async clickOnSharePhotosButton() {
        this.click(this.sharePhotosButton);
    }
    async clickOnShareButton() {
        await expect(this.shareButton).toBeVisible();
        this.click(this.shareButton);
        this.pause(2);
    }
    async clickOnShareVideoButton() {
        this.click(this.shareVideoButton);
    }
    async clickOnThreeDotMenu() {
        await this.waitForNetworkIdle();
        await expect(this.threeDotMenu).toBeVisible();
        this.click(this.threeDotMenu);
    }
    async clickOnDeletePost() {
        this.click(this.deletePost);
    }
    async uploadPhoto(path: string) {
        this.uploadFile(this.addPhotoBtn, path);
    }
    async enterBuzzText(text: string) {
        this.type(this.buzzTextInput, text);
    }
    async enterVideoUrlInput(url: string) {
        this.type(this.videoUrlInput, url);
    }
    async clickOnConfirmDeleteButton() {
        await this.click(this.confirmDeleteButton);
    }


}