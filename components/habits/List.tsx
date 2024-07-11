'use client'

import { supabase } from '@/lib/supabaseClient'
import { useState, useEffect } from 'react'

interface HabitsProps {
  id: number
  name: string
}

export const List = () => {
  const [habits, setHabits] = useState<HabitsProps[]>([])

  useEffect(() => {
    fetchHabits()
  }, [])

  async function fetchHabits() {
    const { data, error } = await supabase.from('habits').select('*')
    if (error) console.log('error', error)
    else setHabits(data)
  }

  return (
    <ul>
      {habits.map((habit: HabitsProps) => (
        <li key={habit.id}>{habit.name}</li>
      ))}
    </ul>
  )
}
