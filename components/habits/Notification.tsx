import { useRef, useState, useEffect } from 'react'
import { IoIosNotifications, IoIosPlay } from 'react-icons/io'

import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { siteConfig } from '@/config/site'
import { useCreateHabitStore } from '@/store/useCreateHabitStore'

const sounds = siteConfig.notificationSounds

export const Notification = () => {
  const { color, sound, setSound } = useCreateHabitStore()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [activeSoundId, setActiveSoundId] = useState<number | null>(
    sounds.length > 0 ? sounds[0].id : null
  )
  const initialSoundId = sounds.length > 0 ? sounds[0].id : null

  useEffect(() => {
    if (sounds.length > 0) {
      setSound(sounds[0].label)
    }
  }, [setSound])

  const playSound = (url: string) => {
    if (audioRef.current) {
      audioRef.current.src = url
      audioRef.current.play()
    }
  }

  const saveSound = () => {
    setSound(sound)
    setActiveSoundId(initialSoundId)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="secondary" className="sm:w-20 w-12 px-0">
          <IoIosNotifications color={color} size={22} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[330px] max-w-[290px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Task Notification</AlertDialogTitle>
          <AlertDialogDescription>
            Choose a suitable sound
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex flex-col justify-between gap-2">
          {sounds.map((file) => (
            <div key={file.id} className="flex items-center gap-2">
              <Button
                className="w-full justify-start"
                variant="ghost"
                active={activeSoundId === file.id}
                onClick={() => {
                  setSound(file.label)
                  setActiveSoundId(file.id)
                }}
              >
                <IoIosPlay
                  size={22}
                  className="text-primary-light"
                  onClick={() => {
                    playSound(file.url)
                  }}
                />
                <span>{file.label}</span>
              </Button>
            </div>
          ))}
        </div>
        <AlertDialogCancel onClick={saveSound}>Save</AlertDialogCancel>
      </AlertDialogContent>
      <audio ref={audioRef} />
    </AlertDialog>
  )
}
