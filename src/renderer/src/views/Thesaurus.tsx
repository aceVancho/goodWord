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

export const Thesaurus = (): JSX.Element => {
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

	if (isLoading) return (
      <Spinner />
  )

	const TIERS = ['veryCommon', 'common', 'uncommon', 'rare', 'archaic']

  if (!isLoading && data) return (
		<div
			ref={ref}
			className={`${className} h-full bg-background`}
		>
			<BackBar onBack={() => navigate('/')} />
			{/* <BackBar onBack={() => exit(() => navigate('/'))} /> // Uncomment to use exit animation on back */}

			<Card className='@container/card rounded-none border-0 bg-background shadow-none'>
				<CardHeader className='py-3 px-6'>
					<CardDescription>Synonyms</CardDescription>
					<CardTitle className='@[250px]/card:text-3xl text-2xl font-semibold tabular-nums'>
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

							<div className='text-muted-foreground'>
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
