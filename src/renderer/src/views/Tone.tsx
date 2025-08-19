import 'animate.css'
import {
	TrendingUp,
	ChevronLeft,
	Briefcase,
	BriefcaseIcon,
	HeartHandshake,
	LucideHeartHandshake,
	Target,
	HandMetal,
	HandFist,
	HeartPlus,
	HeartOff,
	Settings,
	MessageSquareMore,
	BookA,
	BookType,
	KeyboardMusic,
	NotepadText,
	LucideUnlockKeyhole,
	Search,
	Loader,
  Handshake,
  PlusIcon
} from 'lucide-react'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '../components/ui/card'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator
} from '../components/ui/command'
import { Button } from '@renderer/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAnimateCss } from '@renderer/components/useAnimateCss'
import { BackBar } from '@renderer/components/BackBar'
import { useStore } from '@renderer/stores/useStore'
import { Spinner } from '@renderer/components/Spinner'
import { Skeletons } from '@renderer/components/Skeletons'
import { ThemeBtn } from '@renderer/components/ThemeBtn'

export const Tone = (): JSX.Element => {
	const navigate = useNavigate()
	const {
		searchTerm,
		fetchData,
		isLoading,
		data,
		setData,
		setIsLoading,
		setError
	} = useStore()

	const { ref, className, exit } = useAnimateCss({
		inClass: 'animate__fadeInRight',
		outClass: 'animate__fadeOutRight',
		durationMs: 750
	})

	// Search
	useEffect(() => {
		if (searchTerm) fetchData(searchTerm, 'thesaurus')
	}, [searchTerm])

	// Update Result
	useEffect(() => {
		const handleError = error => {
			console.error('Thesaurus error:', error)
			setIsLoading(false)
			setError(error)
		}

		const handleData = data => {
			console.log('Received thesaurus data:', data)
			setIsLoading(false)
			setData(data)
		}

		window.api.on('error:thesaurus', handleError)
		window.api.on('data:thesaurus', handleData)

		return () => {
			window.api.off('error:thesaurus', handleError)
			window.api.off('data:thesaurus', handleData)
		}
	}, [setData, setError, setIsLoading])

  const commonTones = [{
    icon: <BriefcaseIcon />,
    label: 'Professional / Polished'
  }, {
    icon: <Handshake />,
    label: 'Friendly / Approachable'
  }, {
    icon: <Target />,
    label: 'Clear / Concise'
  },
  {
    icon: <HandFist />,
    label: 'Persuasive / Impactful'
  },
  {
    icon: <HeartPlus />,
    label: 'Empathetic / Supportive'
  },
  {
    icon: <HeartOff />,
    label: 'Neutral / Non-Emotive'
  }
]

	return (
		<div
			ref={ref}
			className={`h-full bg-background flex flex-col`}
			// className={`${className} h-full bg-background flex flex-col`}
		>
			<BackBar onBack={() => navigate('/')} />
			<Command className='p-1'>
				<CommandList>
					<CommandGroup heading='Common Tones'>
            {commonTones.map((tone, index) => (
              <div key={index} onClick={() => {
                if (!searchTerm) return
                const searchType = `tone:${tone.label.split('/')[0]}`
                fetchData(searchTerm, searchType)
              }}>
                <CommandItem>
                  {tone.icon}
                  <span>{tone.label}</span>
                </CommandItem>
              </div>
            ))}
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading='Custom Tones'>
						<CommandItem>
							<PlusIcon />
							<span>Create Tone</span>
							{/* <CommandShortcut>⌘S</CommandShortcut> */}
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>

		</div>
	)
}

  // Card Version:
{/* <Card className='@container/card rounded-none border-0 bg-background shadow-none'>
  <CardHeader className='px-6 py-1'>
    <CardDescription>Tone & Phraseology</CardDescription>
    <CardTitle className='text-2xl font-semibold'>Common Tones</CardTitle>
  </CardHeader>
  <CardContent className='px-2 flex flex-col gap-2 mt-3 cursor-default'>
    <div className='flex items-center gap-2 rounded-sm bg-background px-4 py-1 text-sm font-normal outline-none hover:bg-muted'>
      <BriefcaseIcon className='text-sm' size="16" />
      <span>Polished / Professional</span>
    </div>
    <div className='flex items-center gap-2 rounded-sm bg-background px-4  text-sm font-normal outline-none hover:bg-muted'>
      <HeartHandshake className='text-sm' size="16" />
      <span>Friendly / Approachable</span>
    </div>
    <div className='flex items-center gap-2 rounded-sm bg-background px-4  text-sm font-normal outline-none hover:bg-muted'>
      <Target className='text-sm' size="16" />
      <span>Concise / Clear</span>
    </div>
    <div className='flex items-center gap-2 rounded-sm bg-background px-4  text-sm font-normal outline-none hover:bg-muted'>
      <HandFist className='text-sm' size="16" />
      <span>Persuasive / Impactful</span>
    </div>
    <div className='flex items-center gap-2 rounded-sm bg-background px-4  text-sm font-normal outline-none hover:bg-muted'>
      <HeartPlus className='text-sm' size="16" />
      <span>Empathetic / Supportive</span>
    </div>
    <div className='flex items-center gap-2 rounded-sm bg-background px-4  text-sm font-normal outline-none hover:bg-muted'>
      <HeartOff className='text-sm' size="16" />
      <span>Neutral / Non-Emotive</span>
    </div>
  </CardContent>
  <CardFooter className='flex-col items-start gap-1.5 text-sm'>
  </CardFooter>
</Card> */}
