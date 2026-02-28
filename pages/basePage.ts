import { Page, Locator, expect, test } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // =====================================================
  // 🔹 Logging Helper
  // =====================================================

  protected async step(stepName: string, action: () => Promise<void>) {
    await test.step(stepName, async () => {
      await action();
    });
  }

  // =====================================================
  // 🔹 Navigation
  // =====================================================

  async navigate(url: string) {
    await this.step(`Navigate to ${url}`, async () => {
      await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    });
  }

  async reload() {
    await this.page.reload();
  }

  async waitForNetworkIdle() {
    await this.page.waitForLoadState('networkidle');
  }

  // =====================================================
  // 🔹 Safe Actions (Auto Wait + Retry)
  // =====================================================

  async click(locator: Locator) {
    await this.step(`Click on element`, async () => {
      await locator.waitFor({ state: 'visible' });
      await locator.click({ timeout: 10000 });
    });
  }

  async type(locator: Locator, text: string) {
    await this.step(`Type "${text}"`, async () => {
      await locator.waitFor({ state: 'visible' });
      await locator.fill('');
      await locator.fill(text);
    });
  }

  async clear(locator: Locator) {
    await locator.clear();
  }

  async press(locator: Locator, key: string) {
    await locator.press(key);
  }

  async hover(locator: Locator) {
    await locator.hover();
  }

  async doubleClick(locator: Locator) {
    await locator.dblclick();
  }

  // =====================================================
  // 🔹 Dropdown Handling
  // =====================================================

  async selectByValue(locator: Locator, value: string) {
    await locator.selectOption({ value });
  }

  async selectByLabel(locator: Locator, label: string) {
    await locator.selectOption({ label });
  }

  // =====================================================
  // 🔹 Wait Helpers
  // =====================================================

  async waitForVisible(locator: Locator) {
    await locator.waitFor({ state: 'visible' });
  }

  async waitForHidden(locator: Locator) {
    await locator.waitFor({ state: 'hidden' });
  }

  async waitForAttached(locator: Locator) {
    await locator.waitFor({ state: 'attached' });
  }

  async wait(milliseconds: number) {
    await this.page.waitForTimeout(milliseconds);
  }

  // =====================================================
  // 🔹 Assertions (Hard)
  // =====================================================

  async expectVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async expectHidden(locator: Locator) {
    await expect(locator).toBeHidden();
  }

  async expectText(locator: Locator, text: string) {
    await expect(locator).toHaveText(text);
  }

  async expectContainsText(locator: Locator, text: string) {
    await expect(locator).toContainText(text);
  }

  async expectUrlContains(text: string) {
    await expect(this.page).toHaveURL(new RegExp(text));
  }

  // =====================================================
  // 🔹 Soft Assertions
  // =====================================================

  async softExpectVisible(locator: Locator) {
    await expect.soft(locator).toBeVisible();
  }

  async softExpectText(locator: Locator, text: string) {
    await expect.soft(locator).toHaveText(text);
  }

  // =====================================================
  // 🔹 Getters
  // =====================================================

  async getText(locator: Locator): Promise<string | null> {
    return locator.textContent();
  }

  async getAttribute(locator: Locator, attribute: string) {
    return locator.getAttribute(attribute);
  }

  async isVisible(locator: Locator): Promise<boolean> {
    return locator.isVisible();
  }

  async getTitle(): Promise<string> {
    return this.page.title();
  }

  async getUrl(): Promise<string> {
    return this.page.url();
  }

  // =====================================================
  // 🔹 Screenshot & Debug
  // =====================================================

  async takeScreenshot(name: string) {
    await this.page.screenshot({
      path: `screenshots/${name}-${Date.now()}.png`,
      fullPage: true,
    });
  }

  async screenshotOnFailure(testInfo: any) {
    if (testInfo.status !== testInfo.expectedStatus) {
      await this.page.screenshot({
        path: `screenshots/failure-${Date.now()}.png`,
        fullPage: true,
      });
    }
  }

  // =====================================================
  // 🔹 File Upload
  // =====================================================

  async uploadFile(locator: Locator, filePath: string) {
    await locator.setInputFiles(filePath);
  }

  // =====================================================
  // 🔹 Frames
  // =====================================================

  getFrame(frameSelector: string) {
    return this.page.frameLocator(frameSelector);
  }

  // =====================================================
  // 🔹 Network Helpers
  // =====================================================

  async waitForResponse(urlPart: string) {
    await this.page.waitForResponse(response =>
      response.url().includes(urlPart) && response.status() === 200
    );
  }

  // =====================================================
  // 🔹 Scroll
  // =====================================================

  async scrollIntoView(locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
  }

  async scrollToBottom() {
    await this.page.evaluate(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });
  }
}