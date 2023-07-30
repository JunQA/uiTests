import { test, expect } from '@playwright/test';
import { LoginPage } from '/Users/home/Desktop/uiTests/pages/LoginPage.js';
import { shopUserNAme, shopUserPassword } from '../framework/fixtures';

test.describe('Login page tests', () => {
    test('valid authorization', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();

        //fill in the user name field with valid data
        await loginPage.userNameField.click();
        expect(loginPage.userNameField).toBeVisible();

        await loginPage.userNameField.fill(`${shopUserNAme}`);
        expect(loginPage.userNameField).toHaveValue(`${shopUserNAme}`);

        //fill in the passwor field  with valid data
        await loginPage.userPasswordField.click();
        expect(loginPage.userPasswordField).toBeVisible();

        await loginPage.userPasswordField.fill(`${shopUserPassword}`);
        // expect(loginPage.passwordFieldType).toBe('password');

        //press the login button
    
        await loginPage.loginButton.hover();
        expect (loginPage.loginButton).toBeVisible();

        await loginPage.loginButton.click();
        //check page
        expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
      });
});