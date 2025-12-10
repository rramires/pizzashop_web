import {
	/* CartesianGrid, */
	Line,
	LineChart,
	ResponsiveContainer,
	/* Tooltip, */
	XAxis,
	YAxis,
} from 'recharts'
import colors from 'tailwindcss/colors'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

const data = [
	{ date: '10/12', revenue: 1200 },
	{ date: '11/12', revenue: 800 },
	{ date: '12/12', revenue: 900 },
	{ date: '13/12', revenue: 400 },
	{ date: '14/12', revenue: 2300 },
	{ date: '15/12', revenue: 800 },
	{ date: '16/12', revenue: 640 },
]

export function RevenueChart() {
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
				<ResponsiveContainer width='100%' height={240}>
					<LineChart
						data={data}
						style={{ fontSize: 12 }}
						margin={{ left: 8, right: 8 }}
					>
						<XAxis
							dy={12}
							dataKey='date'
							axisLine={false}
							tickLine={false}
						/>
						<YAxis
							stroke='#888'
							axisLine={false}
							tickLine={false}
							tickFormatter={(value: number) => {
								return value.toLocaleString('pt-BR', {
									style: 'currency',
									currency: 'BRL',
								})
							}}
						/>
						<Line
							stroke={colors.red[400]}
							type='linear'
							dataKey='revenue'
							strokeWidth={2}
						/>
					</LineChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	)
}
