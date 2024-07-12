import { ComponentProps } from 'react'
import { IconType } from 'react-icons'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'
import type { login } from '@/app/sign-in/actions'
import type { signup } from '@/app/sign-up/actions'

type ButtonProps = ComponentProps<typeof Button>
type ProfileProps = ComponentProps<typeof Avatar>

export interface ProviderProps extends ButtonProps {
  provider: 'github' | 'google'
  title: string
  Icon: IconType
}

export interface SignInProps {
  formAction: typeof login
}
export interface SignUpProps {
  formAction: typeof signup
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
