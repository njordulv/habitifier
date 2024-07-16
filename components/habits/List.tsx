'use client'

import { createClient } from '@/utils/supabase/client'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { ListSkeleton } from './ListSkeleton'
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
      console.error('Error fetching habits:', error)
      setError('Failed to fetch habits')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchHabits()
  }, [fetchHabits])

  const renderedHabits = useMemo(() => {
    return habits.map((habit: HabitProps) => (
      <li key={habit.id} className="border rounded-md p-6 flex flex-col gap-2">
        <h3 className="text-lg font-semibold">{habit.name}</h3>

        {habit.description && (
          <div className="text-sm text-muted-foreground">
            {habit.description}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {habit.days && (
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-lg capitalize">
              {habit.days}
            </span>
          )}
          {habit.time_of_day && (
            <span className="text-xs bg-secondary text-white px-2 py-1 rounded-full">
              Every {habit.time_of_day}
            </span>
          )}
        </div>

        {habit.daily_goal && (
          <div className="flex items-center">
            <span className="text-sm font-medium">Daily Goal:</span>
            <span className="text-sm text-primary px-2">
              {habit.daily_goal}
            </span>
          </div>
        )}
      </li>
    ))
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
