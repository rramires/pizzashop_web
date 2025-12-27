import { useQuery } from '@tanstack/react-query'
import { DollarSign } from 'lucide-react'

import { getMonthRevenue } from '@/api/get-month-revenue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { priceFormatter } from '@/utils/formatters'

export function MonthRevenueCard() {
	const { data: monthRevenue } = useQuery({
		queryFn: getMonthRevenue,
		queryKey: ['metrics', 'month-revenue'],
	})

	return (
		<Card>
			<CardHeader className='flex items-center justify-between pb-2'>
				<CardTitle className='text-base'>Receita Total (mês)</CardTitle>
				<DollarSign className='text-muted-foreground h-4 w-4' />
			</CardHeader>
			<CardContent className='space-y-1'>
				{monthRevenue && (
					<>
						<span className='text-2xl font-bold tracking-tight'>
							{priceFormatter(monthRevenue.receipt / 100)}
						</span>
						<p className='text-muted-foreground text-xs'>
							{monthRevenue.diffFromLastMonth >= 0 ? (
								<>
									<span className='text-emerald-500 dark:text-emerald-400'>
										+{monthRevenue.diffFromLastMonth}
									</span>{' '}
									em relação a ontem
								</>
							) : (
								<>
									<span className='text-rose-500 dark:text-rose-400'>
										{monthRevenue.diffFromLastMonth}
									</span>{' '}
									em relação a ontem
								</>
							)}
						</p>
					</>
				)}
			</CardContent>
		</Card>
	)
}
