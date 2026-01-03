import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { NavLink } from './nav-link'

describe('NavLink', () => {
	it('shoudl highlight when is the current page', () => {
		const wrapper = render(
			<>
				<NavLink to='/'>Home</NavLink>
				<NavLink to='/about'>About</NavLink>
			</>,
			{
				// * This wrapper is not the same "const wrapper =" from the beginning.
				wrapper: ({ children }) => {
					return (
						<MemoryRouter initialEntries={['/about']}>
							{children}
						</MemoryRouter>
					)
				},
			},
		)
		// use to check NavLinks data-current values in console
		//wrapper.debug()

		expect(wrapper.getByText('Home').dataset.current).toEqual('false')
		expect(wrapper.getByText('About').dataset.current).toEqual('true')
	})
})
