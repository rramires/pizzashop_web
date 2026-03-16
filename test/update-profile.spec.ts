import { expect, test } from '@playwright/test'

import { waitForUIInspection } from './utils'

test('update profile successfully', async ({ page }) => {
	await page.goto('/', { waitUntil: 'networkidle' })

	await page.getByRole('button', { name: 'Pizza Shop' }).click()
	await page.getByRole('menuitem', { name: 'Perfil da loja' }).click()

	await page.getByLabel('Nome').fill('Pizza Shop Updated')
	await page.getByLabel('Descrição').fill('Another Description')

	await page.getByRole('button', { name: 'Salvar' }).click()

	await page.waitForLoadState('networkidle')

	const toast = page.getByText('Perfil atualizado com sucesso!')

	await expect(toast).toBeVisible()

	await page.getByRole('button', { name: 'Cancelar' }).click()

	//await page.waitForTimeout(250)

	await expect(
		page.getByRole('button', { name: 'Pizza Shop Updated' }),
	).toBeVisible()

	await waitForUIInspection(page)
})
