import { useRef } from 'react'
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
import { Button } from '@/components/ui/button'
import { DeleteHabit } from '@/components/habits/DeleteHabit'

interface Props {
  habitId: number
  onHabitUpdate: () => void
}

export const EditHabit: React.FC<Props> = ({ habitId, onHabitUpdate }) => {
  const dialogCloseRef = useRef<HTMLButtonElement>(null)

  const handleSuccess = () => {
    onHabitUpdate()
    dialogCloseRef.current?.click()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">
          <LuClipboardEdit size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[380px] max-w-[90%]">
        <DialogHeader>
          <DialogTitle>Task Edit</DialogTitle>
          <DialogDescription>
            You can make changes or delete the task
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DeleteHabit habitId={habitId} onSuccess={handleSuccess} />
          <DialogClose ref={dialogCloseRef} asChild>
            <Button variant="ghost">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
