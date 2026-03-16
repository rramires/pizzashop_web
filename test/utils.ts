import { type Page } from '@playwright/test'

export async function waitForUIInspection(page: Page, ms = 250) {
	if (process.env.PLAYWRIGHT_SLOW_UI === 'true') {
		await page.waitForTimeout(ms)
	}
}
