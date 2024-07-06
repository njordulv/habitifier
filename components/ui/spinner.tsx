import { LuLoader2 } from 'react-icons/lu'
import { cn } from '@/lib/utils'

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  className?: string
}

export const Spinner = ({ className, ...props }: ISVGProps) => {
  return (
    <LuLoader2 size={20} {...props} className={cn('animate-spin', className)} />
  )
}
