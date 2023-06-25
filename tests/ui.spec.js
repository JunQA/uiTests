import { test, expect } from '@playwright/test';
import { userName, userEmail, currentAddress } from '../framework/fixtures';
import { baseURL } from '../framework/config';

test.beforeEach(async ({ page }) => {
    await page.goto(baseURL + 'text-box',{
        setTimeout: 3000
    });
});

test.describe('Text-box tests', () => {
    test('the field must be able to be filled in', async ({ page }) => {
    // create a new locators
    const userNameInput = await page.getByPlaceholder('Full Name');
    const userEmailInput = await page.getByPlaceholder('name@example.com');
    const currentAddressInput = await page.getByPlaceholder('Current Address');
    const submitButtone = await page.getByRole('button', { name: /submit/i });

    // click and input name
    await userNameInput.click();
    await page.waitForTimeout(2000);
    await expect(userNameInput).toBeFocused();

    await userNameInput.fill(`${userName}`);
    await expect(userNameInput).toHaveValue(`${userName}`);

    // click and input email
    await userEmailInput.click();
    await page.waitForTimeout(2000);
    await expect(userEmailInput).toBeFocused();

    await userEmailInput.fill(`${userEmail}`);
    await expect(userEmailInput).toHaveValue(`${userEmail}`);

    // click and input address
    await currentAddressInput.click();
    await page.waitForTimeout(2000);
    await expect(currentAddressInput).toBeFocused();

    await currentAddressInput.fill(`${currentAddress}`);
    await expect(currentAddressInput).toHaveValue(`${currentAddress}`);

    // hover and click submit button
    await submitButtone.hover();
    await page.waitForTimeout(2000);
    await submitButtone.click();
    await expect(submitButtone).toHaveText('Submit');
    });
});

test.afterAll(async () => {
    console.log('Done with tests');
});
