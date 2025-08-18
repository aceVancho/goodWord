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

export function Menu(): JSX.Element {
  const navigate = useNavigate()
  const { searchTerm, setSearchTerm } = useStore()
	useEffect(() => {
		window.api?.onCopyText(text => {
			console.log('Menu.tsx => onCopyText:', text)
      setSearchTerm(text);
		})
	}, [])
	const truncateText = (text: string, maxChars: number): string => {
		if (text.length <= maxChars) return text
		return text.slice(0, maxChars) + '…'
	}
	return (
      <Command className='rounded-lg border shadow-md'>
        {/* <Command className="rounded-lg border shadow-md md:min-w-[450px]"> */}
        {/* <CommandInput placeholder={`${copiedText}`} /> */}
        <CommandItem className='ml-1'>
          <Search />
          <span className='ml-1 text-sm text-muted-foreground'>
            {searchTerm && truncateText(searchTerm, 30)}
          </span>
        </CommandItem>
        <CommandList>
          {/* <CommandEmpty>No results found.</CommandEmpty> */}
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
            <div onClick={(() => navigate('/tone'))}>
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
              <CommandItem disabled>
                <Loader />
                <span>Loading Test</span>
                {/* <CommandShortcut>⌘S</CommandShortcut> */}
              </CommandItem>
            </div>
          </CommandGroup>
        </CommandList>
      </Command>
	)
}
