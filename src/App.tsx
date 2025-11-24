// adicione os imports
import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { router } from './routes'
import { ThemeProvider } from './components/theme/theme-provider'

export function App() {
	return (
		<HelmetProvider>
			<ThemeProvider storageKey='pizzashop-theme' defaultTheme='dark'>
				<Helmet titleTemplate='%s | PizzaShop' />
				<Toaster richColors closeButton />
				<RouterProvider router={router} />
			</ThemeProvider>
		</HelmetProvider>
	)
}
