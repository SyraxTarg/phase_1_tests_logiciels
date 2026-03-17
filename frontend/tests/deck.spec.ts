import { test, expect } from '@playwright/test';
import 'dotenv/config';

const URL_PAGE = process.env.URL_PAGE;

if (!URL_PAGE) {
    throw new Error("L'élément URL_PAGE n'est pas défini dans l'environnement.");
}

test('trigger masked checkbox', async ({ page, browserName }) => {

    test.skip(browserName === 'webkit', 'Webkit a des problèmes de gestion de session en local');

    // Arrange
    await page.goto(`${URL_PAGE}/profile`);

    const visible = page.getByText('Visible').first();
    const masked = page.getByText('Masquée').first();
    const isVisibleShown = await visible.isVisible().catch(() => false);

    // Act/Assert
    if (isVisibleShown) {
        await visible.click();
        await expect(masked).toBeVisible({ timeout: 7000 });
    } else {
        await masked.click();
        await expect(visible).toBeVisible({ timeout: 7000 });
    }
});