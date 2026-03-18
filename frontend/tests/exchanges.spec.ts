import { test, expect } from "@playwright/test";
import 'dotenv/config';

const URL_PAGE = process.env.URL_PAGE;

if (!URL_PAGE) {
    throw new Error("L'élément URL_PAGE n'est pas défini dans l'environnement.");
}

test("exchange 1v1", async ({ page, browserName }) => {
    // test.skip(browserName === "webkit", "WebKit session locale instable");

    // Arrange
    await page.goto(`${URL_PAGE}/transactions`);
    const initialCount = await page.getByText(/Échange avec Toto/).count();

    await page.goto(`${URL_PAGE}/profile/2`);

    const openModalBtn = page.getByRole("button", { name: "Proposer un échange" });
    const modal = page.locator('div.fixed.inset-0');

    page.once('dialog', dialog => dialog.dismiss());

    // Act
    await expect(openModalBtn).toBeVisible();
    await openModalBtn.click();
    await expect(modal).toBeVisible();

    const receiverCard = modal.locator('div').filter({ hasText: /^Salamèche$/ }).first();
    await receiverCard.click();
    await modal.getByRole("button", { name: "Suivant" }).click();

    const proposerCard = modal.locator('div').filter({ hasText: /^Pikachu$/ }).first();
    await proposerCard.click();
    await modal.getByRole("button", { name: "Suivant" }).click();

    await modal.getByRole("button", { name: "Envoyer la proposition" }).click();

    // Assert
    await expect(modal).toBeHidden({ timeout: 10000 });
    await page.goto(`${URL_PAGE}/transactions`);
    await expect(page.getByText(/Échange avec Toto/)).toHaveCount(initialCount + 1);

});


test("exchange 2v1", async ({ page, browserName }) => {
    // test.skip(browserName === "webkit", "WebKit session locale instable");

    // Arrange
    await page.goto(`${URL_PAGE}/transactions`);
    const initialCount = await page.getByText(/Échange avec Toto/).count();

    await page.goto(`${URL_PAGE}/profile/2`);

    const openModalBtn = page.getByRole("button", { name: "Proposer un échange" });
    const modal = page.locator('div.fixed.inset-0');

    page.once('dialog', dialog => dialog.dismiss());

    // Act
    await expect(openModalBtn).toBeVisible();
    await openModalBtn.click();

    await expect(modal).toBeVisible();

    const receiverCard1 = modal.locator('div').filter({ hasText: /^Salamèche$/ }).first();
    await receiverCard1.click();
    const receiverCard2 = modal.locator('div').filter({ hasText: /^Trompignon$/ }).first();
    await receiverCard2.click();
    await modal.getByRole("button", { name: "Suivant" }).click();

    const proposerCard = modal.locator('div').filter({ hasText: /^Pikachu$/ }).first();
    await proposerCard.click();
    await modal.getByRole("button", { name: "Suivant" }).click();

    await modal.getByRole("button", { name: "Envoyer la proposition" }).click();

    // Assert
    await expect(modal).toBeHidden({ timeout: 10000 });

    await page.goto(`${URL_PAGE}/transactions`);
    await expect(page.getByText(/Échange avec Toto/)).toHaveCount(initialCount + 1);
});


test("exchange 1v2", async ({ page, browserName }) => {
    // test.skip(browserName === "webkit", "WebKit session locale instable");

    // Arrange
    await page.goto(`${URL_PAGE}/transactions`);
    const initialCount = await page.getByText(/Échange avec Toto/).count();

    await page.goto(`${URL_PAGE}/profile/2`);
    const openModalBtn = page.getByRole("button", { name: "Proposer un échange" });
    const modal = page.locator('div.fixed.inset-0');

    page.once('dialog', dialog => dialog.dismiss());

    // Act
    await expect(openModalBtn).toBeVisible();
    await openModalBtn.click();
    await expect(modal).toBeVisible();

    const receiverCard = modal.locator('div').filter({ hasText: /^Salamèche$/ }).first();
    await receiverCard.click();
    await modal.getByRole("button", { name: "Suivant" }).click();

    const proposerCard1 = modal.locator('div').filter({ hasText: /^Pikachu$/ }).first();
    await proposerCard1.click();
    const proposerCard2 = modal.locator('div').filter({ hasText: /^Mewtwo$/ }).first();
    await proposerCard2.click();
    await modal.getByRole("button", { name: "Suivant" }).click();

    await modal.getByRole("button", { name: "Envoyer la proposition" }).click();

    // Assert
    await expect(modal).toBeHidden({ timeout: 10000 });
    await page.goto(`${URL_PAGE}/transactions`);
    await expect(page.getByText(/Échange avec Toto/)).toHaveCount(initialCount + 1);
});


