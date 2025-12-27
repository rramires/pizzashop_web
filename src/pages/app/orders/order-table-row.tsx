import { useMutation, useQueryClient } from '@tanstack/react-query'
import { ArrowRight, Search, X } from 'lucide-react'
import { useState } from 'react'

import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import type { GetOrdersResponse } from '@/api/get-orders'
import { OrderStatus } from '@/components/order-status'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { datePastFormatter, priceFormatter } from '@/utils/formatters'

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

	function updateOrderStatusOnCache(orderId: string, status: OrderStatus) {
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
						return { ...order, status }
					} else {
						return order
					}
				}),
			})
		})
	}

	const { mutateAsync: approveOrderFn, isPending: isApprovingOrder } =
		useMutation({
			mutationFn: approveOrder,
			onSuccess: (_, { orderId }) => {
				updateOrderStatusOnCache(orderId, 'processing')
			},
		})

	const { mutateAsync: cancelOrderFn, isPending: isCancelingOrder } =
		useMutation({
			mutationFn: cancelOrder,
			onSuccess: (_, { orderId }) => {
				updateOrderStatusOnCache(orderId, 'canceled')
			},
		})

	const { mutateAsync: deliverOrderFn, isPending: isDeliveringOrder } =
		useMutation({
			mutationFn: deliverOrder,
			onSuccess: (_, { orderId }) => {
				updateOrderStatusOnCache(orderId, 'delivered')
			},
		})

	const { mutateAsync: dispatchOrderFn, isPending: isDispathcingOrder } =
		useMutation({
			mutationFn: dispatchOrder,
			onSuccess: (_, { orderId }) => {
				updateOrderStatusOnCache(orderId, 'delivering')
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
				{order.status === 'pending' && (
					<Button
						disabled={isApprovingOrder}
						onClick={() =>
							approveOrderFn({ orderId: order.orderId })
						}
						variant='outline'
						size='xs'
					>
						<ArrowRight className='h-3 w-3' />
						Aprovar
					</Button>
				)}

				{order.status === 'processing' && (
					<Button
						disabled={isDispathcingOrder}
						onClick={() =>
							dispatchOrderFn({ orderId: order.orderId })
						}
						variant='outline'
						size='xs'
					>
						<ArrowRight className='h-3 w-3' />
						Em entrega
					</Button>
				)}

				{order.status === 'delivering' && (
					<Button
						disabled={isDeliveringOrder}
						onClick={() =>
							deliverOrderFn({ orderId: order.orderId })
						}
						variant='outline'
						size='xs'
					>
						<ArrowRight className='h-3 w-3' />
						Entregue
					</Button>
				)}
			</TableCell>
			<TableCell>
				<Button
					disabled={
						!['pending'].includes(order.status) || isCancelingOrder
					}
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
