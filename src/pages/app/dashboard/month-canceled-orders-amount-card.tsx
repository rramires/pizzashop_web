import { useQuery } from '@tanstack/react-query'
import { Frown } from 'lucide-react'

import { getMonthCanceledOrdersAmount } from '@/api/get-month-canceled-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { numberFormatter } from '@/utils/formatters'

import { MetricCardSkeleton } from './metric-card-skeleton'

export function MonthCanceledOrdersAmountCard() {
	const { data: monthCanceledOrdersAmount } = useQuery({
		queryFn: getMonthCanceledOrdersAmount,
		queryKey: ['metrics', 'month-canceled-orders-amount'],
	})

	return (
		<Card>
			<CardHeader className='flex items-center justify-between pb-2'>
				<CardTitle className='text-base'>Cancelamentos (mês)</CardTitle>
				<Frown className='text-muted-foreground h-4 w-4' />
			</CardHeader>
			<CardContent className='space-y-1'>
				{monthCanceledOrdersAmount ? (
					<>
						<span className='text-2xl font-bold tracking-tight'>
							{numberFormatter(monthCanceledOrdersAmount.amount)}
						</span>
						<p className='text-muted-foreground text-xs'>
							{monthCanceledOrdersAmount.diffFromLastMonth < 0 ? (
								<>
									<span className='text-emerald-500 dark:text-emerald-400'>
										-
										{
											monthCanceledOrdersAmount.diffFromLastMonth
										}
									</span>{' '}
									em relação ao mês passado
								</>
							) : (
								<>
									<span className='text-rose-500 dark:text-rose-400'>
										+
										{
											monthCanceledOrdersAmount.diffFromLastMonth
										}
									</span>{' '}
									em relação ao mês passado
								</>
							)}
						</p>
					</>
				) : (
					<MetricCardSkeleton />
				)}
			</CardContent>
		</Card>
	)
}
