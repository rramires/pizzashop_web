import { api } from '@/lib/axios'

export interface GetDayOrdersAmounthResponse {
	amount: number
	diffFromYesterday: number
}

export async function getDaysOrdersAmount() {
	const response = await api.get<GetDayOrdersAmounthResponse>(
		'/metrics/day-orders-amount',
	)
	return response.data
}
