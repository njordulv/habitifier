import { GiPlainCircle } from 'react-icons/gi'
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { useCreateHabitStore } from '@/store/useCreateHabitStore'

const colors = siteConfig.colors

export const HabitColor = () => {
  const { color, setColor } = useCreateHabitStore()
  const selectedColor = colors.find((c) => c.label === color) || colors[0]

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary">
          <GiPlainCircle color={selectedColor.label} size={20} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[330px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Task color</AlertDialogTitle>
          <AlertDialogDescription>
            Choose a suitable color for your habit
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-wrap justify-between gap-2">
          {colors.map((colorOption) => (
            <AlertDialogAction
              key={colorOption.id}
              className="bg-secondary hover:bg-secondary/50 w-full max-w-[40px] px-0"
              onClick={() => setColor(colorOption.label)}
            >
              <GiPlainCircle color={colorOption.label} size={20} />
            </AlertDialogAction>
          ))}
        </div>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  )
}
