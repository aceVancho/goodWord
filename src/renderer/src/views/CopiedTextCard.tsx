import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger
} from '../components/ui/drawer'
import { Button } from '../components/ui/button'
import { TrendingUp, ChevronLeft, Clipboard } from 'lucide-react'
import { useStore } from '@renderer/stores/useStore'
import { ScrollArea } from '../components/ui/scroll-area'

export const CopiedTextCard = () => {
	const { searchTerm, setSearchTerm } = useStore()
  const navigate = useNavigate()
  const emptyClipboard = <div className='text-medium text-muted-foreground font-normal text-center pb-40'>🙈 The clipboard is empty</div  >
	return (
    <Card className="w-full flex flex-col justify-between items-center h-screen border-0">
      <CardHeader>
        <CardTitle>📋 Copied Text</CardTitle>
      </CardHeader>
      <CardContent className='ml-2 font-thin text-left whitespace-pre-wrap'>
        {searchTerm ? searchTerm : emptyClipboard}
      </CardContent>
      <CardFooter className="flex gap-4">
        <Button onClick={() => navigate(-1)} variant="outline" className="w-full">
          Back
        </Button>
        <Button onClick={() => setSearchTerm('')} variant="outline" className="bg-primary w-full">
          Clear Clipboard
        </Button>
      </CardFooter>
    </Card>
	)
}

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { useNavigate } from 'react-router-dom'

