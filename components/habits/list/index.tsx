'use client'

import dynamic from 'next/dynamic'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Preloader } from '@/components/habits/list/Preloader'
import { Spinner } from '@/components/ui/spinner'
import { Item } from '@/components/habits/list/Item'
import type { HabitProps } from '@/interfaces'

const NoItems = dynamic(
  () => import('@/components/habits/list/NoItems').then((mod) => mod.NoItems),
  {
    loading: () => <Spinner />,
  }
)

export const List = () => {
  const [habits, setHabits] = useState<HabitProps[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchHabits = useCallback(async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch('/api/habits')
      if (!response.ok) {
        throw new Error('Failed to fetch habits')
      }
      const data = await response.json()
      setHabits(data)
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

  const [activeTab, setActiveTab] = useState(uniqueTimeOfDay[0] || 'anytime')

  const renderedTabs = useMemo(() => {
    return uniqueTimeOfDay.map((timeOfDay) => (
      <TabsTrigger
        key={timeOfDay}
        value={timeOfDay}
        className={timeOfDay.length > 0 ? 'w-full' : ''}
      >
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
              <Item
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

  if (isLoading) return <Preloader />
  if (error) return <NoItems />
  if (habits.length === 0) return <NoItems />

  return (
    <section className="flex flex-col items-start min-h-screen">
      <div className="flex flex-col w-full max-w-96 text-center gap-6">
        <h2>Your current habits</h2>
        <Tabs
          defaultValue={uniqueTimeOfDay[0] || 'anytime'}
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList>{renderedTabs}</TabsList>
          {renderedHabits}
        </Tabs>
      </div>
    </section>
  )
}
