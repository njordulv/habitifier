import { ComponentProps } from 'react'
import { IconType } from 'react-icons'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import { iconsLibrary } from '@/config/icons'

type ButtonProps = ComponentProps<typeof Button>
type ProfileProps = ComponentProps<typeof Avatar>
type HabitIconType = (typeof iconsLibrary.habitIcons)[number]

export interface ProviderProps extends ButtonProps {
  provider: 'github' | 'google'
  title: string
  Icon: IconType
}

export interface ProfilePictureProps extends ProfileProps {
  name?: string | null
  image?: string | null
  email?: string | null
}

export interface AuthCardProps {
  title: string
  description: string
  formComponent: React.ReactNode
  accountText: string
  linkUrl: string
  linkText: string
}

export interface ListUsersParams {
  page?: number
  perPage?: number
  filter?: {
    email?: string
  }
}

export interface HabitProps {
  id: string
  user_id: string
  name: string
  description: string | null
  days: string[]
  time_of_day: string
  daily_goal: number
  icon: HabitIconType['label']
}

export interface DaysOfWeekProps {
  selectedDays: string[]
  setSelectedDays: (days: string[]) => void
}

export interface DayTimeProps {
  selectedTime: string | undefined
  setSelectedTime: (value: string | undefined) => void
}

export interface GoalProps {
  goal: number
  setGoal: (goal: number) => void
}

export interface HabitIconProps {
  icon: HabitIconType['label']
  setIcon: (icon: HabitIconType['label']) => void
}
