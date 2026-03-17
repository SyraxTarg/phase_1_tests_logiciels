import { test, expect } from '@playwright/test';

test('login successful', async ({ page, browserName }) => {

  test.skip(browserName === 'webkit', 'Webkit a des problèmes de gestion de session en local');

  // Arrange
  await page.goto('http://localhost:3000/login');
  const username_textbox = await page.getByRole('textbox', { name: 'Username' });
  const password_textbox = await page.getByRole('textbox', { name: 'Mot de passe' });
  const submit_button = await page.getByRole('button', { name: 'Se connecter' });

  // Act
  await username_textbox.fill('Alice');
  await password_textbox.fill('password123');
  await submit_button.click();

  // Assert
  await expect(page).toHaveURL('http://localhost:3000/');
});


test('login failed', async ({ page, browserName }) => {

  test.skip(browserName === 'webkit', 'Webkit a des problèmes de gestion de session en local');

  // Arrange
  await page.goto('http://localhost:3000/login');
  const username_textbox = await page.getByRole('textbox', { name: 'Username' });
  const password_textbox = await page.getByRole('textbox', { name: 'Mot de passe' });
  const submit_button = await page.getByRole('button', { name: 'Se connecter' });

  // Act
  await username_textbox.fill('Alice');
  await password_textbox.fill('toto');
  await submit_button.click();

  // Assert
  await page.getByText("Identifiants incorrects.")
});


test('login no username', async ({ page, browserName }) => {

  test.skip(browserName === 'webkit', 'Webkit a des problèmes de gestion de session en local');

  await page.goto('http://localhost:3000/login');
  const username_textbox = await page.getByRole('textbox', { name: 'Username' });
  const password_textbox = await page.getByRole('textbox', { name: 'Mot de passe' });
  const submit_button = await page.getByRole('button', { name: 'Se connecter' });

  await username_textbox.fill('');
  await password_textbox.fill('password123');
  await submit_button.click();

  await page.getByText("Identifiants incorrects.")
});


test('login no password', async ({ page, browserName }) => {

  test.skip(browserName === 'webkit', 'Webkit a des problèmes de gestion de session en local');

  await page.goto('http://localhost:3000/login');
  const username_textbox = await page.getByRole('textbox', { name: 'Username' });
  const password_textbox = await page.getByRole('textbox', { name: 'Mot de passe' });
  const submit_button = await page.getByRole('button', { name: 'Se connecter' });

  await username_textbox.fill('Alice');
  await password_textbox.fill('');
  await submit_button.click();

  await page.getByText("Identifiants incorrects.")
});
