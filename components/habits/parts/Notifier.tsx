'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useReminder } from '@/hooks/useReminder'
import { iconsLibrary } from '@/config/icons'
import { HabitProps } from '@/interfaces'
import { formatTimeForDisplay } from '@/components/ui/time-picker-utils'
import { createClient } from '@/utils/supabase/client'

export const Notifier: React.FC = () => {
  const [habits, setHabits] = useState<HabitProps[]>([])
  const [isLoading, setIsLoading] = useState<boolean | null>(null)
  const { showReminder } = useReminder()
  const lastShownMessages = useRef<{ [key: string]: number }>({})
  const refreshHabits = 60000
  const checkHabits = 10000
  const supabase = useMemo(() => createClient(), [])

  const fetchHabits = useCallback(async () => {
    try {
      setIsLoading(true)
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (!session) throw new Error('No session found')

      const response = await fetch('/api/habits', {
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      })

      if (!response.ok) throw new Error('Failed to fetch habits')

      const data = await response.json()
      setHabits(data)
    } catch (error) {
      console.error('Failed to fetch habits: ', error)
    } finally {
      setIsLoading(false)
    }
  }, [supabase])

  useEffect(() => {
    fetchHabits()
    const interval = setInterval(fetchHabits, refreshHabits)
    return () => clearInterval(interval)
  }, [fetchHabits])

  useEffect(() => {
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
                <div className="flex items-center gap-3">
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
  }, [habits, showReminder])

  if (isLoading === null) return null

  return null
}
