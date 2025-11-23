import { Helmet } from 'react-helmet-async'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'

const signUpForm = z.object({
	restaurantName: z.string(),
	managerName: z.string(),
	phone: z.string(),
	email: z.email(),
})

type SignUpFormType = z.infer<typeof signUpForm>

export function SignUp() {
	const navigate = useNavigate()

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<SignUpFormType>()

	async function handleSignUp(data: SignUpFormType) {
		try {
			//throw new Error('404 not found.')
			// await 2s for test
			console.log(data)
			await new Promise((resolve) => setTimeout(resolve, 2000))

			toast.success('Estabelecimento cadastrado com sucesso!', {
				action: {
					label: 'Login',
					onClick: () => navigate('/sign-in'),
				},
			})
		} catch (err: unknown) {
			toast.error(
				'Erro ao cadastrar estabelecimento!' + (err as Error).message,
			)
		}
	}

	return (
		<>
			<Helmet title='SignUp' />
			<div className='p-8'>
				<Button
					asChild
					variant='secondary'
					className='absolute top-8 right-8'
				>
					<Link to='/sign-in'>Voltar ao Login</Link>
				</Button>
				<div className='w[350px] flex flex-col justify-center gap-6'>
					<div className='flex flex-col gap-2 text-center'>
						<h1 className='text-2xl font-semibold tracking-tight'>
							Criar Conta Grátis
						</h1>
						<p className='text-muted-foreground text-sm'>
							Seja um parceiro e comece suas vendas!
						</p>
					</div>
					<form
						onSubmit={handleSubmit(handleSignUp)}
						className='space-y-4'
					>
						<div className='space-y-2'>
							<Label htmlFor='email'>
								Nome do estabelecimento
							</Label>
							<Input
								id='restaurantName'
								type='text'
								{...register('restaurantName')}
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='email'>Seu nome</Label>
							<Input
								id='managerName'
								type='text'
								{...register('managerName')}
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='email'>Telefone</Label>
							<Input
								id='phone'
								type='tel'
								{...register('phone')}
							/>
						</div>
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
							Finalizar Cadastro
						</Button>
						<p className='text-muted-foreground px-6 text-center text-sm leading-relaxed'>
							Ao continuar, você concorda com nossos{' '}
							<a className='underline underline-offset-4' href=''>
								Termos de Serviço
							</a>{' '}
							e{' '}
							<a className='underline underline-offset-4' href=''>
								Políticas de Privacidade
							</a>
							.
						</p>
					</form>
				</div>
			</div>
		</>
	)
}
