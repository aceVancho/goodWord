import { Button } from '@renderer/components/ui/button'
import { useStore } from '@renderer/stores/useStore'
import { TrendingUp, ChevronLeft, Clipboard, ClipboardX } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export const BackBar = (): JSX.Element => {
  const { reset, setSearchTerm } = useStore()
  const navigate = useNavigate()
  const location = useLocation()

  const onBack = () => {
    // reset() // TODO: this needs tested
    navigate('/')
  }

  useEffect(() => {
    if (location.pathname === '/') console.log('BackBar: onBack called from menu')
  }, [location])

  return (
    <div className='w-full bg-background sticky top-0 z-10 flex justify-between border-b pb-2'>
      <Button
        variant="ghost"
        size="icon"
        className="mt-3 ml-2 size-7"
        onClick={onBack}
      >
        <ChevronLeft className='h-4 w-4'/>
      </Button>
      {location.pathname !== '/copied-text' ? (
              <Button
        variant="ghost"
        size="icon"
        className="mt-3 mr-2 size-6"
        onClick={() => navigate('/copied-text')}
      >
        <Clipboard className='h-4 w-4'/>
      </Button>
      ) : (              <Button
        variant="destructive"
        size="icon"
        className="mt-3 mr-2 size-7"
        onClick={() => navigate('/copied-text')}
      >
        <ClipboardX onClick={() => setSearchTerm('')} className='h-4 w-4'/>
      </Button>)}
    </div>
  )
}
