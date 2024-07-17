import { ComponentProps } from 'react'
import { IconType } from 'react-icons'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'

type ButtonProps = ComponentProps<typeof Button>
type ProfileProps = ComponentProps<typeof Avatar>

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
  icon: string
}

export interface CreateHabitState {
  description: string
  setDescription: (description: string) => void
  goal: number
  increaseGoal: () => void
  decreaseGoal: () => void
  resetForm: () => void
  goalUnit: string
  setGoalUnit: (goalUnit: string) => void
  icon: string
  setIcon: (icon: string) => void
  timeOfDay: string
  setTimeOfDay: (time: string) => void
  weekDays: string[]
  setWeekDays: (weekDays: string[]) => void
}
