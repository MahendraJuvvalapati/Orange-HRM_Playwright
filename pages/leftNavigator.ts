import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class LeftNavigator extends BasePage {

    readonly clientLogo: Locator;
    readonly adminPage: Locator;
    readonly PIMPage: Locator;
    readonly LeavePage: Locator;
    readonly TimePage: Locator;
    readonly recruitmentPage: Locator;
    readonly MyinfoPage: Locator;
    readonly performancePage: Locator;
    readonly directoryPage: Locator;
    readonly maintenancePage: Locator;
    readonly claimPage: Locator;
    readonly buzzPage: Locator;

    constructor(page: Page) {
        super(page);

        this.clientLogo = page.getByAltText('client brand banner');
        this.adminPage = page.getByRole('link', { name: 'Admin' });
        this.PIMPage = page.getByRole('link', { name: 'PIM' });
        this.LeavePage = page.getByRole('link', { name: 'Leave' });
        this.recruitmentPage = page.getByRole('link', { name: 'Recruitment' });
        this.TimePage = page.getByRole('link', { name: 'Time' });
        this.MyinfoPage = page.getByRole('link', { name: 'My Info' });
        this.performancePage = page.getByRole('link', { name: 'Performance' });
        this.directoryPage = page.getByRole('link', { name: 'Directory' });
        this.maintenancePage = page.getByRole('link', { name: 'Maintenance' });
        this.claimPage = page.getByRole('link', { name: 'Claim' }); 
        this.buzzPage = page.getByRole('link', { name: 'Buzz' });
    }

    async navigateToAdminPage() {
        await this.click(this.adminPage);
    }

    async navigateToPIMPage() {
        await this.click(this.PIMPage);
    }

    async navigateToLeavePage() {
        await this.click(this.LeavePage);
    }

    async navigateToTimePage() {
        await this.click(this.TimePage);
    }

    async navigateToRecruitmentPage() {
        await this.click(this.recruitmentPage);
    }

    async navigateToMyInfoPage() {
        await this.click(this.MyinfoPage);
    }

    async navigateToPerformancePage() {
        await this.click(this.performancePage);
    }

    async navigateToDirectoryPage() {
        await this.click(this.directoryPage);
    }

    async navigateToMaintenancePage() {
        await this.click(this.maintenancePage);
    }

    async navigateToClaimPage() {
        await this.click(this.claimPage);
    }

    async navigateToBuzzPage() {
        await this.click(this.buzzPage);
    }
}