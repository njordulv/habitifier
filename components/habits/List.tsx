'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ListSkeleton } from '@/components/habits/ListSkeleton'
import { ListItem } from '@/components/habits/ListItem'
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
        .not('time_of_day', 'is', null)
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

  const uniqueTimeOfDay = useMemo(() => {
    const times = Array.from(new Set(habits.map((habit) => habit.time_of_day)))
    return ['anytime', ...times.filter((time) => time !== 'anytime')]
  }, [habits])

  const [activeTab, setActiveTab] = useState(uniqueTimeOfDay[0] || 'account')

  const renderedTabs = useMemo(() => {
    return uniqueTimeOfDay.map((timeOfDay) => (
      <TabsTrigger key={timeOfDay} value={timeOfDay}>
        {timeOfDay}
      </TabsTrigger>
    ))
  }, [uniqueTimeOfDay])

  const renderedHabits = useMemo(() => {
    return uniqueTimeOfDay.map((timeOfDay) => (
      <TabsContent key={timeOfDay} value={timeOfDay}>
        <ul className="flex flex-col gap-3">
          {habits
            .filter(
              (habit) =>
                timeOfDay === 'anytime' || habit.time_of_day === timeOfDay
            )
            .map((filteredHabit, index) => (
              <ListItem
                key={filteredHabit.id}
                {...filteredHabit}
                animationKey={`${filteredHabit.id}-${activeTab}`}
                index={index}
                onHabitUpdate={fetchHabits}
              />
            ))}
        </ul>
      </TabsContent>
    ))
  }, [habits, uniqueTimeOfDay, activeTab, fetchHabits])

  if (isLoading) return <ListSkeleton />
  if (error) return <p>Error: {error}</p>
  if (habits.length === 0) return <div>No habits found.</div>

  return (
    <div className="w-full max-w-[380px] justify-center items-center">
      <Tabs
        defaultValue={uniqueTimeOfDay[0] || 'account'}
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList>{renderedTabs}</TabsList>
        {renderedHabits}
      </Tabs>
    </div>
  )
}
