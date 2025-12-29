import { useQuery } from '@tanstack/react-query'
import { BarChart, Loader2 } from 'lucide-react'
import {
	Cell,
	Pie,
	PieChart,
	type PieLabelRenderProps,
	ResponsiveContainer,
} from 'recharts'
import colors from 'tailwindcss/colors'

import {
	getPopularProducts,
	type GetPopularProductsResponse,
} from '@/api/get-popular-products'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const COLORS = [
	colors.sky[500],
	colors.amber[500],
	colors.violet[500],
	colors.emerald[500],
	colors.rose[500],
]

function renderColors(data: GetPopularProductsResponse) {
	return data.map((_, index) => {
		return (
			<Cell
				key={`cell-${index}`}
				fill={COLORS[index]}
				className='stroke-accent hover:opacity-80'
			/>
		)
	})
}

function renderLabels(data: GetPopularProductsResponse) {
	return ({
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
}

export function PopularProductsChart() {
	const { data: popularProducts } = useQuery({
		queryFn: getPopularProducts,
		queryKey: ['metrics', 'popular-products'],
	})

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
				{popularProducts ? (
					<ResponsiveContainer width='100%' height={240}>
						<PieChart style={{ fontSize: 12 }}>
							<Pie
								data={popularProducts}
								type='linear'
								dataKey='amount'
								nameKey='product'
								strokeWidth={2}
								cx='50%'
								cy='50%'
								outerRadius={86}
								innerRadius={64}
								labelLine={false}
								label={renderLabels(popularProducts)}
							>
								{renderColors(popularProducts)}
							</Pie>
						</PieChart>
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
