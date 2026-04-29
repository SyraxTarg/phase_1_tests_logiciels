import { test, expect } from "@playwright/test";
import "dotenv/config";

const URL_PAGE = process.env.URL_PAGE;

if (!URL_PAGE) {
  throw new Error("L'élément URL_PAGE n'est pas défini dans l'environnement.");
}

test.use({ storageState: { cookies: [], origins: [] } });
test("login successful", async ({ page }) => {
  // Arrange
  await page.goto(`${URL_PAGE}/login`);
  const username_textbox = page.getByRole("textbox", { name: "Username" });
  const password_textbox = page.getByRole("textbox", { name: "Mot de passe" });
  const submit_button = page.getByRole("button", { name: "Se connecter" });

  // Act
  await username_textbox.fill("Alice");
  await password_textbox.fill("password123");
  await submit_button.click();

  // Assert
  await expect(page).toHaveURL(`${URL_PAGE}/`);
});

test("login failed", async ({ page, browserName }) => {
  // test.skip(browserName === 'webkit', 'Webkit a des problèmes de gestion de session en local');

  // Arrange
  await page.goto(`${URL_PAGE}/login`);
  const username_textbox = await page.getByRole("textbox", {
    name: "Username",
  });
  const password_textbox = await page.getByRole("textbox", {
    name: "Mot de passe",
  });
  const submit_button = await page.getByRole("button", {
    name: "Se connecter",
  });

  // Act
  await username_textbox.fill("Alice");
  await password_textbox.fill("toto");
  await submit_button.click();

  // Assert
  await expect(page.getByText("Identifiants incorrects.")).toBeVisible({
    timeout: 7000,
  });
  await expect(page).toHaveURL(`${URL_PAGE}/login`);
});

test("login no username", async ({ page, browserName }) => {
  // test.skip(browserName === 'webkit', 'Webkit a des problèmes de gestion de session en local');

  // Arrange
  await page.goto(`${URL_PAGE}/login`);
  const username_textbox = await page.getByRole("textbox", {
    name: "Username",
  });
  const password_textbox = await page.getByRole("textbox", {
    name: "Mot de passe",
  });
  const submit_button = await page.getByRole("button", {
    name: "Se connecter",
  });

  // Act
  await username_textbox.fill("");
  await password_textbox.fill("password123");
  await submit_button.click({ force: true });

  // Assert
  await expect(page.getByText("Identifiants incorrects.")).toBeHidden();
  await expect(page).toHaveURL(`${URL_PAGE}/login`);
});

test("login no password", async ({ page, browserName }) => {
  // test.skip(browserName === 'webkit', 'Webkit a des problèmes de gestion de session en local');

  // Arrange
  await page.goto(`${URL_PAGE}/login`);
  const username_textbox = await page.getByRole("textbox", {
    name: "Username",
  });
  const password_textbox = await page.getByRole("textbox", {
    name: "Mot de passe",
  });
  const submit_button = await page.getByRole("button", {
    name: "Se connecter",
  });

  // Act
  await username_textbox.fill("Alice");
  await password_textbox.fill("");
  await submit_button.click();

  // Assert
  await expect(page.getByText("Identifiants incorrects.")).toBeHidden();
  await expect(page).toHaveURL(`${URL_PAGE}/login`);
});