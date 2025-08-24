import {
	Settings,
	MessageSquareMore,
	BookA,
	BookType,
	KeyboardMusic,
	NotepadText,
	LucideUnlockKeyhole,
	Search,
  Loader
} from 'lucide-react'

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator
} from '../components/ui/command'
import { ThemeBtn } from '../components/ThemeBtn'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useStore } from '@renderer/stores/useStore'
import { BackBar } from '@renderer/components/BackBar'

export function Menu(): JSX.Element {
  const navigate = useNavigate()
  const { setSearchTerm } = useStore()
	useEffect(() => {
		window.api?.onCopyText(text => {
			console.log('Menu.tsx => onCopyText:', text)
      setSearchTerm(text);
		})
	}, [])
	useEffect(() => {
		window.api?.onClipboardChanged(text => {
			console.log('Menu.tsx => onClipboardChanged:', text)
      setSearchTerm(text);
		})
	}, [])

	return (
      <div className='w-full h-screen flex flex-col items-center justify-center'>
        {/* <BackBar /> */}
        <Command className=''>
          <CommandList>
            <CommandGroup heading='Language'>
              <CommandItem>
                <BookA />
                <span>Dictionary</span>
              </CommandItem>
              <div onClick={() => {
                navigate('/thesaurus')
              }}>
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
            <CommandGroup heading='Writing'>
              <div onClick={(() => navigate('/tone-menu'))}>
                <CommandItem>
                  <MessageSquareMore />
                  <span>Phraseology & Tone</span>
                  {/* <CommandShortcut>⌘P</CommandShortcut> */}
                </CommandItem>
              </div>
              <CommandItem>
                <LucideUnlockKeyhole />
                <span>Translate Meaning</span>
                {/* <CommandShortcut>⌘B</CommandShortcut> */}
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading='App'>
              <CommandItem>
                <Settings />
                <span>Settings</span>
                {/* <CommandShortcut>⌘S</CommandShortcut> */}
              </CommandItem>
              <ThemeBtn />
              <div onClick={() => {
                navigate('/loading')
              }}>
                <CommandItem >
                {/* <CommandItem disabled> */}
                  <Loader />
                  <span>Loading Test</span>
                  {/* <CommandShortcut>⌘S</CommandShortcut> */}
                </CommandItem>
              </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </div>
	)
}