test("exchange 2v2", async ({ page, browserName }) => {
    // test.skip(browserName === "webkit", "WebKit session locale instable");

    // Arrange
    await page.goto(`${URL_PAGE}/transactions`);
    const initialCount = await page.getByText(/Échange avec Ash/).count();

    await page.goto(`${URL_PAGE}/profile/3`);
    const openModalBtn = page.getByRole("button", { name: "Proposer un échange" });
    const modal = page.locator('div.fixed.inset-0');

    page.once('dialog', dialog => dialog.dismiss());

    // Act
    await expect(openModalBtn).toBeVisible();
    await openModalBtn.click();
    await expect(modal).toBeVisible();

    const receiverCard1 = modal.locator('div').filter({ hasText: /^Gruikui$/ }).first();
    await receiverCard1.click();
    const receiverCard2 = modal.locator('div').filter({ hasText: /^Xerneas$/ }).first();
    await receiverCard2.click();
    await modal.getByRole("button", { name: "Suivant" }).click();

    const proposerCard1 = modal.locator('div').filter({ hasText: /^Pikachu$/ }).first();
    await proposerCard1.click();
    const proposerCard2 = modal.locator('div').filter({ hasText: /^Mewtwo$/ }).first();
    await proposerCard2.click();
    await modal.getByRole("button", { name: "Suivant" }).click();

    await modal.getByRole("button", { name: "Envoyer la proposition" }).click();

    // Assert
    await expect(modal).toBeHidden({ timeout: 10000 });
    await page.goto(`${URL_PAGE}/transactions`);
    await expect(page.getByText(/Échange avec Ash/)).toHaveCount(initialCount + 1);
});


test("exchange with message", async ({ page, browserName }) => {
    // test.skip(browserName === "webkit", "WebKit session locale instable");

    // Arrange
    await page.goto(`${URL_PAGE}/transactions`);
    const initialCount = await page.getByText(/Échange avec Ash/).count();

    await page.goto(`${URL_PAGE}/profile/3`);
    const openModalBtn = page.getByRole("button", { name: "Proposer un échange" });
    const modal = page.locator('div.fixed.inset-0');

    page.once('dialog', dialog => dialog.dismiss());

    // Act
    await expect(openModalBtn).toBeVisible();
    await openModalBtn.click();
    await expect(modal).toBeVisible();

    const receiverCard1 = modal.locator('div').filter({ hasText: /^Gruikui$/ }).first();
    await receiverCard1.click();
    await modal.getByRole("button", { name: "Suivant" }).click();

    const proposerCard1 = modal.locator('div').filter({ hasText: /^Pikachu$/ }).first();
    await proposerCard1.click();
    await modal.getByRole("button", { name: "Suivant" }).click();

    const messageBox = await modal.getByPlaceholder(/Salut, je suis très intéressé/);
    await messageBox.fill("Bonjour");

    await modal.getByRole("button", { name: "Envoyer la proposition" }).click();

    // Assert
    await expect(modal).toBeHidden({ timeout: 10000 });
    await page.goto(`${URL_PAGE}/transactions`);
    await expect(page.getByText(/Échange avec Ash/)).toHaveCount(initialCount + 1);
});


test("exchange 0 select", async ({ page, browserName }) => {
    // test.skip(browserName === "webkit", "WebKit session locale instable");

    // Arrange
    await page.goto(`${URL_PAGE}/transactions`);
    const initialCount = await page.getByText(/Échange avec /).count();

    await page.goto(`${URL_PAGE}/profile/3`);
    const openModalBtn = page.getByRole("button", { name: "Proposer un échange" });
    const modal = page.locator('div.fixed.inset-0');

    // Act
    await expect(openModalBtn).toBeVisible();
    await openModalBtn.click();
    await expect(modal).toBeVisible();

    const nextButton = modal.getByRole("button", { name: "Suivant" });

    await expect(nextButton).toBeDisabled();
    await nextButton.click({ force: true });
    await expect(nextButton).toBeDisabled();

    // Assert
    await page.goto(`${URL_PAGE}/transactions`);
    await expect(page.getByText(/Échange avec /)).toHaveCount(initialCount);

});


test("exchange 1v0", async ({ page, browserName }) => {
    // test.skip(browserName === "webkit", "WebKit session locale instable");

    // Arrange
    await page.goto(`${URL_PAGE}/transactions`);
    const initialCount = await page.getByText(/Échange avec /).count();

    await page.goto(`${URL_PAGE}/profile/3`);

    const openModalBtn = page.getByRole("button", { name: "Proposer un échange" });
    const modal = page.locator('div.fixed.inset-0');

    // Act
    await expect(openModalBtn).toBeVisible();
    await openModalBtn.click();
    await expect(modal).toBeVisible();

    const receiverCard1 = modal.locator('div').filter({ hasText: /^Gruikui$/ }).first();
    await receiverCard1.click();
    const nextButton = modal.getByRole("button", { name: "Suivant" });
    await nextButton.click();

    const nextButton2 = modal.getByRole("button", { name: "Suivant" });
    await nextButton2.click({ force: true });

    // Assert
    await expect(nextButton2).toBeDisabled();
    await page.goto(`${URL_PAGE}/transactions`);
    await expect(page.getByText(/Échange avec /)).toHaveCount(initialCount);

});