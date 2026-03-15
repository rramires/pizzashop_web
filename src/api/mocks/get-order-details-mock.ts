import { http, HttpResponse } from 'msw'

import type {
	GetOrderDetailsProps,
	GetOrderDetailsResponse,
} from '../get-order-details'

export const getOrderDetailsMock = http.get<
	GetOrderDetailsProps,
	never,
	GetOrderDetailsResponse
>('/orders/:orderId', ({ params }) => {
	return HttpResponse.json({
		id: params.orderId,
		customer: {
			name: 'John Doe',
			email: 'johndoe@example.com',
			phone: '123124125115',
		},
		status: 'pending',
		createdAt: new Date(),
		totalInCents: 5000,
		orderItems: [
			{
				id: 'order-item-1',
				priceInCents: 1000,
				product: {
					name: 'Pizza Pepperoni',
				},
				quantity: 1,
			},
			{
				id: 'order-item-2',
				priceInCents: 2000,
				product: {
					name: 'Pizza Marguerita',
				},
				quantity: 2,
			},
		],
	})
})
