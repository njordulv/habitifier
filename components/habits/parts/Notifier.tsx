'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useReminder } from '@/hooks/useReminder'
import { iconsLibrary } from '@/config/icons'
import type { HabitProps } from '@/interfaces'
import { Spinner } from '@/components/ui/spinner'
import { useSession } from '@/hooks/useSession'
import { formatTimeForDisplay } from '@/components/ui/time-picker-utils'

export const Notifier: React.FC = () => {
  const session = useSession()
  const [habits, setHabits] = useState<HabitProps[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { showReminder } = useReminder()
  const lastShownMessages = useRef<{ [key: string]: number }>({})
  const refreshHabits = 60000
  const checkHabits = 10000

  const fetchHabits = useCallback(async () => {
    try {
      if (!session) return

      setIsLoading(true)
      const response = await fetch('/api/habits')

      if (!response.ok) {
        if (response.status === 401) {
          return
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setHabits(data)
    } catch (error) {
      console.error('Error fetching habits:', error)
    } finally {
      setIsLoading(false)
    }
  }, [session])

  useEffect(() => {
    if (!session) {
      setIsLoading(false)
      return
    }

    fetchHabits()
    const interval = setInterval(fetchHabits, refreshHabits)
    return () => clearInterval(interval)
  }, [session, fetchHabits])

  useEffect(() => {
    if (!session) return

    const checkCurrentHabits = () => {
      const now = new Date()
      const currentTime = now.getHours() * 60 + now.getMinutes()
      const currentDay = now
        .toLocaleDateString('en-US', { weekday: 'long' })
        .toLowerCase()

      habits.forEach((habit) => {
        if (!habit.reminder?.length || !habit.days.includes(currentDay)) return

        habit.reminder.forEach((reminderTime) => {
          const [hours, minutes] = reminderTime.split(':').map(Number)
          const reminderMinutes = hours * 60 + minutes

          if (Math.abs(currentTime - reminderMinutes) <= 5) {
            const messageKey = `${habit.id}-${reminderTime}`
            const currentTimestamp = Date.now()

            if (
              currentTimestamp - (lastShownMessages.current[messageKey] || 0) >
              5 * 60 * 1000
            ) {
              const IconComponent =
                iconsLibrary.habitIcons.find((i) => i.label === habit.icon)
                  ?.icon || iconsLibrary.habitIcons[0].icon
              const messageContent = (
                <div key={messageKey} className="flex items-center gap-3">
                  <IconComponent size={24} className={`${habit.color}`} />
                  <div className="flex flex-col gap-1">
                    <span>{`It's time to ${habit.name}`}</span>
                    <span className="text-xs text-muted-foreground">
                      {habit.description}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Reminder at{' '}
                      <span className={`${habit.color}`}>
                        {formatTimeForDisplay(reminderTime)}
                      </span>
                    </span>
                  </div>
                </div>
              )

              showReminder(messageContent)
              lastShownMessages.current[messageKey] = currentTimestamp
            }
          }
        })
      })
    }

    checkCurrentHabits()
    const interval = setInterval(checkCurrentHabits, checkHabits)

    return () => clearInterval(interval)
  }, [habits, showReminder, session])

  if (!session) return null
  if (isLoading) return <Spinner size={18} />

  return null
}
