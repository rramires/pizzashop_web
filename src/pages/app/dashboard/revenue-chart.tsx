import { useQuery } from '@tanstack/react-query'
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	/* Tooltip, */
	XAxis,
	YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import { getDailyRevenueInPeriod } from '@/api/get-daily-revenue-in-period'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

export function RevenueChart() {
	const { data: dailyRevenueInPeriod } = useQuery({
		queryFn: getDailyRevenueInPeriod,
		queryKey: ['metrics', 'daily-receipt-in-period'],
	})

	return (
		<Card className='col-span-6'>
			<CardHeader className='flex-row items-center justify-between pb-8'>
				<div className='space-y-1'>
					<CardTitle className='text-base font-medium'>
						Receita no Período
					</CardTitle>
					<CardDescription>
						Receita diária no período.
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				{dailyRevenueInPeriod && (
					<ResponsiveContainer width='100%' height={240}>
						<LineChart
							data={dailyRevenueInPeriod}
							style={{ fontSize: 12 }}
							margin={{ left: 8, right: 8 }}
						>
							<XAxis
								dy={12}
								stroke={colors.gray[500]}
								dataKey='date'
								axisLine={false}
								tickLine={false}
							/>
							<YAxis
								stroke={colors.gray[500]}
								axisLine={false}
								tickLine={false}
								tickFormatter={(value: number) => {
									return value.toLocaleString('pt-BR', {
										style: 'currency',
										currency: 'BRL',
									})
								}}
							/>
							<CartesianGrid
								vertical={false}
								className='stroke-muted'
							/>
							<Line
								stroke={colors.red[400]}
								type='linear'
								dataKey='receipt'
								strokeWidth={2}
							/>
						</LineChart>
					</ResponsiveContainer>
				)}
			</CardContent>
		</Card>
	)
}
