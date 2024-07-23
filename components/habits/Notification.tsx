import { useRef, useState, useEffect } from 'react'
import { IoIosNotifications, IoIosPlay } from 'react-icons/io'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { siteConfig } from '@/config/site'
import { useCreateHabitStore } from '@/store/useCreateHabitStore'

const sounds = siteConfig.notificationSounds

export function Notification() {
  const { color, sound, setSound } = useCreateHabitStore()
  const audioRef = useRef<HTMLAudioElement>(null)
  const [activeSoundId, setActiveSoundId] = useState<number | null>(
    sounds.find((s) => s.label === sound)?.id ||
      (sounds.length > 0 ? sounds[0].id : null)
  )

  useEffect(() => {
    setActiveSoundId(sounds.find((s) => s.label === sound)?.id || null)
  }, [sound])

  const playSound = (url: string) => {
    if (audioRef.current) {
      audioRef.current.src = url
      audioRef.current.play()
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full px-0">
          <IoIosNotifications color={color} size={22} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[330px] max-w-[90%]">
        <DialogHeader>
          <DialogTitle>Task Notification</DialogTitle>
          <DialogDescription>Choose a suitable sound</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {sounds.map((file) => (
            <div key={file.id} className="flex items-center gap-2">
              <Button
                className={`w-full justify-start ${
                  activeSoundId === file.id ? 'active' : ''
                }`}
                variant="ghost"
                active={activeSoundId === file.id}
                onClick={(e) => {
                  e.stopPropagation()
                  playSound(file.url)
                  setSound(file.label)
                  setActiveSoundId(file.id)
                }}
                icon={<IoIosPlay size={22} color="white" />}
              >
                <span>{file.label}</span>
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
      <audio ref={audioRef} />
    </Dialog>
  )
}
