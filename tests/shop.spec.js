import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { shopUserNAme, shopLockedUser, shopUserPassword, userName, lastName, postalCode } from '../framework/fixtures';
import { InventoryPage } from '../pages/InventoryPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutStepOnePage } from '../pages/CheckoutStepOnePage.js';
import { CheckoutStepTwoPage } from '../pages/CheckoutStepTwoPage.js';
import { CheckoutСompletePage } from '../pages/СheckoutСompletePage.js';

test.beforeEach(async ({}, testInfo) => {
  console.log(`Running ${testInfo.title}`);
});

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

test.describe('Order tests', () => {
    test('add to shopping card', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const inventoryPage = new InventoryPage(page);
        const cartPage = new CartPage(page);
        const checkoutStepOnePage = new CheckoutStepOnePage(page);
        const checkoutStepTwoPage = new CheckoutStepTwoPage(page);
        const checkoutСompletePage = new CheckoutСompletePage(page);
        
        await loginPage.goto();
        await inventoryPage.goto();
        await checkoutStepOnePage.goto();
        await checkoutStepTwoPage.goto();
        await checkoutСompletePage.goto();
    
        //user authorization
        await loginPage.fillUserNameField(shopUserNAme);
        await loginPage.fillUserPasswordField(shopUserPassword);
        await loginPage.clickLoginButton();

        //checking that the product has been added to the cart
        await inventoryPage.clickAddToCartButton();
        await inventoryPage.clickShoppingCartLink();
        expect(page.url()).toBe('https://www.saucedemo.com/cart.html');
        expect(cartPage.removeBackpack).toBeTruthy();
        expect(cartPage.continueShoppingButton).toBeTruthy();
        expect(cartPage.checkoutButton).toBeTruthy();

        //continue next step
        await cartPage.checkoutButton.click();
        expect(page.url()).toBe('https://www.saucedemo.com/checkout-step-one.html');

        //checking that the buyer's information is being filled in
        await checkoutStepOnePage.fillFirstNameField(userName);
        await checkoutStepOnePage.fillLastNameField(lastName);
        await checkoutStepOnePage.fillPostalCodeField(postalCode);
        await checkoutStepOnePage.clickContinueButton();
        expect(page.url()).toBe('https://www.saucedemo.com/checkout-step-two.html');

        //checking that the button is pressed messages are displayed
        await checkoutStepTwoPage.clickFinishButtone();
        expect(page.url()).toBe('https://www.saucedemo.com/checkout-complete.html');
        expect(checkoutСompletePage.thankYouMessage).toBeTruthy();
        expect(checkoutСompletePage.checkoutCompleteMessage).toBeTruthy();

        //checking that the button is pressed the transition to the main page
        await checkoutСompletePage.clickBackToProductsButtone();
        expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');
  });
});

test.afterEach(async ({ page }, testInfo) => {
  console.log(`Finished ${testInfo.title} with status ${testInfo.status}`);

  if (testInfo.status !== testInfo.expectedStatus)
    console.log(`Did not run as expected, ended up at ${page.url()}`);
});