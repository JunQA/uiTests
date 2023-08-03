import { expect } from'@playwright/test';

class CheckoutStepTwoPage {

    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
      this.page = page;
      this.finishButtone = page.locator('[data-test="finish"]');
    }
  
    async goto() {
      await this.page.goto('https://www.saucedemo.com/checkout-step-two.html');
    }
  
    async clickFinishButtone() {
      await this.finishButtone.hover();
      expect(this.finishButtone).toBeVisible();
      await this.finishButtone.click();
    }
  };
  
export { CheckoutStepTwoPage };