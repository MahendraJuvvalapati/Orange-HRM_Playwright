import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class DashboardPage extends BasePage {

    readonly dashboardHeading : Locator;
    readonly timeAtWorkWidget : Locator;
    readonly myActionsWidget : Locator;
    readonly quickLaunchWidget : Locator;
    readonly buzzLatestPostWidget : Locator;
    readonly employeesOnLeaveTodayWidget : Locator;
    readonly employeeDistributionBySubUnitWidget : Locator;
    readonly employeeDistributionByLocationWidet : Locator;
    readonly userDropDownIcon : Locator;
    readonly logOutBtn : Locator;
    
  constructor(page: Page) {
    super(page);
    
    this.dashboardHeading = page.getByRole('heading',{name : 'Dashboard'});
    this.timeAtWorkWidget = page.locator('.orangehrm-dashboard-widget-name p').nth(0);
    this.myActionsWidget = page.locator('.orangehrm-dashboard-widget-name p').nth(1);
    this.quickLaunchWidget = page.locator('.orangehrm-dashboard-widget-name p').nth(2);
    this.buzzLatestPostWidget = page.locator('.orangehrm-dashboard-widget-name p').nth(3);
    this.employeesOnLeaveTodayWidget = page.locator('.orangehrm-dashboard-widget-name p').nth(4);
    this.employeeDistributionBySubUnitWidget = page.locator('.orangehrm-dashboard-widget-name p').nth(5);
    this.employeeDistributionByLocationWidet = page.locator('.orangehrm-dashboard-widget-name p').nth(6);
    this.userDropDownIcon = page.locator('i.oxd-icon.bi-caret-down-fill.oxd-userdropdown-icon');
    this.logOutBtn = page.getByRole('menuitem', { name: 'Logout' });
  }

  async clickOnUserDropDownIcon(){
    await this.click(this.userDropDownIcon);
  }

  async clickOnLogOutButton(){
    await this.click(this.logOutBtn);
  }


}