import { ComponentProps } from 'react'
import { IconType } from 'react-icons'
import { Button } from '@/components/ui/button'
import { Avatar } from '@/components/ui/avatar'

type ButtonProps = ComponentProps<typeof Button>
type ProfileProps = ComponentProps<typeof Avatar>

export interface ProviderProps extends ButtonProps {
  provider: string
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
