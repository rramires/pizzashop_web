import { ArrowRight, Search, X } from 'lucide-react'

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
	return (
		<TableRow>
			<TableCell>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant='outline' size='xs'>
							<Search className='h-3 w-3' />
							<span className='sr-only'>Detalhes do pedido</span>
						</Button>
					</DialogTrigger>
					<OrderDetails />
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
				{priceFormatter(order.total)}
			</TableCell>
			<TableCell>
				<Button variant='outline' size='xs'>
					<ArrowRight className='h-3 w-3' />
					Aprovar
				</Button>
			</TableCell>
			<TableCell>
				<Button variant='ghost' size='xs'>
					<X className='h-3 w-3' />
					Cancelar
				</Button>
			</TableCell>
		</TableRow>
	)
}
