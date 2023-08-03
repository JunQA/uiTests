import { expect } from'@playwright/test';

class LoginPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.userNameField = page.locator('[data-test="username"]');
    this.userPasswordField = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.loginErrorField = page.locator('[data-test="error"]');
  }

  async goto() {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async fillUserNameField(userName) {
    await this.userNameField.click();
    expect(this.userNameField).toBeVisible();
    await this.userNameField.fill(userName);
    expect(this.userNameField).toHaveValue(userName);
  };

  async fillUserPasswordField(password) {
    await this.userPasswordField.click();
    expect(this.userPasswordField).toBeVisible();
    await this.userPasswordField.fill(password);
  };

  async clickLoginButton() {
    await this.loginButton.hover();
    expect(this.loginButton).toBeVisible();
    await this.loginButton.click();
  };

  async getLoginErrorMessage() {
    return await this.loginErrorField.textContent();
  };

};

export { LoginPage };