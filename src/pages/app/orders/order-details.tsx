import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

export function OrderDetails() {
	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Pedido: {'8c52773a-ad5e'}</DialogTitle>
				<DialogDescription>Detalhes do Pedido</DialogDescription>
			</DialogHeader>
			<div className='space-y-6'>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell className='text-muted-foreground'>
								Status
							</TableCell>
							<TableCell className='flex justify-end'>
								<div className='flex items-center gap-2'>
									<span className='h-2 w-2 rounded-full bg-slate-400' />
									<span className='text-muted-foreground font-medium'>
										Pendente
									</span>
								</div>
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className='text-muted-foreground'>
								Cliente
							</TableCell>
							<TableCell className='flex justify-end'>
								Fulano da Silva
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className='text-muted-foreground'>
								Telefone
							</TableCell>
							<TableCell className='flex justify-end'>
								(41) 98765-4321
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className='text-muted-foreground'>
								E-mail
							</TableCell>
							<TableCell className='flex justify-end'>
								fulano@email.com
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className='text-muted-foreground'>
								Realizado há
							</TableCell>
							<TableCell className='flex justify-end'>
								37 minutos
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Produto</TableHead>
							<TableHead className='text-right'>Qtd.</TableHead>
							<TableHead className='text-right'>Preço</TableHead>
							<TableHead className='text-right'>
								Subtotal
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell>Pizza Pepperoni Especial</TableCell>
							<TableCell className='text-right'>2</TableCell>
							<TableCell className='text-right'>
								R$ 80,00
							</TableCell>
							<TableCell className='text-right'>
								R$ 160,00
							</TableCell>
						</TableRow>
						<TableRow>
							<TableCell>Pizza Mussarela</TableCell>
							<TableCell className='text-right'>2</TableCell>
							<TableCell className='text-right'>
								R$ 70,00
							</TableCell>
							<TableCell className='text-right'>
								R$ 140,00
							</TableCell>
						</TableRow>
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell colSpan={3}>Total do Pedido</TableCell>
							<TableCell className='text-right font-medium'>
								R$ 300,00
							</TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</div>
		</DialogContent>
	)
}
