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

export const BackBar = ({ onBack }: { onBack: () => void }): JSX.Element => {
  return (
    <div className='w-full bg-background'>
      <Button
        variant="ghost"
        size="icon"
        className="m-1 size-8"
        onClick={onBack}
      >
        <ChevronLeft />
      </Button>
    </div>
  )
}

export const Thesaurus = (): JSX.Element => {
  const navigate  = useNavigate()
  const { ref, className, exit } = useAnimateCss({
    inClass: 'animate__fadeInRight',
    outClass: 'animate__fadeOutRight',
    durationMs: 750, // optional
  });

  return (
    <div ref={ref} className={`${className} h-full bg-background`}>
      <BackBar onBack={() => exit(() => navigate('/'))} />

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
