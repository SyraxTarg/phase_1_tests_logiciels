import { test, expect } from "@playwright/test";
import "dotenv/config";

const URL_PAGE = process.env.URL_PAGE;

if (!URL_PAGE) {
  throw new Error("L'élément URL_PAGE n'est pas défini dans l'environnement.");
}

test("send message", async ({ page, browserName }) => {
  test.skip(
    browserName === "webkit",
    "Webkit a des problèmes de gestion de session en local",
  );

  await page.goto(`${URL_PAGE}/transactions/1`);

  await page.getByRole("textbox", { name: "Écrivez votre message..." }).click();
  await page
    .getByRole("textbox", { name: "Écrivez votre message..." })
    .fill("Hello !");
  await page.getByRole("button", { name: "Envoyer" }).click();

  await expect(
    page.locator("div").filter({ hasText: /^Hello !$/ }),
  ).toBeVisible();
});
