import React, { useRef, useState } from 'react'
import { IoIosNotifications, IoIosPlay } from 'react-icons/io'
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

interface NotificationProps {
  message: string
  soundLabel: string
}

const sounds = siteConfig.notificationSounds

export const Notification = () => {
  const { color, sound, setSound } = useCreateHabitStore()
  const audioRef = useRef<HTMLAudioElement>(null)

  const playSound = (url: string) => {
    if (audioRef.current) {
      audioRef.current.src = url
      audioRef.current.play()
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary">
          <IoIosNotifications color={color} size={20} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[330px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Task Notification</AlertDialogTitle>
          <AlertDialogDescription>
            Choose a suitable sound
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col justify-between gap-2">
          {sounds.map((file) => (
            <div key={file.id} className="flex items-center gap-2 ">
              <Button
                className="w-full justify-start"
                variant="ghost"
                onClick={() => {
                  setSound(file.label)
                  playSound(file.url)
                }}
              >
                <IoIosPlay size={22} color="white" />
                <span>{file.label}</span>
              </Button>
            </div>
          ))}
        </div>
        <AlertDialogCancel onClick={() => setSound(sound)}>
          Save
        </AlertDialogCancel>
      </AlertDialogContent>
      <audio ref={audioRef} />
    </AlertDialog>
  )
}
