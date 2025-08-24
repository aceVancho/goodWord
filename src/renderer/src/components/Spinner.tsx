import { useNavigate } from 'react-router-dom'
import { BackBar } from '@renderer/components/BackBar'

export const Spinner = () => {
  return (
      <div className='h-full bg-background'>
      <BackBar />
      <div className='spinner bg-background'>
        <div className='double-bounce1'></div>
        <div className='double-bounce2'></div>
      </div>
    </div>
  )
}
