import { Button } from '@renderer/components/ui/button'
import { TrendingUp, ChevronLeft } from 'lucide-react'

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
