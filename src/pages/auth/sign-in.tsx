import { Helmet } from 'react-helmet-async'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { Link } from 'react-router-dom'

const signInForm = z.object({
	email: z.email(),
})

type SignInFormType = z.infer<typeof signInForm>

export function SignIn() {
	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<SignInFormType>()

	async function handleSignIn(data: SignInFormType) {
		try {
			//throw new Error('404 not found.')
			// await 2s for test
			console.log(data)
			await new Promise((resolve) => setTimeout(resolve, 2000))

			toast.success('Enviamos um link de autenticação para seu e-mail.', {
				action: {
					label: 'Reenviar',
					onClick: () => handleSignIn(data),
				},
			})
		} catch (err: unknown) {
			toast.error('E-mail inválido!' + (err as Error).message)
		}
	}

	return (
		<>
			<Helmet title='SignIn' />
			<div className='p-8'>
				<Button
					asChild
					variant='secondary'
					className='absolute top-8 right-8'
				>
					<Link to='/sign-up'>Cadastrar Estabelecimento</Link>
				</Button>
				<div className='w[350px] flex flex-col justify-center gap-6'>
					<div className='flex flex-col gap-2 text-center'>
						<h1 className='text-2xl font-semibold tracking-tight'>
							Acessar Painel
						</h1>
						<p className='text-muted-foreground text-sm'>
							Acompanhe suas vendas pelo painel do parceiro!
						</p>
					</div>
					<form
						onSubmit={handleSubmit(handleSignIn)}
						className='space-y-4'
					>
						<div className='space-y-2'>
							<Label htmlFor='email'>Seu e-mail</Label>
							<Input
								id='email'
								type='email'
								{...register('email')}
							/>
						</div>
						<Button
							disabled={isSubmitting}
							className='w-full'
							type='submit'
						>
							Acessar Painel
						</Button>
					</form>
				</div>
			</div>
		</>
	)
}
