import { Outlet } from 'react-router-dom'
import { Pizza } from 'lucide-react'

export function AuthLayout() {
	return (
		<>
			<div className='grid min-h-screen grid-cols-2'>
				<div className='border-foreground/75 bg-muted text-muted-foreground flex h-full flex-col justify-between border-r p-10'>
					<div className='text-foreground flex items-center gap-3 text-lg'>
						<Pizza className='h5 w5' />
						<span className='font-semibold'>Pizza Shop</span>
					</div>
					<footer className='text-sm'>
						Painel do Parceiro &copy; Pizza Shop -{' '}
						{new Date().getFullYear()}
					</footer>
				</div>
				<div className='flex flex-col items-center justify-center'>
					{/* Content will change here */}
					<Outlet />
				</div>
			</div>
		</>
	)
}
