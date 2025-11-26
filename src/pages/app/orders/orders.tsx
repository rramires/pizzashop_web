import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { ArrowRight, Search, X } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

export function Orders() {
	return (
		<>
			<Helmet title='Pedidos' />
			<div className='flex flex-col gap-4'>
				<h1 className='text-3xl font-bold tracking-tight'>Pedidos</h1>
			</div>
			<div className='space-y-2.5'>
				<form className='flex items-center gap-2'>
					<span className='text-sm font-semibold'>Filtros:</span>
					<Input className='h-8 w-80' placeholder='Nome do cliente' />
				</form>
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
							return (
								<TableRow key={i}>
									<TableCell>
										<Button variant='outline' size='xs'>
											<Search className='h-3 w-3' />
											<span className='sr-only'>
												Detalhes do pedido
											</span>
										</Button>
									</TableCell>
									<TableCell className='font-mono text-xs font-medium'>
										8c52773a-ad5e
									</TableCell>
									<TableCell className='text-muted-foreground'>
										há 15 minutos
									</TableCell>
									<TableCell>
										<div className='flex items-center gap-2'>
											<span className='h-2 w-2 rounded-full bg-slate-400' />
											<span className='text-muted-foreground font-medium'>
												Pendente
											</span>
										</div>
									</TableCell>
									<TableCell className='font-medium'>
										Fulano da Silva
									</TableCell>
									<TableCell className='font-medium'>
										R$ 149,95
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
						})}
					</TableBody>
				</Table>
			</div>
		</>
	)
}
