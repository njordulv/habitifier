import { GiPlainCircle } from 'react-icons/gi'
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
        <Button variant="secondary" className="sm:w-20 w-12 px-0">
          <GiPlainCircle color={selectedColor.label} size={20} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[330px] max-w-[290px]">
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
                  <GiPlainCircle color={colorOption.label} size={20} />
                </Button>
              </DialogClose>
            ))}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
