'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { createClient } from '@/utils/supabase/client'
import { iconsLibrary } from '@/config/icons'
import { ListSkeleton } from '@/components/habits/ListSkeleton'
import { HabitProps } from '@/interfaces'

const supabase = createClient()

export const List = () => {
  const [habits, setHabits] = useState<HabitProps[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchHabits = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { data, error } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', user.id)
      if (error) throw error
      setHabits(data || [])
    } catch (error) {
      setError('Failed to fetch habits')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchHabits()
  }, [fetchHabits])

  const renderedHabits = useMemo(() => {
    return habits.map((habit: HabitProps) => {
      const IconComponent =
        iconsLibrary.habitIcons.find((i) => i.label === habit.icon)?.icon ||
        iconsLibrary.habitIcons[0].icon

      return (
        <li key={habit.id} className={habit.color}>
          <div className="border rounded-md p-6 flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <IconComponent size={24} className={`${habit.color}`} />
              <h3 className="text-lg font-semibold text-white">{habit.name}</h3>
            </div>

            {habit.description && (
              <div className="text-sm text-muted-foreground">
                {habit.description}
              </div>
            )}

            {habit.days && (
              <div className="flex flex-wrap gap-2">
                <span
                  className={`text-xs ${habit.color} bg-dark px-2 py-1 rounded-lg capitalize`}
                >
                  {habit.days}
                </span>
              </div>
            )}

            <div className="flex gap-2 justify-between">
              {habit.time_of_day && (
                <div className="text-xs text-white flex items-center gap-1">
                  <span>
                    {habit.time_of_day === 'everytime'
                      ? `Repeat ${habit.time_of_day}`
                      : `Repeat every ${habit.time_of_day}`}
                  </span>
                </div>
              )}
              {habit.daily_goal && (
                <div className="flex items-center gap-[2px] text-sm text-muted-foreground">
                  <span className={habit.color}>0</span>
                  <span className="color-dark">/</span>
                  <span className="color-dark">{habit.daily_goal}</span>
                  <span>&nbsp;{habit.goal_units}</span>
                </div>
              )}
            </div>
          </div>
        </li>
      )
    })
  }, [habits])

  if (isLoading) return <ListSkeleton />
  if (error) return <p>Error: {error}</p>
  if (habits.length === 0) return <div>No habits found.</div>

  return (
    <div className="w-full max-w-[380px] justify-center items-center">
      <ul className="flex flex-col gap-3">{renderedHabits}</ul>
    </div>
  )
}
