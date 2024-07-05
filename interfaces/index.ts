import { ComponentProps } from 'react'
import { IconType } from 'react-icons'
import { Button } from '@/components/ui/button'

type ButtonProps = ComponentProps<typeof Button>

export interface ProviderProps extends ButtonProps {
  provider: string
  title: string
  Icon: IconType
}
