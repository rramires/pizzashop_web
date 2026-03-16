import { expect, test } from '@playwright/test'

import { waitForUIInspection } from './utils'

test('sign in successfully', async ({ page }) => {
	await page.goto('/sign-in', { waitUntil: 'networkidle' })

	await page.getByLabel('Seu e-mail').fill('fulano@email.com')
	await page.getByRole('button', { name: 'Acessar painel' }).click()

	const toast = page.getByText(
		'Enviamos um link de autenticação para seu e-mail',
	)

	await expect(toast).toBeVisible()

	await waitForUIInspection(page)
})

test('sign in with wrong credentials', async ({ page }) => {
	await page.goto('/sign-in', { waitUntil: 'networkidle' })

	await page.getByLabel('Seu e-mail').fill('wrong@email.com')
	await page.getByRole('button', { name: 'Acessar painel' }).click()

	const toast = page.getByText('E-mail inválido!')

	await expect(toast).toBeVisible()

	await waitForUIInspection(page)
})

test('navigate to new restaurant page', async ({ page }) => {
	await page.goto('/sign-in', { waitUntil: 'networkidle' })

	await page.getByRole('link', { name: 'Cadastrar Estabelecimento' }).click()

	await expect(page.url()).toContain('/sign-up')

	await waitForUIInspection(page)
})
