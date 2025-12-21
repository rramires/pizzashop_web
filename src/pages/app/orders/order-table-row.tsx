import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { cancelOrder } from '@/api/cancel-order'
import type { GetOrdersResponse } from '@/api/get-orders'
import { OrderStatus } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { datePastFormatter, priceFormatter } from '@/utils/formatter'

import { OrderDetails } from './order-details'

interface OrderTableRowProps {
	order: {
		orderId: string
		createdAt: Date
		status:
			| 'pending'
			| 'canceled'
			| 'processing'
			| 'delivering'
			| 'delivered'
		customerName: string
		total: number
	}
}

export function OrderTableRow({ order }: OrderTableRowProps) {
	const [isDetailsOpen, setIsDetailsOpen] = useState(false)
	const queryClient = useQueryClient()

	const { mutateAsync: cancelOrderFn } = useMutation({
		mutationFn: cancelOrder,
		onSuccess: (_, { orderId }) => {
			// get in all queries, with orders prefix
			const cache = queryClient.getQueriesData<GetOrdersResponse>({
				queryKey: ['orders'],
			})

			// iterate all queries
			cache.forEach(([cacheKey, cacheData]) => {
				if (!cacheData) {
					return
				}
				// update
				queryClient.setQueryData<GetOrdersResponse>(cacheKey, {
					...cacheData,
					// iterate all orders of actual query
					orders: cacheData.orders.map((order) => {
						// if match, update
						if (order.orderId === orderId) {
							return { ...order, status: 'canceled' }
						} else {
							return order
						}
					}),
				})
			})
		},
	})

	return (
		<TableRow>
			<TableCell>
				<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
					<DialogTrigger asChild>
						<Button variant='outline' size='xs'>
							<Search className='h-3 w-3' />
							<span className='sr-only'>Detalhes do pedido</span>
						</Button>
					</DialogTrigger>
					<OrderDetails
						open={isDetailsOpen}
						orderId={order.orderId}
					/>
				</Dialog>
			</TableCell>
			<TableCell className='font-mono text-xs font-medium'>
				{order.orderId}
			</TableCell>
			<TableCell className='text-muted-foreground'>
				{datePastFormatter(order.createdAt)}
			</TableCell>
			<TableCell>
				<OrderStatus status={order.status} />
			</TableCell>
			<TableCell className='font-medium'>{order.customerName}</TableCell>
			<TableCell className='font-medium'>
				{priceFormatter(order.total / 100)}
			</TableCell>
			<TableCell>
				<Button variant='outline' size='xs'>
					<ArrowRight className='h-3 w-3' />
					Aprovar
				</Button>
			</TableCell>
			<TableCell>
				<Button
					disabled={!['pending'].includes(order.status)}
					variant='ghost'
					size='xs'
					onClick={() => cancelOrderFn({ orderId: order.orderId })}
				>
					<X className='h-3 w-3' />
					Cancelar
				</Button>
			</TableCell>
		</TableRow>
	)
}
