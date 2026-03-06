import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class PIMPage extends BasePage {

    readonly addButton: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly saveButton: Locator;
    readonly bloodTypeDropdown: Locator;
    readonly employeeNameSearchInput: Locator;
    readonly searchButton: Locator;
    readonly empNameText: Locator;
    readonly deleteIcon: Locator;
    readonly confirmDeleteButton: Locator;
    readonly successMessage: Locator;
    readonly pimHeading: Locator;
    readonly bloodTypeOption: Locator;

    constructor(page: Page) {
        super(page);
        this.addButton = page.getByRole('button', { name: 'Add' });
        this.firstName = page.getByPlaceholder('First Name');
        this.lastName = page.getByPlaceholder('Last Name');
        this.saveButton = page.getByRole('button', { name: 'Save' });
        this.bloodTypeDropdown = page.getByText('-- Select --', { exact: true }).nth(2);
        this.employeeNameSearchInput = page.getByRole('textbox', { name: 'Type for hints...' }).nth(0);
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.empNameText = page.getByText('Mahendra', { exact: true });
        this.deleteIcon = page.locator('.oxd-icon.bi-trash').first();
        this.confirmDeleteButton = page.getByRole('button', { name: 'Yes, Delete' });
        this.successMessage = page.getByText('Success', { exact: true });
        this.pimHeading = page.getByRole('heading', { name: 'PIM' });
        this.bloodTypeOption = page.getByText('A+');
    }

    async clickAddButton() {
        await this.click(this.addButton);
    }
    async clickSaveButton(index: number) {
        await this.click(this.saveButton.nth(index));
    }
    async clickSearchButton() {
        await this.click(this.searchButton);
    }
    async clickDeleteIcon() {
        await this.click(this.deleteIcon);
    }
    async clickConfirmDeleteIcon() {
        await this.click(this.confirmDeleteButton);
    }
    async enterLastName(name: string) {
        await this.type(this.lastName, name);
    }
    async enterFirstName(name: string) {
        await this.type(this.firstName, name);
    }
    async enterEmpNameInSearchInput(name: string) {
        await this.type(this.employeeNameSearchInput, name);
    }
    async selectBloodType() {
        await this.click(this.bloodTypeDropdown)
        await this.click(this.bloodTypeOption)
    }
}