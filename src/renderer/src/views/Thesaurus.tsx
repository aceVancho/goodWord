import 'animate.css'
import { TrendingUp, ChevronLeft } from 'lucide-react'
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '../components/ui/card'
import { Button } from '@renderer/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAnimateCss } from '@renderer/components/useAnimateCss'
import { BackBar } from '@renderer/components/BackBar'
import { useStore } from '@renderer/stores/useStore'
import { Spinner } from '@renderer/components/Spinner'
import { Skeletons } from '@renderer/components/Skeletons'

export const Thesaurus = (): JSX.Element => {
	const {
		searchTerm,
		fetchData,
    data,
    error,
    isLoading,
    lastSearchTerm
	} = useStore()

	const { ref, className, exit } = useAnimateCss({
		inClass: 'animate__fadeInRight',
		outClass: 'animate__fadeOutRight',
		durationMs: 750
	})

	// Search
	useEffect(() => {
    if (lastSearchTerm === searchTerm) return;
    if (searchTerm) fetchData(searchTerm, 'search:thesaurus')
	}, [searchTerm])

	if (isLoading) return (
      <Spinner />
  )

  if (!isLoading && error) return (
    <div className="text-red-500">{error}</div>
  )

	const TIERS = ['veryCommon', 'common', 'uncommon', 'rare', 'obscure']

  if (!isLoading && data) return (
		<div
			ref={ref}
			className={`${className} h-full bg-background`}
		>
			<BackBar />

			<Card className='@container/card rounded-none border-0 bg-background shadow-none'>
				<CardHeader className='py-1 px-6'>
					<CardDescription>Synonyms</CardDescription>
					<CardTitle className='text-2xl font-semibold'>
						{searchTerm}
					</CardTitle>
				</CardHeader>

				<CardFooter className='flex-col items-start gap-1.5 text-sm'>
					{TIERS.map((tier, idx) => {
            let name = tier
            if (tier === 'veryCommon') {
              name = 'very common'
            }
            return (
						<div key={idx}>
							<div
								className='line-clamp-1 pt-1 flex gap-2 font-medium'
							>
								{name}
							</div>

							<div className='flex flex-wrap gap-x-1 text-muted-foreground'>
								{data[tier].map((synonym, idx) => (
                  <span key={idx}>
                    <span className="cursor-pointer active:font-semibold text-md hover:underline underline-offset-4">
                      {synonym}
                    </span>
                    {idx < data[tier].length - 1 && ', '}
                  </span>
								))}
							</div>
						</div>
            )
          })}
				</CardFooter>
			</Card>
		</div>
	)

  return <></>
}
