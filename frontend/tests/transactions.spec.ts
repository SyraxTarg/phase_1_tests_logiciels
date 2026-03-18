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

  await page.goto(`${URL_PAGE}/transactions`);

  await page
    .locator("#form-1")
    .getByRole("textbox", { name: "Écrire un message..." })
    .click();
  await page
    .locator("#form-1")
    .getByRole("textbox", { name: "Écrire un message..." })
    .fill("Salut Toto !");
  await page
    .locator("#form-1")
    .getByRole("button", { name: "Envoyer" })
    .click();

  await expect(page.getByText("MoiSalut Toto !").first()).toBeVisible();
});

let acceptTransactionRunCount = 0;

test("accept transaction", async ({ page, browserName }) => {
  test.skip(
    browserName === "webkit",
    "Webkit a des problèmes de gestion de session en local",
  );

  await page.goto(`${URL_PAGE}/transactions`);

  const pendingTransactions = page.getByText(/Échange avec Iris.*pending/);

  await expect(pendingTransactions).toHaveCount(2 - acceptTransactionRunCount);

  const irisPendingCard = page
    .locator("div.rounded-2xl")
    .filter({ has: page.getByRole("heading", { name: /Échange avec Iris/ }) })
    .filter({ has: page.getByText("pending") })
    .first();

  const acceptButton = irisPendingCard.getByRole("button", {
    name: "Accepter l'échange",
  });

  await expect(acceptButton).toBeVisible();
  await acceptButton.click();

  await expect(pendingTransactions).toHaveCount(1 - acceptTransactionRunCount, {
    timeout: 10000,
  });

  await page.getByRole("button", { name: /^Acceptées/ }).click();
  const rejectedTransactions = page.getByText(/Échange avec Iris.*accepted/);
  await expect(rejectedTransactions).toHaveCount(
    1 + acceptTransactionRunCount,
    {
      timeout: 10000,
    },
  );

  acceptTransactionRunCount++;
});

let rejectTransactionRunCount = 0;

test("reject transaction", async ({ page, browserName }) => {
  test.skip(
    browserName === "webkit",
    "Webkit a des problèmes de gestion de session en local",
  );

  await page.goto(`${URL_PAGE}/transactions`);

  const pendingTransactions = page.getByText(/Échange avec Joelle.*pending/);

  await expect(pendingTransactions).toHaveCount(2 - rejectTransactionRunCount);

  const joellePendingCard = page
    .locator("div.rounded-2xl")
    .filter({ has: page.getByRole("heading", { name: /Échange avec Joelle/ }) })
    .filter({ has: page.getByText("pending") })
    .first();

  const rejectButton = joellePendingCard.getByRole("button", {
    name: "Refuser",
  });

  await expect(rejectButton).toBeVisible();
  await rejectButton.click();

  await expect(pendingTransactions).toHaveCount(1 - rejectTransactionRunCount, {
    timeout: 10000,
  });

  await page.getByRole("button", { name: /^Refusées/ }).click();
  const rejectedTransactions = page.getByText(/Échange avec Joelle.*rejected/);
  await expect(rejectedTransactions).toHaveCount(
    1 + rejectTransactionRunCount,
    {
      timeout: 10000,
    },
  );

  rejectTransactionRunCount++;
});
