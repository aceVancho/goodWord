import { FC } from 'react'
import {
	BrowserRouter,
	Route,
	Routes,
	Navigate,
	HashRouter
} from 'react-router-dom'
import { ThemeProvider, useTheme } from './context/theme-provider'
import { Menu } from './views/Menu'
import { Thesaurus } from './views/Thesaurus'
import 'animate.css'

const App: FC = () => {
	return (
		<div className='h-screen w-full bg-background '>
			<ThemeProvider
				defaultTheme='dark'
				storageKey='vite-ui-theme'
			>
				<HashRouter>
					<Routes>
						<Route
							path='/'
							element={<Menu />}
						/>
						<Route
							path='/thesaurus'
							element={<Thesaurus />}
						/>
					</Routes>
				</HashRouter>
			</ThemeProvider>
		</div>
	)
}

export default App
