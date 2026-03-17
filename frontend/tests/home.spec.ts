import { test, expect } from "@playwright/test";
import 'dotenv/config';

const URL_PAGE = process.env.URL_PAGE;

if (!URL_PAGE) {
  throw new Error("L'élément URL_PAGE n'est pas défini dans l'environnement.");
}

test.describe("Page Communauté de Troc", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(URL_PAGE);
  });

  test("liste les utilisateurs et permet d’accéder à un deck", async ({
    page,
  }) => {
    const userListItems = page.locator("ul > li");
    const count = await userListItems.count();

    if (count > 0) {
      const firstUser = userListItems.first();

      const deckButton = firstUser.getByRole("link", { name: /Voir le Deck/i });
      await expect(deckButton).toBeVisible();

      await deckButton.click();
      await expect(page).toHaveURL(/\/profile\//);
    }
  });
});
