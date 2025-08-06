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

export function CommandItem_ThemeBtn() {
  const { setTheme, theme } = useTheme()
  return (
        <div onClick={() => {
          setTheme(theme === "dark" ? "light" : "dark")
        }}>
        <CommandItem >
          {theme === "dark" ? <Sun /> : <Moon />}
          {theme === "dark" ? <span>Light Mode</span> : <span>Dark Mode</span>}
        </CommandItem>
      </div>
  )
}

export function CommandDemo() {
  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
    {/* <Command className="rounded-lg border shadow-md md:min-w-[450px]"> */}
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Language">
          <CommandItem>
            <BookA />
            <span>Dictionary</span>
          </CommandItem>
          <CommandItem>
            <BookType />
            <span>Thesaurus</span>
          </CommandItem>
          <CommandItem>
            <KeyboardMusic />
            <span>Rhyme</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Writing">
          <CommandItem>
           <MessageSquareMore />
            <span>Phraseology</span>
            {/* <CommandShortcut>⌘P</CommandShortcut> */}
          </CommandItem>
          <CommandItem>
            <NotepadText />
            <span>Tone Templates</span>
            {/* <CommandShortcut>⌘B</CommandShortcut> */}
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="App">
          <CommandItem>
            <Settings />
            <span>Settings</span>
            {/* <CommandShortcut>⌘S</CommandShortcut> */}
          </CommandItem>
          <CommandItem_ThemeBtn />
        </CommandGroup>
      </CommandList>
    </Command>
  )
}


const App: FC = () => {
  return (
    <div className="w-full h-screen">
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <CommandDemo />
      </ThemeProvider>
    </div>
  )
}

export default App
