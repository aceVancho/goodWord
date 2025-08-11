import {
	Settings,
	MessageSquareMore,
	BookA,
	BookType,
	KeyboardMusic,
	NotepadText,
	LucideUnlockKeyhole,
	Search
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
import { ThemeBtn } from '@renderer/components/ui/themeBtn'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export function Menu(): JSX.Element {
  const navigate = useNavigate()
	const [copiedText, setCopiedText] = useState<string>('')
	useEffect(() => {
		window.api?.onCopyText(text => {
			console.log('Menu.tsx => onCopyText:', text)
			setCopiedText(text)
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
            {truncateText(copiedText, 30)}
          </span>
        </CommandItem>
        <CommandList>
          {/* <CommandEmpty>No results found.</CommandEmpty> */}
          <CommandGroup heading='Language'>
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
          <CommandGroup heading='Writing'>
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
          <CommandGroup heading='App'>
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
