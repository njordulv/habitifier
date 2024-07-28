import { GoDotFill } from 'react-icons/go'
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
import { siteConfig } from '@/config/site'
import { useCreateHabitStore } from '@/store/useCreateHabitStore'

const colors = siteConfig.colors

export const HabitColor = () => {
  const { color, setColor } = useCreateHabitStore()
  const selectedColor = colors.find((c) => c.label === color) || colors[0]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full px-0">
          <GoDotFill color={selectedColor.label} size={34} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[330px] max-w-[90%]">
        <DialogHeader>
          <DialogTitle>Task color</DialogTitle>
          <DialogDescription>
            Choose a suitable color for your habit
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <div className="flex flex-wrap justify-center gap-2">
            {colors.map((colorOption) => (
              <DialogClose
                asChild
                className="flex items-center justify-center w-full max-w-[40px] px-0"
                key={colorOption.id}
              >
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => setColor(colorOption.label)}
                >
                  <GoDotFill color={colorOption.label} size={34} />
                </Button>
              </DialogClose>
            ))}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
