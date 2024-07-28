import { useRef } from 'react'
import { GoTrash } from 'react-icons/go'
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
import { RemoveHabit } from '@/components/habits/crud/RemoveHabit'

interface Props {
  habitId: number
  onHabitUpdate: () => void
}

export const RemoveDialog: React.FC<Props> = ({ habitId, onHabitUpdate }) => {
  const dialogCloseRef = useRef<HTMLButtonElement>(null)

  const handleSuccess = () => {
    onHabitUpdate()
    dialogCloseRef.current?.click()
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">
          <GoTrash size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[380px] max-w-72 w-full">
        <DialogHeader>
          <DialogTitle>Delete Habit</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this task?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <RemoveHabit habitId={habitId} onSuccess={handleSuccess} />
          <DialogClose ref={dialogCloseRef} asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
