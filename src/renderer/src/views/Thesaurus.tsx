import 'animate.css'
import { TrendingUp, ChevronLeft } from 'lucide-react'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Button } from '@renderer/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAnimateCss } from '@renderer/components/useAnimateCss'
import { BackBar } from '@renderer/components/BackBar'
import { useStore } from '@renderer/stores/useStore'

export const Thesaurus = (): JSX.Element => {
  const navigate  = useNavigate()
  const { ref, className, exit } = useAnimateCss({
    inClass: 'animate__fadeInRight',
    outClass: 'animate__fadeOutRight',
    durationMs: 750, // optional
  });
  const { searchTerm } = useStore();
  useEffect(() => { // TODO: Put in fetchData
    window.api.invoke('search:thesaurus', searchTerm)
  }, [searchTerm])

  return (
    <div ref={ref} className={`${className} h-full bg-background`}>
      <BackBar onBack={() => navigate('/')} />
      {/* <BackBar onBack={() => exit(() => navigate('/'))} /> // Uncomment to use exit animation on back */}

      <Card className="@container/card border-0 rounded-none shadow-none bg-background">
        <CardHeader>
          <CardDescription>Total Revenue</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            $1,250.00
          </CardTitle>
        </CardHeader>

        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Trending up this month <TrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Visitors for the last 6 months
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
