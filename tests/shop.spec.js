import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { shopUserNAme, shopLockedUser, shopUserPassword } from '../framework/fixtures';

test.describe('Login page tests', () => {
    test('valid authorization', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();

         //fill in the user name field with valid data
         await loginPage.fillUserNameField(shopUserNAme);
         //fill in the password field with valid data
         await loginPage.fillUserPasswordField(shopUserPassword);
         //press the login button
         await loginPage.clickLoginButton();
         //check page
         expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');

        // @todo add shop element check
      });

      test('invalid authorization', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();

        //checking the display of error with empty fields
        await loginPage.clickLoginButton();
        const errorMessageEmpty = await loginPage.getLoginErrorMessage();
        expect(errorMessageEmpty).toBe('Epic sadface: Username is required');

        //checking the display of error with empty password
        await loginPage.fillUserNameField(shopUserNAme);
        await loginPage.clickLoginButton();
        const errorMessagePassword = await loginPage.getLoginErrorMessage();
        expect(errorMessagePassword).toBe('Epic sadface: Password is required');

        //checking the display of error with empty user name
        await loginPage.fillUserPasswordField(shopUserPassword);
        await loginPage.clickLoginButton();
        const errorMessageUser = await loginPage.getLoginErrorMessage();
        expect(errorMessageUser).toBe('Epic sadface: Username is required');

        //cheking the display of error with locked user
        // await loginPage.fillUserNameField(shopLockedUser);
        // await loginPage.fillUserPasswordField(shopUserPassword);
        // await loginPage.clickLoginButton();
        // const errorMessageLocked = await loginPage.getLoginErrorMessage();
        // expect(errorMessageLocked).toBe('Epic sadface: Sorry, this user has been locked out.');
});
         
});