import { test, expect } from '@playwright/test';

test('login successful', async ({ page, browserName }) => {

  test.skip(browserName === 'webkit', 'Webkit a des problèmes de gestion de session en local');
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('Alice');
  await page.getByRole('textbox', { name: 'Mot de passe' }).fill('password123');
  await page.getByRole('button', { name: 'Se connecter' }).click();

  await expect(page).toHaveURL('http://localhost:3000/');
});


test('login failed', async ({ page, browserName }) => {

  test.skip(browserName === 'webkit', 'Webkit a des problèmes de gestion de session en local');
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('Alice');
  await page.getByRole('textbox', { name: 'Mot de passe' }).fill('toto');
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await page.getByText("Identifiants incorrects.")
});


test('login no username', async ({ page, browserName }) => {

  test.skip(browserName === 'webkit', 'Webkit a des problèmes de gestion de session en local');
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('');
  await page.getByRole('textbox', { name: 'Mot de passe' }).fill('password123');
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await page.getByText("Identifiants incorrects.")
});


test('login no password', async ({ page, browserName }) => {

  test.skip(browserName === 'webkit', 'Webkit a des problèmes de gestion de session en local');
  await page.goto('http://localhost:3000/login');
  await page.getByRole('textbox', { name: 'Username' }).fill('Alice');
  await page.getByRole('textbox', { name: 'Mot de passe' }).fill('');
  await page.getByRole('button', { name: 'Se connecter' }).click();
  await page.getByText("Identifiants incorrects.")
});
