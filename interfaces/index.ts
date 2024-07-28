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
  id: number
  user_id: string
  name: string
  description: string | null
  goal: number
  units: string
  color: string
  icon: string
  reminder: string[]
  sound: string
  days: string[]
  time_of_day: string
}

export interface HabitItemsProps extends HabitProps {
  animationKey: string
  index: number
  onHabitUpdate: () => void
}

export interface CreateHabitState {
  description: string
  setDescription: (description: string) => void
  goal: number
  increaseGoal: () => void
  decreaseGoal: () => void
  resetForm: () => void
  resetSound: () => void
  color: string
  setColor: (color: string) => void
  units: string
  setUnits: (units: string) => void
  icon: string
  setIcon: (icon: string) => void
  sound: string
  setSound: (sound: string) => void
  timeOfDay: string
  setTimeOfDay: (time: string) => void
  reminder: (Date | undefined)[]
  setReminder: (reminder: (Date | undefined)[]) => void
  weekDays: string[]
  setWeekDays: (weekDays: string[]) => void
}
