import {
  Settings,
  MessageSquareMore,
  BookA,
  BookType,
  KeyboardMusic,
  NotepadText,
} from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../components/ui/command"
import { ThemeBtn } from "@renderer/components/ui/themeBtn"

Command

export function Menu() {
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
          <ThemeBtn />
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
