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

export const ToneMenu = (): JSX.Element => {
	const navigate = useNavigate()
	const { searchTerm, fetchData, label, isLoading, error, data } = useStore()

	const { ref, className, exit } = useAnimateCss({
		inClass: 'animate__fadeInRight',
		outClass: 'animate__fadeOutRight',
		durationMs: 750
	})

	const commonTones = [
		{
			icon: <BriefcaseIcon />,
			label: 'Professional / Polished'
		},
		{
			icon: <Handshake />,
			label: 'Friendly / Approachable'
		},
		{
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

	const mockData = [
		`Hey,

So I don’t even know why I’m writing this so long, but I sat down at the computer and figured, why not just type everything that pops into my head and let it spill out into a really long email. You probably didn’t ask for it and probably don’t even want to read something that’s going to feel like it’s dragging on forever, but hey, sometimes it’s fun to just ramble. So here we go, and honestly you can skim it, skip it, or just delete it if it feels like way too much. No offense taken either way, because I know nobody sits down and thinks, “Wow, I’d love to read a thousand-word casual email today.” Still, I’ve decided to do it anyway, just to see if I can fill the space and maybe make you laugh at how ridiculous it is.

The thing is, when you try to write something “not professional,” it ends up sounding more like a stream of consciousness than anything else. I’m not following an outline, I’m not editing for style, and I’m definitely not trying to make it polished. It’s like when you leave someone a super long voice note, and halfway through you’re not even sure if you remember the point you were making at the start. That’s kind of the vibe here: messy, unfiltered, just kind of rolling with whatever comes to mind. Maybe this whole thing turns into me talking about food for ten paragraphs, or maybe I’ll veer into movies, or the random little annoyances of everyday life, like when your phone cable is barely long enough to reach the bed and you feel like you’re playing Twister just to scroll TikTok before you fall asleep.

Speaking of which, let me rant about chargers for a second. I swear, every time I think I’ve solved the “too short cord” problem by buying some massive ten-foot charging cable, it either stops working after two months or the ends fray, or the cable gets caught under a chair wheel and chewed up. Then I go back to using the short little cord that came in the box and remember why I got annoyed in the first place. First world problems, I know, but I’m guessing you’ve probably fought with your own charger situation at some point too. I mean, isn’t it wild how we live in this advanced technological era but we’re still all ruled by the stupid length of a little cord?

Anyway, now that I’ve already spent way too many words on charging cables, let me switch gears. Food. Food is always worth talking about. The other night I made spaghetti, but it was one of those nights where I was too lazy to do it right, so I just boiled noodles and dumped a jar of sauce on top and called it dinner. Honestly, it tasted fine, but it had that very “college student making something quick at 11 PM” vibe. Contrast that with a night when I actually put effort into it — chopped onions, garlic, maybe some ground beef or sausage, threw in some spices, let it simmer — and it becomes a whole different level. But most of the time I end up doing the quick and lazy version because cooking feels like a big effort when I’m already tired from the day. I keep telling myself I’m going to meal prep and get organized, but then Sunday rolls around and instead of chopping veggies and cooking rice for the week, I end up watching YouTube videos for hours about stuff I don’t even care about.

Which reminds me — YouTube is such a time sink. I’ll open it up thinking I’ll just watch one quick thing, maybe a tutorial or a review of something, and then suddenly it’s two hours later and I’m watching videos about how to survive in the wilderness with just a pocketknife or someone explaining the history of a video game console I never even owned. The algorithm is like a black hole, pulling me deeper and deeper until I forget what I even wanted to watch in the first place. And yet, I keep going back to it. It’s like fast food for the brain — not very nutritious but strangely addictive.`,
		`Hey,

So I don’t even know why I’m writing this so long, but I sat down at the computer and figured, why not just type everything that pops into my head and let it spill out into a really long email. You probably didn’t ask for it and probably don’t even want to read something that’s going to feel like it’s dragging on forever, but hey, sometimes it’s fun to just ramble. So here we go, and honestly you can skim it, skip it, or just delete it if it feels like way too much. No offense taken either way, because I know nobody sits down and thinks, “Wow, I’d love to read a thousand-word casual email today.” Still, I’ve decided to do it anyway, just to see if I can fill the space and maybe make you laugh at how ridiculous it is.

The thing is, when you try to write something “not professional,” it ends up sounding more like a stream of consciousness than anything else. I’m not following an outline, I’m not editing for style, and I’m definitely not trying to make it polished. It’s like when you leave someone a super long voice note, and halfway through you’re not even sure if you remember the point you were making at the start. That’s kind of the vibe here: messy, unfiltered, just kind of rolling with whatever comes to mind. Maybe this whole thing turns into me talking about food for ten paragraphs, or maybe I’ll veer into movies, or the random little annoyances of everyday life, like when your phone cable is barely long enough to reach the bed and you feel like you’re playing Twister just to scroll TikTok before you fall asleep.

Speaking of which, let me rant about chargers for a second. I swear, every time I think I’ve solved the “too short cord” problem by buying some massive ten-foot charging cable, it either stops working after two months or the ends fray, or the cable gets caught under a chair wheel and chewed up. Then I go back to using the short little cord that came in the box and remember why I got annoyed in the first place. First world problems, I know, but I’m guessing you’ve probably fought with your own charger situation at some point too. I mean, isn’t it wild how we live in this advanced technological era but we’re still all ruled by the stupid length of a little cord?

Anyway, now that I’ve already spent way too many words on charging cables, let me switch gears. Food. Food is always worth talking about. The other night I made spaghetti, but it was one of those nights where I was too lazy to do it right, so I just boiled noodles and dumped a jar of sauce on top and called it dinner. Honestly, it tasted fine, but it had that very “college student making something quick at 11 PM” vibe. Contrast that with a night when I actually put effort into it — chopped onions, garlic, maybe some ground beef or sausage, threw in some spices, let it simmer — and it becomes a whole different level. But most of the time I end up doing the quick and lazy version because cooking feels like a big effort when I’m already tired from the day. I keep telling myself I’m going to meal prep and get organized, but then Sunday rolls around and instead of chopping veggies and cooking rice for the week, I end up watching YouTube videos for hours about stuff I don’t even care about.

Which reminds me — YouTube is such a time sink. I’ll open it up thinking I’ll just watch one quick thing, maybe a tutorial or a review of something, and then suddenly it’s two hours later and I’m watching videos about how to survive in the wilderness with just a pocketknife or someone explaining the history of a video game console I never even owned. The algorithm is like a black hole, pulling me deeper and deeper until I forget what I even wanted to watch in the first place. And yet, I keep going back to it. It’s like fast food for the brain — not very nutritious but strangely addictive.`,
		`Hey,

So I don’t even know why I’m writing this so long, but I sat down at the computer and figured, why not just type everything that pops into my head and let it spill out into a really long email. You probably didn’t ask for it and probably don’t even want to read something that’s going to feel like it’s dragging on forever, but hey, sometimes it’s fun to just ramble. So here we go, and honestly you can skim it, skip it, or just delete it if it feels like way too much. No offense taken either way, because I know nobody sits down and thinks, “Wow, I’d love to read a thousand-word casual email today.” Still, I’ve decided to do it anyway, just to see if I can fill the space and maybe make you laugh at how ridiculous it is.

The thing is, when you try to write something “not professional,” it ends up sounding more like a stream of consciousness than anything else. I’m not following an outline, I’m not editing for style, and I’m definitely not trying to make it polished. It’s like when you leave someone a super long voice note, and halfway through you’re not even sure if you remember the point you were making at the start. That’s kind of the vibe here: messy, unfiltered, just kind of rolling with whatever comes to mind. Maybe this whole thing turns into me talking about food for ten paragraphs, or maybe I’ll veer into movies, or the random little annoyances of everyday life, like when your phone cable is barely long enough to reach the bed and you feel like you’re playing Twister just to scroll TikTok before you fall asleep.

Speaking of which, let me rant about chargers for a second. I swear, every time I think I’ve solved the “too short cord” problem by buying some massive ten-foot charging cable, it either stops working after two months or the ends fray, or the cable gets caught under a chair wheel and chewed up. Then I go back to using the short little cord that came in the box and remember why I got annoyed in the first place. First world problems, I know, but I’m guessing you’ve probably fought with your own charger situation at some point too. I mean, isn’t it wild how we live in this advanced technological era but we’re still all ruled by the stupid length of a little cord?

Anyway, now that I’ve already spent way too many words on charging cables, let me switch gears. Food. Food is always worth talking about. The other night I made spaghetti, but it was one of those nights where I was too lazy to do it right, so I just boiled noodles and dumped a jar of sauce on top and called it dinner. Honestly, it tasted fine, but it had that very “college student making something quick at 11 PM” vibe. Contrast that with a night when I actually put effort into it — chopped onions, garlic, maybe some ground beef or sausage, threw in some spices, let it simmer — and it becomes a whole different level. But most of the time I end up doing the quick and lazy version because cooking feels like a big effort when I’m already tired from the day. I keep telling myself I’m going to meal prep and get organized, but then Sunday rolls around and instead of chopping veggies and cooking rice for the week, I end up watching YouTube videos for hours about stuff I don’t even care about.

Which reminds me — YouTube is such a time sink. I’ll open it up thinking I’ll just watch one quick thing, maybe a tutorial or a review of something, and then suddenly it’s two hours later and I’m watching videos about how to survive in the wilderness with just a pocketknife or someone explaining the history of a video game console I never even owned. The algorithm is like a black hole, pulling me deeper and deeper until I forget what I even wanted to watch in the first place. And yet, I keep going back to it. It’s like fast food for the brain — not very nutritious but strangely addictive.`
	]
	if (isLoading) return <Spinner />

	if (!isLoading && error) return <div className='text-red-500'>{error}</div>

	if (!isLoading && data)
		return (
			<div
				ref={ref}
				className={`${className} h-full bg-background`}
			>
				{/* <BackBar /> */}
				<Card className='@container/card rounded-none border-0 bg-background shadow-none'>
					<CardHeader className='px-6 py-1'>
						<CardDescription>Tone & Phraseology</CardDescription>
						<CardTitle className='text-2xl font-semibold'>{label}</CardTitle>
					</CardHeader>

					<CardFooter className='flex-col items-start gap-1.5 text-sm mt-4'>
						{/* {data.output.map((item, idx) => { */}
						{mockData.map((item, idx) => {
							// return <div className="font-thin" key={idx}>{item}</div>
							return (
								<div key={idx} className='flex flex-col mb-4'>
									<div className='font-semibold text-secondary-foreground'>
										Result {idx + 1}:
									</div>
                  {/* <span className='font-semibold text-secondary-foreground mr-1'>{idx + 1}:</span> */}
									<div className='font-sm p- text-muted-foreground leading-6 cursor-pointer mt-1'>{item}</div>
								</div>
							)
						})}
					</CardFooter>
				</Card>
			</div>
		)

	return (
		<div
			ref={ref}
			className={`flex h-full flex-col bg-background`}
			// className={`${className} h-full bg-background flex flex-col`}
		>
			{/* <BackBar /> */}
			<Command className='p-1'>
				<CommandList>
					<CommandGroup heading='Common Tones'>
						{commonTones.map((tone, index) => (
							<div
								key={index}
								onClick={() => {
									if (!searchTerm) return
									const searchType = `tone:${tone.label.split('/')[0].toLowerCase()}`
									fetchData(searchTerm, searchType)
								}}
							>
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
{
	/* <Card className='@container/card rounded-none border-0 bg-background shadow-none'>
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
</Card> */
}
