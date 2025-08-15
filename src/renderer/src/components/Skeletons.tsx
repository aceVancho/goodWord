import { useNavigate } from 'react-router-dom'
import { BackBar } from '@renderer/components/BackBar'
import { Skeleton } from './ui/skeleton'

export const Skeletons = () => {
const navigate = useNavigate()
  return (
      <div className='h-full bg-background '>
        <BackBar onBack={() => navigate('/')} />
        <div className="flex flex-col items-center w-full justify-center mt-6">
          <div className='flex space-x-4 items-center'>
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
          <div className='flex space-x-4 items-center mt-6'>
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
          <div className='flex space-x-4 items-center mt-6'>
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
          <div className='flex space-x-4 items-center mt-6'>
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
          <div className='flex space-x-4 items-center mt-6'>
            <Skeleton className="h-8 w-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        </div>
      </div>
  )
}
