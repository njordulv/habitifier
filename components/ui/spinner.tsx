import { LuLoaderCircle } from 'react-icons/lu'
import { cn } from '@/lib/utils'

export interface ISVGProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  className?: string
}

export const Spinner = ({ className, size, ...props }: ISVGProps) => {
  return (
    <LuLoaderCircle
      size={size}
      {...props}
      className={cn('animate-spin', className)}
    />
  )
}

export const SpinnerMin = ({ className, size, ...props }: ISVGProps) => {
  return (
    <div className="flex justify-center items-center w-full h-full min-h-9">
      <LuLoaderCircle
        size={size}
        {...props}
        className={cn('animate-spin', className)}
      />
    </div>
  )
}
