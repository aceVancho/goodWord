import 'animate.css'
import { Loader2Icon } from 'lucide-react'
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '../components/ui/card'
import { Button } from '@renderer/components/ui/button'
import { useEffect, useState } from 'react'
import { useAnimateCss } from '@renderer/components/useAnimateCss'
import { BackBar } from '@renderer/components/BackBar'
import { useStore } from '@renderer/stores/useStore'
import { Spinner } from '@renderer/components/Spinner'

export const Thesaurus = (): JSX.Element => {
	const { ref, className, exit } = useAnimateCss({
		inClass: 'animate__fadeInRight',
		outClass: 'animate__fadeOutRight',
		durationMs: 750
	})

	const { searchTerm, fetchData, data, error, isLoading, lastSearchTerm } =
		useStore()

  // TODO: Deep Search
	// const [isLoadMore, setIsLoadMore] = useState(false)

	// Search
	useEffect(() => {
		if (lastSearchTerm === searchTerm) return
		if (searchTerm) fetchData(searchTerm, 'search:thesaurus')
	}, [searchTerm])

  // TODO: Deep Search
	// useEffect(() => {
	// 	if (searchTerm && isLoadMore) fetchData(searchTerm, 'search:thesaurus:deep')
	// }, [isLoadMore])

	if (isLoading) return <Spinner />

	if (!isLoading && error) return <div className='text-red-500'>{error}</div>

	const TIERS = ['veryCommon', 'common', 'uncommon', 'rare', 'obscure']

	if (!isLoading && data)
		return (
			<div
				ref={ref}
				className={`${className} h-full bg-background`}
			>
				{/* <BackBar /> */}

				<Card className='@container/card rounded-none border-0 bg-background shadow-none'>
					<CardHeader className='px-6 py-1'>
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
									<div className='line-clamp-1 flex gap-2 pt-1 font-medium'>
										{name}
									</div>

									<div className='flex flex-wrap gap-x-1 text-muted-foreground'>
										{data[tier].map((synonym, idx) => (
											<span key={idx}>
												<span className='text-md cursor-pointer underline-offset-4 hover:underline active:font-semibold'>
													{synonym}
												</span>
												{idx < data[tier].length - 1 && ', '}
											</span>
										))}
									</div>
								</div>
							)
						})}
						{/* // TODO: Deep Search
            {data && !data?.isDeepSearch && (
							<Button
								disabled={isLoadMore}
								variant='outline'
								className='mt-2 w-full'
								onClick={() => setIsLoadMore(true)}
							>
								{isLoadMore ? (
									<>
										<Loader2Icon className='mr-2 animate-spin text-primary' />
										Loading More...
									</>
								) : (
									'Load More'
								)}
							</Button>
						)} */}
					</CardFooter>
				</Card>
			</div>
		)

	return <></>
}
