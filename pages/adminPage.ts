import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class AdminPage extends BasePage {

    readonly adminHeading: Locator;
    readonly addButton: Locator;
    readonly userRoleDropdown: Locator;
    readonly adminOption: Locator;
    readonly employeeNameInput: Locator;
    readonly selectEmployee: Locator;
    readonly statusDropdown: Locator;
    readonly enableOption: Locator;
    readonly userNameInput: Locator;
    readonly passwordInput: Locator;
    readonly confirmPasswordInput: Locator;
    readonly saveButton: Locator;
    readonly successMessage: Locator;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly usernameText: Locator;
    readonly deleteIcon: Locator;
    readonly confirmDeleteButton: Locator;

    constructor(page: Page) {
        super(page);

        this.adminHeading = page.getByRole('heading', { name: 'Admin' });
        this.addButton = page.getByRole('button', { name: 'Add' });
        this.userRoleDropdown = page.locator('.oxd-select-wrapper').nth(0);
        this.statusDropdown = page.locator('.oxd-select-wrapper').nth(1);
        this.adminOption = page.getByRole('option', { name: 'Admin' });
        this.employeeNameInput = page.getByPlaceholder('Type for hints...');
        this.selectEmployee = page.locator("(//div[@role='option'])[1]");
        this.enableOption = page.getByRole('option', { name: 'Enabled' });
        this.userNameInput = page.getByRole('textbox').nth(2);
        this.passwordInput = page.locator("//input[@type='password']",).nth(0);
        this.confirmPasswordInput = page.locator("//input[@type='password']",).nth(1);
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.successMessage = page.getByText('Success', { exact: true });
        this.searchInput = page.getByRole('textbox').nth(1);
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.usernameText = page.getByText('Mahendra', { exact: true });
        this.deleteIcon = page.locator('.oxd-icon.bi-trash').first();
        this.confirmDeleteButton = page.getByRole('button', { name: 'Yes, Delete' });
    }

    async clickOnAddButton() {
        await this.click(this.addButton);
    }

    async clickOnSaveButton() {
        await this.click(this.saveButton);
    }

    async selectUserRole() {
        await this.click(this.userRoleDropdown);
        await this.click(this.adminOption);
    }

    async selectStatus() {
        await this.click(this.statusDropdown);
        await this.click(this.enableOption);
    }

    async enterEmployeeName(employeeName: string) {
        await this.type(this.employeeNameInput, employeeName);
        await this.pause(7);
        await this.click(this.selectEmployee);
    }

    async enterUsername(username: string) {
        await this.type(this.userNameInput, username);
    }

    async enterPassword(password: string) {
        await this.type(this.passwordInput, password);
    }

    async enterConfirmPassword(confirmPassword: string) {
        await this.type(this.confirmPasswordInput, confirmPassword);
    }

    async enterUsernameIntoSearch(name: string) {
        await expect(this.adminHeading).toBeVisible();
        await this.pause(6);
        await this.type(this.searchInput, name);
    }
    async clickOnSearchButton() {
        await this.click(this.searchButton);
    }
    async clickOnDeleteIcon() {
        await this.click(this.deleteIcon);
    }
    async clickOnConfirmDeleteButton() {
        await this.click(this.confirmDeleteButton);
    }

    async verifyUsernameVisible(name: string) {
        await this.expectText(this.usernameText, name);
    }


}