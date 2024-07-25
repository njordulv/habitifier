import React from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { iconsLibrary } from '@/config/icons'
import { useCreateHabitStore } from '@/store/useCreateHabitStore'

interface HabitColorProps {
  value?: string
  onChange?: (color: string) => void
}

export const HabitIcons = () => {
  const { icon, setIcon, color } = useCreateHabitStore()
  const selectedIcon =
    iconsLibrary.habitIcons.find((i) => i.label === icon) ||
    iconsLibrary.habitIcons[0]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full px-0">
          {React.createElement(selectedIcon.icon, { size: 24, color: color })}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[330px] max-w-[90%]">
        <DialogHeader>
          <DialogTitle>Task icon</DialogTitle>
          <DialogDescription>
            Choose a visual identifier for your habit
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-wrap justify-center gap-2">
          {iconsLibrary.habitIcons.map((iconItem) => (
            <DialogClose
              asChild
              className="flex items-center justify-center w-full max-w-[40px] px-0"
              key={iconItem.id}
            >
              <Button
                type="button"
                variant="secondary"
                onClick={() => setIcon(iconItem.label)}
              >
                {React.createElement(iconItem.icon, { size: 24 })}
              </Button>
            </DialogClose>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
