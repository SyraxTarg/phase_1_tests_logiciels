import { test, expect } from '@playwright/test';

const URL_PAGE = 'http://localhost:3000/';

test.describe('Page Communauté de Troc', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(URL_PAGE);
  });

  test('liste les utilisateurs et permet d’accéder à un deck', async ({ page }) => {
    const userListItems = page.locator('ul > li');
    const count = await userListItems.count();

    if (count > 0) {
      const firstUser = userListItems.first();

      const deckButton = firstUser.getByRole('link', { name: /Voir le Deck/i });
      await expect(deckButton).toBeVisible();

      await deckButton.click();
      await expect(page).toHaveURL(/\/profile\//);
    }
  });

});