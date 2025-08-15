import { Button } from '@renderer/components/ui/button'
import { TrendingUp, ChevronLeft } from 'lucide-react'

export const BackBar = ({ onBack }: { onBack: () => void }): JSX.Element => {
  return (
    <div className='w-full bg-background sticky top-0 z-10'>
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
