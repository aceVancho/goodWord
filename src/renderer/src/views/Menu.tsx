import {
  Settings,
  MessageSquareMore,
  BookA,
  BookType,
  KeyboardMusic,
  NotepadText,
  LucideUnlockKeyhole
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
import { useNavigate } from "react-router-dom"
import { useEffect } from "react";


declare global {
  interface Window {
    api: {
      onCopyText: (callback: (text: string) => void) => void;
    };
  }
}

export function Menu() {
    useEffect(() => {
    window.api?.onCopyText((text) => {
      console.log('Menu.tsx => onCopyText:', text);
      // Do something with the text, like set it in state
    });
  }, []);
  const navigate = useNavigate();
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
          <div onClick={() => navigate('/thesaurus')}>
            <CommandItem>
              <BookType />
              <span>Thesaurus</span>
            </CommandItem>
          </div>
          <CommandItem>
            <KeyboardMusic />
            <span>Rhyme</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Writing">
          <CommandItem>
           <MessageSquareMore />
            <span>Phraseology & Tone</span>
            {/* <CommandShortcut>⌘P</CommandShortcut> */}
          </CommandItem>
          <CommandItem>
            <LucideUnlockKeyhole />
            <span>Translate Meaning</span>
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
