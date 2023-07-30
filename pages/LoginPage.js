import { expect } from'@playwright/test'; // change to import

// exports.LoginPage = class LoginPage {
class LoginPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.userNameField = page.locator('[data-test="username"]');
    this.userPasswordField = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    // this.passwordFielType = page.userPasswordField.getProperty('type');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }
};

export { LoginPage };