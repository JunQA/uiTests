import { expect } from'@playwright/test';

class InventoryPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.addToCartBackpack = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
      this.shoppingCartLink = page.locator('[class="shopping_cart_link"]');
      this.shoppingCartBadge = page.locator('[class="shopping_cart_badge"]');
    }
  
    async goto() {
      await this.page.goto('https://www.saucedemo.com/inventory.html');
    }
  
    async clickAddToCartButton() {
      expect(this.addToCartBackpack).toBeVisible();
      await this.addToCartBackpack.hover();
      await this.addToCartBackpack.click();
    }

    async clickShoppingCartLink() {
      expect(this.shoppingCartLink).toBeVisible();
      await this.shoppingCartLink.click();
    }
  };
  
export { InventoryPage };

