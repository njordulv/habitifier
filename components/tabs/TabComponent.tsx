'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { motion, Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import { createClient } from '@/utils/supabase/client'
import { HabitProps } from '@/interfaces'
import { ListSkeleton } from '@/components/habits/ListSkeleton'
import { generateTabs, filterHabitsByTimeOfDay } from './tabs'
import '@/components/tabs/styles.css'

interface Tab {
  id: string
  title: string
  icon?: React.ReactNode
  color: string
  content: React.ComponentType<{
    id: string
    active: boolean
    habits: HabitProps[]
  }>
}

interface TabComponentProps {
  tabs: Tab[]
  defaultIndex?: number
}

const tabVariant: Variants = {
  active: {
    width: '55%',
    transition: {
      type: 'tween',
      duration: 0.4,
    },
  },
  inactive: {
    width: '15%',
    transition: {
      type: 'tween',
      duration: 0.4,
    },
  },
}

const tabTextVariant: Variants = {
  active: {
    opacity: 1,
    x: 0,
    display: 'block',
    transition: {
      type: 'tween',
      duration: 0.3,
      delay: 0.3,
    },
  },
  inactive: {
    opacity: 0,
    x: -30,
    transition: {
      type: 'tween',
      duration: 0.3,
      delay: 0.1,
    },
    transitionEnd: { display: 'none' },
  },
}

const supabase = createClient()

const TabComponent: React.FC = () => {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(0)
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

  const uniqueTimeOfDay = useMemo(() => {
    const times = Array.from(new Set(habits.map((habit) => habit.time_of_day)))
    return ['anytime', ...times.filter((time) => time !== 'anytime')]
  }, [habits])

  const tabs = useMemo(() => generateTabs(uniqueTimeOfDay), [uniqueTimeOfDay])

  useEffect(() => {
    document.documentElement.style.setProperty(
      '--active-color',
      tabs[activeTabIndex]?.color || '#9ca3af'
    )
  }, [activeTabIndex, tabs])

  if (isLoading) return <ListSkeleton />
  if (error) return <p>Error: {error}</p>
  if (habits.length === 0) return <div>No habits found.</div>

  return (
    <div className="w-full max-w-[380px] justify-center items-center">
      <div className="tabs-component">
        <ul className="tab-links" role="tablist">
          {tabs.map((tab, index) => (
            <motion.li
              key={tab.id}
              className={cn('tab', { active: activeTabIndex === index })}
              role="presentation"
              variants={tabVariant}
              animate={activeTabIndex === index ? 'active' : 'inactive'}
            >
              <a href={`#${tab.id}`} onClick={() => setActiveTabIndex(index)}>
                <motion.span variants={tabTextVariant}>{tab.title}</motion.span>
              </a>
            </motion.li>
          ))}
        </ul>
        {tabs.map((tab, index) => {
          const TabContent = tab.content
          return (
            <TabContent
              key={tab.id}
              id={`${tab.id}-content`}
              active={activeTabIndex === index}
              habits={filterHabitsByTimeOfDay(habits, tab.id)}
            />
          )
        })}
      </div>
    </div>
  )
}

export default TabComponent
