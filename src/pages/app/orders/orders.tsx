import { Helmet } from 'react-helmet-async'

import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

import { OrderTableFilters } from './order-table-filters'
import { OrderTableRow } from './order-table-row'

export function Orders() {
	return (
		<>
			<Helmet title='Pedidos' />
			<div className='flex flex-col gap-4'>
				<h1 className='text-3xl font-bold tracking-tight'>Pedidos</h1>
			</div>
			<div className='space-y-2.5'>
				<OrderTableFilters />
			</div>
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='w-16'></TableHead>
							<TableHead className='w-35'>
								Identificador
							</TableHead>
							<TableHead className='w-45'>Realizado</TableHead>
							<TableHead className='w-35'>Status</TableHead>
							<TableHead>Cliente</TableHead>
							<TableHead className='w-35'>
								Total do pedido
							</TableHead>
							<TableHead className='w-41'></TableHead>
							<TableHead className='w-33'></TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{Array.from({ length: 10 }).map((_, i) => {
							return <OrderTableRow key={i} />
						})}
					</TableBody>
				</Table>
			</div>
		</>
	)
}
