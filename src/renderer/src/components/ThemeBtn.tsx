import { Moon, Sun } from 'lucide-react'

import { CommandItem } from '../components/ui/command'
import { useTheme } from '../context/theme-provider'

export function ThemeBtn(): JSX.Element {
	const { setTheme, theme } = useTheme()
	return (
		<div
			onClick={() => {
				setTheme(theme === 'dark' ? 'light' : 'dark')
			}}
		>
			<CommandItem>
				{theme === 'dark' ? <Sun /> : <Moon />}
				{theme === 'dark' ? <span>Light Mode</span> : <span>Dark Mode</span>}
			</CommandItem>
		</div>
	)
}
