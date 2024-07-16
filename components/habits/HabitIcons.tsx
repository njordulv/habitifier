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
import { HabitIconProps } from '@/interfaces'

export const HabitIcons: React.FC<HabitIconProps> = ({ icon, setIcon }) => {
  const selectedIcon =
    iconsLibrary.habitIcons.find((i) => i.label === icon) ||
    iconsLibrary.habitIcons[0]

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary">
          {React.createElement(selectedIcon.icon, { size: 24 })}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[380px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Choose icon for your task</AlertDialogTitle>
          <AlertDialogDescription>
            Select an icon that best represents your habit or task.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-wrap justify-between gap-2">
          {iconsLibrary.habitIcons.map((iconItem) => (
            <AlertDialogAction
              key={iconItem.id}
              className="bg-secondary"
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
