import { Helmet } from 'react-helmet-async'

export function SignIn() {
	//throw new Error('Simulação de erro no SignIn')
	return (
		<>
			<Helmet title='SignIn' />
			<div className='text-center'>
				<h2 className='text-2xl font-bold'>SignIn Page!</h2>
			</div>
		</>
	)
}
