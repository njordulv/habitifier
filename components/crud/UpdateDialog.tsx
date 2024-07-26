import { useState, useRef } from 'react'
import { useMediaQuery } from '@uidotdev/usehooks'
import { GoPencil } from 'react-icons/go'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { UpdateHabit } from '@/components/crud/UpdateHabit'

interface Props {
  habitId: number
  onHabitUpdate: () => void
}

export const UpdateDialog: React.FC<Props> = ({ habitId, onHabitUpdate }) => {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const dialogCloseRef = useRef<HTMLButtonElement>(null)

  const handleSuccess = () => {
    onHabitUpdate()
    dialogCloseRef.current?.click()
  }

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link">
            <GoPencil size={20} />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[380px] w-full">
          <DialogHeader>
            <DialogTitle>Edit your habit</DialogTitle>
            <DialogDescription>
              You can make changes to this task
            </DialogDescription>
          </DialogHeader>
          <UpdateHabit habitId={habitId} onSuccess={handleSuccess} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="link">
          <GoPencil size={20} />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="max-w-[380px] w-full mx-auto">
          <DrawerHeader className="text-left">
            <DrawerTitle>Task Edit</DrawerTitle>
            <DrawerDescription>
              You can make changes or delete the task
            </DrawerDescription>
          </DrawerHeader>
          <UpdateHabit habitId={habitId} onSuccess={handleSuccess} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
