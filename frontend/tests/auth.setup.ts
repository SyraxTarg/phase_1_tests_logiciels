import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    const username_textbox = await page.getByRole('textbox', { name: 'Username' });
    const password_textbox = await page.getByRole('textbox', { name: 'Mot de passe' });
    const submit_button = await page.getByRole('button', { name: 'Se connecter' });

    // Act
    await username_textbox.fill('Alice');
    await password_textbox.fill('password123');
    await submit_button.click();

    await page.waitForURL('**/');

    await page.context().storageState({ path: authFile });
});