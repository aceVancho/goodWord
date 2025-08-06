import { FC } from 'react'

import {
  Settings,
  MessageSquareMore,
  BookA,
  BookType,
  KeyboardMusic,
  NotepadText,
  Moon,
  Sun
} from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "./components/ui/command"
import { ThemeProvider, useTheme } from './context/theme-provider'
import { Menu } from './views/Menu'

const App: FC = () => {
  return (
    <div className="w-full h-screen">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Menu />
      </ThemeProvider>
    </div>
  )
}

export default App
