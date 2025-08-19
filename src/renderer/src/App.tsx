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
import { Skeletons } from './components/Skeletons'
import { Tone } from './views/Tone'

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
						<Route
							path='/tone'
							element={<Tone />}
						/>
						<Route
							path='/loading'
							element={<Skeletons />}
						/>
					</Routes>
				</HashRouter>
			</ThemeProvider>
		</div>
	)
}

export default App

// /System/Library/Frameworks/CoreServices.framework/Frameworks/LaunchServices.framework/Support/lsregister \                                                                ─╯
//   -u "/Users/aevancho/Code/personal/goodword/node_modules/electron/dist/Electron.app"
