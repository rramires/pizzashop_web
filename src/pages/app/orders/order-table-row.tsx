import { ArrowRight, Search, X } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'

//export interface OrderTableRowProps {}

export function OrderTableRow() {
	return (
		<TableRow>
			<TableCell>
				<Button variant='outline' size='xs'>
					<Search className='h-3 w-3' />
					<span className='sr-only'>Detalhes do pedido</span>
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
			<TableCell className='font-medium'>Fulano da Silva</TableCell>
			<TableCell className='font-medium'>R$ 149,95</TableCell>
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
}
