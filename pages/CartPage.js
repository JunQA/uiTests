import { expect } from'@playwright/test';

class CartPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.removeBackpack = page.locator('[data-test="remove-sauce-labs-backpack"]');
      this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
      this.checkoutButton = page.locator('[data-test="checkout"]');
    }
  
    async goto() {
      await this.page.goto('https://www.saucedemo.com/cart.html');
    }
  
    async removeBackpackButton() {
      await this.removeBackpack.hover(); 
      expect(this.removeBackpack).toBeVisible();
    }

    async continueShoppingButton() {
      await this.continueShoppingButton.hover(); 
      expect(this.continueShoppingButton).toBeVisible();
    }

    async checkoutButton() {
        await this.checkoutButton.hover(); 
        expect(this.checkoutButton).toBeVisible();
      }
  };
  
export { CartPage };

