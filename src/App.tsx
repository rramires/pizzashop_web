// adicione os imports
import { RouterProvider } from 'react-router-dom'

import { router } from './routes'

export function App() {
	// substitua o Hello World
	return <RouterProvider router={router} />
}
