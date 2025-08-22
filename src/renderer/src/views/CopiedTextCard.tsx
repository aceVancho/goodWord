import { useStore } from '@renderer/stores/useStore'
import { BackBar } from '@renderer/components/BackBar'

export const CopiedTextCard = () => {
	const { searchTerm } = useStore()
	const emptyClipboard = (
		<div className='text-medium text-center font-normal text-muted-foreground'>
			🙈 The clipboard is empty
		</div>
	)
	return (
		<div className='flex flex-col bg-background'>
			<BackBar />
      <div className='text-secondary-foreground flex justify-center align-center p-4 whitespace-pre-wrap font-medium'>
        {searchTerm ? searchTerm : emptyClipboard}
      </div>

		</div>
	)
}
