import { test, expect } from '@playwright/test';

test('exemplo: validar acesso válido @fast', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Username').fill('tomsmith');
  await page.getByLabel('Password').fill('SuperSecretPassword!');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('id=flash')).toContainText(
    'You logged into a secure area!'
  );
});

test('exemplo: validar acesso inválido - usuário/senha inválido @fast', async ({
  page
}) => {
  await page.goto('/login');
  await page.getByLabel('Username').fill('username');
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.locator('id=flash')).toContainText(
    'Your username is invalid!'
  );
});

const accounts = [
  {
    description: 'campos em branco',
    username: '',
    password: '',
    errorMessage: 'Your username is invalid!'
  },
  {
    description: 'senha em branco',
    username: 'tomsmith',
    password: '',
    errorMessage: 'Your password is invalid!'
  },
  {
    description: 'usuario inválido',
    username: 'tomsmit',
    password: 'tomsmit',
    errorMessage: 'Your username is invalid!'
  },
  {
    description: 'senha inválida',
    username: 'tomsmith',
    password: '',
    errorMessage: 'Your password is invalid!'
  }
];

for (const account of accounts) {
  test(`exemplo: validar acesso inválido - ${account.description} @smoke @slow`, async ({
    page
  }) => {
    await page.goto('/login');
    await page.getByLabel('Username').fill(account.username);
    await page.getByLabel('Password').fill(account.password);
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.locator('id=flash')).toContainText(account.errorMessage);
  });
}
