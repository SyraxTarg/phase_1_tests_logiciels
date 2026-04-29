import { test, expect } from '@playwright/test';
import 'dotenv/config';

const URL_PAGE = process.env.URL_PAGE;

if (!URL_PAGE) {
    throw new Error("L'élément URL_PAGE n'est pas défini dans l'environnement.");
}

test.describe('Gestion de la visibilité des cartes', () => {

    let stateBeforeTest: 'Visible' | 'Masquée' | null = null;

    test('toggle visibility and cleanup', async ({ page }) => {
        // Arrange
        await page.goto(`${URL_PAGE}/profile`);
        await page.waitForLoadState('networkidle');

        const visibleBtn = page.getByText('Visible').first();
        const maskedBtn = page.getByText('Masquée').first();

        if (await visibleBtn.isVisible()) {
            stateBeforeTest = 'Visible';
        } else if (await maskedBtn.isVisible()) {
            stateBeforeTest = 'Masquée';
        }

        console.log(`État initial de la carte : ${stateBeforeTest}`);

        // Act & Assert
        if (stateBeforeTest === 'Visible') {
            await visibleBtn.click();
            await expect(maskedBtn).toBeVisible({ timeout: 7000 });
        } else {
            await maskedBtn.click();
            await expect(visibleBtn).toBeVisible({ timeout: 7000 });
        }
    });

    // Cleanup
    test.afterEach(async ({ page }) => {
        if (!stateBeforeTest) return;

        console.log(`Nettoyage : Remise de la carte en état ${stateBeforeTest}`);

        const currentVisibleBtn = page.getByText('Visible').first();
        const currentMaskedBtn = page.getByText('Masquée').first();

        if (stateBeforeTest === 'Visible' && await currentMaskedBtn.isVisible()) {
            await currentMaskedBtn.click();
            await expect(currentVisibleBtn).toBeVisible();
        }
        else if (stateBeforeTest === 'Masquée' && await currentVisibleBtn.isVisible()) {
            await currentVisibleBtn.click();
            await expect(currentMaskedBtn).toBeVisible();
        }
    });
});