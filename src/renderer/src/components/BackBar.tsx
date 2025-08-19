import { Button } from '@renderer/components/ui/button'
import { TrendingUp, ChevronLeft, Clipboard } from 'lucide-react'

export const BackBar = ({ onBack }: { onBack: () => void }): JSX.Element => {
  return (
    <div className='w-full bg-background sticky top-0 z-10 flex justify-between'>
      <Button
        variant="ghost"
        size="icon"
        className="mt-3 ml-2 size-6"
        onClick={onBack}
      >
        <ChevronLeft className='h-4 w-4'/>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="mt-3 mr-2 size-6"
        onClick={onBack}
      >
        <Clipboard className='h-4 w-4'/>
      </Button>
    </div>
  )
}
