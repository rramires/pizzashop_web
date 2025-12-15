import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
	email: z.email(),
})

type SignInFormType = z.infer<typeof signInForm>

export function SignIn() {
	const { mutateAsync: authenticate } = useMutation({
		mutationFn: signIn,
	})

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<SignInFormType>({
		resolver: zodResolver(signInForm),
	})

	async function handleSignIn(data: SignInFormType) {
		try {
			await authenticate({ email: data.email })

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
