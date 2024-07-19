import React from 'react'
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
import { iconsLibrary } from '@/config/icons'
import { useCreateHabitStore } from '@/store/useCreateHabitStore'

export const HabitIcons = () => {
  const { icon, setIcon, color } = useCreateHabitStore()
  const selectedIcon =
    iconsLibrary.habitIcons.find((i) => i.label === icon) ||
    iconsLibrary.habitIcons[0]

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary">
          {React.createElement(selectedIcon.icon, { size: 24, color: color })}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[330px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Task icon</AlertDialogTitle>
          <AlertDialogDescription>
            Choose a visual identifier for your habit
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-wrap justify-between gap-2">
          {iconsLibrary.habitIcons.map((iconItem) => (
            <AlertDialogAction
              key={iconItem.id}
              className="bg-secondary px-2"
              onClick={() => setIcon(iconItem.label)}
            >
              {React.createElement(iconItem.icon, { size: 24 })}
            </AlertDialogAction>
          ))}
        </div>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  )
}
