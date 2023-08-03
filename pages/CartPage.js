import { expect } from'@playwright/test';

class CartPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.removeBackpack = page.locator('[data-test="remove-sauce-labs-backpack"]');
    }
  
    async goto() {
      await this.page.goto('https://www.saucedemo.com/cart.html');
    }
  
    async removeBackpackButton() {
      await this.removeBackpack.hover(); 
      expect(this.removeBackpack).toBeVisible();
    }
  };
  
  export { CartPage };

