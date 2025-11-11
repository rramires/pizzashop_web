import { Helmet } from 'react-helmet-async'

export function NotFound() {
	return (
		<>
			<Helmet title='Not Found' />
			<div className='flex h-screen flex-col items-center justify-center'>
				<h1 className='text-3xl font-bold'>
					404 - Página não encontrada
				</h1>
				<h3 className='font-bold'>
					Voltar para a
					<a
						className='ml-1 text-blue-600 hover:text-blue-800 hover:underline'
						href='/'
					>
						página inicial
					</a>
				</h3>
			</div>
		</>
	)
}
