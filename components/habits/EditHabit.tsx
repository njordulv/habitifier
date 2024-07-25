import { useRef, useState } from 'react'
import { useMediaQuery } from '@uidotdev/usehooks'
import { LuClipboardEdit } from 'react-icons/lu'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Button } from '@/components/ui/button'
import { DeleteHabit } from '@/components/habits/DeleteHabit'

interface Props {
  habitId: number
  onHabitUpdate: () => void
}

export const EditHabit: React.FC<Props> = ({ habitId, onHabitUpdate }) => {
  const [open, setOpen] = useState(false)
  const dialogCloseRef = useRef<HTMLButtonElement>(null)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const handleSuccess = () => {
    onHabitUpdate()
    dialogCloseRef.current?.click()
  }

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="link">
            <LuClipboardEdit size={20} />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[380px] w-full">
          <DialogHeader>
            <DialogTitle>Task Edit</DialogTitle>
            <DialogDescription>
              You can make changes or delete the task
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DeleteHabit habitId={habitId} onSuccess={handleSuccess} />
            <DialogClose ref={dialogCloseRef} asChild>
              <Button variant="ghost">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="link">
          <LuClipboardEdit size={20} />
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
          <DrawerFooter>
            <DeleteHabit habitId={habitId} onSuccess={handleSuccess} />
            <DrawerClose asChild>
              <Button variant="ghost">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
