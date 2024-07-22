import { HabitProps } from '@/interfaces'
import TabContent from './TabContent'

export const generateTabs = (uniqueTimeOfDay: string[]) => {
  return uniqueTimeOfDay.map((timeOfDay) => ({
    title: timeOfDay
      ? timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)
      : 'Unknown',
    id: timeOfDay || 'unknown',
    color: getColorForTimeOfDay(timeOfDay),
    content: TabContent,
  }))
}

const getColorForTimeOfDay = (timeOfDay: string | null | undefined): string => {
  switch (timeOfDay) {
    case 'morning':
      return '#5d5dff'
    case 'afternoon':
      return '#67bb67'
    case 'evening':
      return '#63a7c7'
    case 'anytime':
      return '#9ca3af'
    default:
      return '#9ca3af'
  }
}

export const filterHabitsByTimeOfDay = (
  habits: HabitProps[],
  timeOfDay: string
) => {
  return habits.filter(
    (habit) => timeOfDay === 'anytime' || habit.time_of_day === timeOfDay
  )
}
