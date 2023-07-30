import { test, expect } from '@playwright/test';
import { LoginPage } from '/Users/home/Desktop/uiTests/pages/LoginPage.js';
import { shopUserNAme, shopUserPassword } from '../framework/fixtures';

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

        //add shop element check
      });

      test('invalid authorization', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();

        //checking the display of error with empty fields
        await loginPage.clickLoginButton();
        const errorMessage = await loginPage.getLoginErrorMessage();
        expect(errorMessage).toBe('Epic sadface: Username is required');

        //checking the display of error with empty fields
});
         
});