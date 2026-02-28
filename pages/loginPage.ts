import { Locator, Page } from '@playwright/test';
import { BasePage } from './basePage';

export class LoginPage extends BasePage {

  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly invalidCredsMessage: Locator;
  readonly forgotPasswordLink: Locator;
  readonly requiredText: Locator;
  readonly loginPageHeading: Locator;

  constructor(page: Page) {
    super(page);

    this.usernameInput = page.getByPlaceholder('Username');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.invalidCredsMessage = page.getByText('Invalid credentials', { exact: true });
    this.forgotPasswordLink = page.getByText('Forgot your password?', { exact: true });
    this.requiredText = page.getByText('Required').first();
    this.loginPageHeading = page.getByRole('heading', { name: 'Login' });
  }


  async enterUsername(username: string) {
    await this.type(this.usernameInput, username);
  }

  async enterPassword(password: string) {
    await this.type(this.passwordInput, password);
  }

  async clickLogin() {
    await this.click(this.loginButton);
  }

  async clickForgotPassword() {
    await this.click(this.forgotPasswordLink);
  }


  async login(username: string, password: string) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLogin();
  }


}