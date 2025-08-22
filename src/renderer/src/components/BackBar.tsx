import { Button } from '@renderer/components/ui/button'
import { useStore } from '@renderer/stores/useStore'
import { TrendingUp, ChevronLeft, Clipboard } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const BackBar = (): JSX.Element => {
  const { reset } = useStore()
  const navigate = useNavigate()

  const onBack = () => {
    reset()
    navigate('/')
  }

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
        onClick={() => navigate('/copied-text')}
      >
        <Clipboard className='h-4 w-4'/>
      </Button>
    </div>
  )
}
