import { Helmet } from 'react-helmet-async'
import { Button } from '@/components/ui/button'

export function Dashboard() {
	//throw new Error('Simulação de erro no Dashboard')
	return (
		<>
			<Helmet title='Dashboard' />
			<div className='text-center'>
				<h2 className='text-2xl font-bold'>Dashboard Page!</h2>
				<Button variant='outline'>Teste</Button>
			</div>
		</>
	)
}
