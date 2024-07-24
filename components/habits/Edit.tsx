import { GiPencil } from 'react-icons/gi'
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

export const Edit = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">
          <GiPencil size={20} />
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
          <DialogClose asChild>
            <Button type="button" variant="destructive">
              Remove
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
