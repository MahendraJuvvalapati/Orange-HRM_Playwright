import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class ForgotPassword extends BasePage {

    readonly resetPasswordHeading: Locator;
    readonly usernameInput: Locator;
    readonly cancelBtn: Locator;
    readonly resetPasswordbtn: Locator;
    readonly succesfullReset: Locator;

    constructor(page: Page) {
        super(page);

        this.resetPasswordHeading = page.getByRole('heading', { name: 'Reset Password' });
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.cancelBtn = page.getByRole('button', { name: 'Cancel' });
        this.resetPasswordbtn = page.getByRole('button', { name: 'Reset Password' });
        this.succesfullReset = page.getByRole('heading', { name: 'Reset Password link sent successfully' });

    }

    async enterUsername(username: string) {
        await this.type(this.usernameInput, username);
    }

    async clickCancelButton() {
        await this.click(this.cancelBtn);
    }

    async clickResetPasswordBtn() {
        await this.click(this.resetPasswordbtn);
    }

}