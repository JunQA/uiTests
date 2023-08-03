import { expect } from'@playwright/test';

class CheckoutStepOnePage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.firstNameField = page.locator('[data-test="firstName"]');
      this.lastNameField = page.locator('[data-test="lastName"]');
      this.postalCodeField = page.locator('[data-test="postalCode"]');
      this.cancelButton = page.locator('[data-test="cancel"]');
      this.continueButton = page.locator('[data-test="continue"]');
    }
  
    async goto() {
      await this.page.goto('https://www.saucedemo.com/checkout-step-one.html');
    }
  
    async fillFirstNameField(userName) {
        expect(this.firstNameField).toBeVisible();
        await this.firstNameField.click();
        await this.firstNameField.fill(userName);
        expect(this.firstNameField).toHaveValue(userName);
    }

    async fillLastNameField(lastName) {
        expect(this.lastNameField).toBeVisible();
        await this.lastNameField.click();
        await this.lastNameField.fill(lastName);
        expect(this.lastNameField).toHaveValue(lastName);
    }

    async fillPostalCodeField(postalCode) {
        expect(this.postalCodeField).toBeVisible();
        await this.postalCodeField.click();
        await this.postalCodeField.fill(postalCode);
        expect(this.postalCodeField).toHaveValue(postalCode);
    }

    async cancelButton() {
      await this.cancelButton.hover(); 
      expect(this.cancelButton).toBeVisible();
    }

    async clickContinueButton() {
        await this.continueButton.hover(); 
        expect(this.continueButton).toBeVisible();
        await this.continueButton.click();
      }
  };
  
export { CheckoutStepOnePage };