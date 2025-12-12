import { BarChart } from 'lucide-react'
import {
	Cell,
	Pie,
	PieChart,
	type PieLabelRenderProps,
	ResponsiveContainer,
} from 'recharts'
import colors from 'tailwindcss/colors'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
	{ product: 'Pepperoni', amount: 40 },
	{ product: 'Mussarela', amount: 60 },
	{ product: 'Marguerita ', amount: 25 },
	{ product: '4 Queijos', amount: 35 },
	{ product: 'Frango c/ Catupiry', amount: 50 },
]

const COLORS = [
	colors.sky[500],
	colors.amber[500],
	colors.violet[500],
	colors.emerald[500],
	colors.rose[500],
]

const renderColors = data.map((_, index) => {
	return (
		<Cell
			key={`cell-${index}`}
			fill={COLORS[index]}
			className='stroke-accent hover:opacity-80'
		/>
	)
})

const renderLabels = ({
	cx,
	cy,
	midAngle,
	innerRadius,
	outerRadius,
	value,
	index,
}: PieLabelRenderProps) => {
	const RADIAN = Math.PI / 180
	const radius = 12 + innerRadius + (outerRadius - innerRadius)
	const x = cx + radius * Math.cos(-midAngle! * RADIAN)
	const y = cy + radius * Math.sin(-midAngle! * RADIAN)

	return (
		<text
			x={x}
			y={y}
			className='fill-muted-foreground text-xs'
			textAnchor={x > cx ? 'start' : 'end'}
			dominantBaseline='central'
		>
			{data[index].product.length > 15
				? data[index].product.substring(0, 13).concat('...')
				: data[index].product}{' '}
			({value})
		</text>
	)
}

export function PopularProductsChart() {
	return (
		<Card className='col-span-3'>
			<CardHeader className='pb-8'>
				<div className='flex items-center justify-between'>
					<CardTitle className='text-base font-medium'>
						Produtos Populares
					</CardTitle>
					<BarChart className='text-muted-foreground h-4 w-4' />
				</div>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer width='100%' height={240}>
					<PieChart style={{ fontSize: 12 }}>
						<Pie
							data={data}
							type='linear'
							dataKey='amount'
							nameKey='product'
							strokeWidth={2}
							cx='50%'
							cy='50%'
							outerRadius={86}
							innerRadius={64}
							labelLine={false}
							label={renderLabels}
						>
							{renderColors}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	)
}
