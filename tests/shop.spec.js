import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { shopUserNAme, shopLockedUser, shopUserPassword } from '../framework/fixtures';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';

test.describe('Login page tests', () => {
    test('valid authorization', async ({ page }) => {
        const loginPage = new LoginPage(page);
        
        await loginPage.goto();

        //checking user authorization
        await loginPage.fillUserNameField(shopUserNAme);
        await loginPage.fillUserPasswordField(shopUserPassword);
        await loginPage.clickLoginButton();
        expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
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
        await loginPage.fillUserNameField('');
        await loginPage.fillUserPasswordField(shopUserPassword);
        await loginPage.clickLoginButton();
        const errorMessageUser = await loginPage.getLoginErrorMessage();
        expect(errorMessageUser).toBe('Epic sadface: Username is required');

        //cheking the display of error with locked user
        await loginPage.fillUserNameField(shopLockedUser);
        await loginPage.fillUserPasswordField(shopUserPassword);
        await loginPage.clickLoginButton();
        const errorMessageLocked = await loginPage.getLoginErrorMessage();
        expect(errorMessageLocked).toBe('Epic sadface: Sorry, this user has been locked out.');
  });      
});

test.describe('Inventory page tests', () => {
    test('add to shopping card', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);

        await loginPage.goto();
        await inventoryPage.goto();

        //user authorization
        await loginPage.fillUserNameField(shopUserNAme);
        await loginPage.fillUserPasswordField(shopUserPassword);
        await loginPage.clickLoginButton();

        //checking that the product has been added to the cart
        await inventoryPage.clickAddToCartButton();
        await inventoryPage.clickShoppingCartLink();
        expect(page.url()).toBe('https://www.saucedemo.com/cart.html');
        expect(cartPage.removeBackpack).toBeTruthy();
  });
});