'use client'

import { createClient } from '@/utils/supabase/client'
import { useState, useEffect } from 'react'
import { Spinner } from '@/components/ui/spinner'

interface HabitProps {
  id: string
  user_id: string
  title: string
  description: string | null
  frequency: string
  start_date: string
  end_date: string | null
  is_active: boolean
}

export const List = () => {
  const supabase = createClient()
  const [habits, setHabits] = useState<HabitProps[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchHabits()
  }, [])

  async function fetchHabits() {
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
  }

  if (isLoading)
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    )
  if (error) return <p>Error: {error}</p>
  if (habits.length === 0) return <p>No habits found.</p>

  return (
    <div className="w-full max-w-[380px] justify-center items-center">
      <ul>
        {habits.map((habit: HabitProps, index: number) => (
          <li key={habit.id}>
            {index + 1}. {habit.title} - {habit.frequency}
            {habit.description && <p>{habit.description}</p>}
            <p>Start Date: {new Date(habit.start_date).toLocaleDateString()}</p>
            {habit.end_date && (
              <p>End Date: {new Date(habit.end_date).toLocaleDateString()}</p>
            )}
            <p>Status: {habit.is_active ? 'Active' : 'Inactive'}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
