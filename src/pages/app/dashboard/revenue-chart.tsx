import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { Loader2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { DateRange } from 'react-day-picker'
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
import { DatePicker } from '@/components/ui/date-picker'
import { Label } from '@/components/ui/label'

export function RevenueChart() {
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: subDays(new Date(), 7),
		to: new Date(),
	})

	const { data: dailyRevenueInPeriod } = useQuery({
		queryKey: ['metrics', 'daily-revenue-in-period', dateRange],
		queryFn: () =>
			getDailyRevenueInPeriod({
				from: dateRange?.from,
				to: dateRange?.to,
			}),
	})

	const chartData = useMemo(() => {
		return dailyRevenueInPeriod?.map((chartItem) => {
			return {
				date: chartItem.date,
				receipt: chartItem.receipt / 100,
			}
		})
	}, [dailyRevenueInPeriod])

	return (
		<Card className='col-span-6'>
			<CardHeader className='flex flex-row items-center justify-between'>
				<div className='space-y-1'>
					<CardTitle className='text-base font-medium'>
						Receita periodo
					</CardTitle>
					<CardDescription>Receita diária no período</CardDescription>
				</div>
				<div className='flex w-auto items-center gap-3'>
					<Label>Periodo de</Label>
					<DatePicker
						name='startDate'
						currentDate={dateRange?.from}
						onChangeDate={(date) => {
							setDateRange((prev) => ({
								from: date,
								to: prev?.to,
							}))
						}}
					/>
					<Label> a </Label>
					<DatePicker
						name='finalDate'
						currentDate={dateRange?.to}
						onChangeDate={(date) => {
							setDateRange((prev) => ({
								from: prev?.from,
								to: date,
							}))
						}}
					/>
				</div>
			</CardHeader>
			<CardContent>
				{dailyRevenueInPeriod ? (
					<ResponsiveContainer width='100%' height={240}>
						<LineChart
							data={chartData}
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
				) : (
					<div className='flex h-60 w-full items-center justify-center'>
						<Loader2 className='text-muted-foreground h-8 w-8 animate-spin' />
					</div>
				)}
			</CardContent>
		</Card>
	)
}
