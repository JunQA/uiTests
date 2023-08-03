import { expect } from'@playwright/test';

class CheckoutСompletePage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.backToProducts = page.locator('[data-test="back-to-products"]');
      this.thankYouMessage = page.getByRole('heading', { name: 'Thank you for your order!' });
      this.checkoutCompleteMessage = page.getByText('Checkout: Complete!');
    }
  
    async goto() {
      await this.page.goto('https://www.saucedemo.com/checkout-complete.html');
    }
  
    async clickBackToProductsButtone() {
      await this.backToProducts.hover();
      expect(this.backToProducts).toBeVisible();
      await this.backToProducts.click();
    }

    async thankYouMessage() {
        expect(this.thankYouMessage).toBeVisible();
    }

    async checkoutCompleteMessage() {
        expect(this.checkoutCompleteMessage).toBeVisible();
    }
  };
  
export { CheckoutСompletePage };

