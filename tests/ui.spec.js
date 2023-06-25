import { test, expect } from '@playwright/test';
import { userName, userEmail, currentAddress } from '../framework/fixtures';

test.beforeEach(async ({ page }) => {
    await page.goto('https://demoqa.com/text-box',{
        // headless: false,
        // setTimeout: 6000
    });
});

test.describe('Text-box tests', () => {
    test('full Name should be focused', async ({ page }) => {
    const userNameInput = await page.getByPlaceholder('Full Name');
    const userEmailInput = await page.getByPlaceholder('name@example.com');
    const currentAddressInput = await page.getByPlaceholder('Current Address');
    const submitButtone = await page.getByRole('button', { name: /submit/i });


    // await userNameInput.waitFor({ state: 'visible' });
    await userNameInput.click();
    await page.waitForTimeout(2000);
    await userNameInput.fill(`${userName}`);

    await userEmailInput.click();
    await page.waitForTimeout(2000);
    await userEmailInput.fill(`${userEmail}`);

    await currentAddressInput.click();
    await page.waitForTimeout(2000);
    await currentAddressInput.fill(`${currentAddress}`);

    await submitButtone.click();
    await page.waitForTimeout(10000);

    });
});

test.afterAll(async () => {
    console.log('Done with tests');
});
