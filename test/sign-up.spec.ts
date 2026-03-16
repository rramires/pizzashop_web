import { expect, test } from '@playwright/test'

import { waitForUIInspection } from './utils'

test('sign up successfully', async ({ page }) => {
	await page.goto('/sign-up', { waitUntil: 'networkidle' })

	await page.getByLabel('Nome do estabelecimento').fill('Pizza Shop')
	await page.getByLabel('Seu nome').fill('Fulano')
	await page.getByLabel('Seu e-mail').fill('fulano@email.com')
	await page.getByLabel('Seu celular').fill('123812641264')

	await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

	const toast = page.getByText('Estabelecimento cadastrado com sucesso')

	expect(toast).toBeVisible()

	await waitForUIInspection(page)
})

test('sign up with error', async ({ page }) => {
	await page.goto('/sign-up', { waitUntil: 'networkidle' })

	await page.getByLabel('Nome do estabelecimento').fill('Invalid name')
	await page.getByLabel('Seu nome').fill('Fulano')
	await page.getByLabel('Seu e-mail').fill('fulano@email.com')
	await page.getByLabel('Seu celular').fill('123812641264')

	await page.getByRole('button', { name: 'Finalizar cadastro' }).click()

	const toast = page.getByText('Erro ao cadastrar estabelecimento')

	expect(toast).toBeVisible()

	await waitForUIInspection(page)
})

test('navigate to login page', async ({ page }) => {
	await page.goto('/sign-up', { waitUntil: 'networkidle' })

	await page.getByRole('link', { name: 'Voltar ao Login' }).click()

	expect(page.url()).toContain('/sign-in')

	await waitForUIInspection(page)
})
